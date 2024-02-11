import {Injectable} from "@angular/core";

import {Actions, createEffect, ofType} from "@ngrx/effects";
import {select, Store} from "@ngrx/store";
import {Observable, of, withLatestFrom} from "rxjs";

import {catchError, map, mergeMap} from "rxjs/operators";
import {PointsState} from "./point.reducers";
import {PointService} from "../service/point.services";
import {
  DeletePointActionError,
  DeletePointActionSuccess, EditPointActionError, EditPointActionSuccess,
  GetAllPointAction,
  GetAllPointActionError,
  GetAllPointActionSuccess, NewPointActionSuccess,
  PointActionsTypes,
  PointsActions, SavePointActionError, SavePointActionSuccess, UpdatePointActionError, UpdatePointActionSuccess
} from "./point.actions";

@Injectable()
export class PointEffects {
  state: PointsState|null=null;
  constructor(private pointService:PointService, private effectActions:Actions, private store:Store<any>) {
  }

  getAllPointsEffects:Observable<PointsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(PointActionsTypes.GET_ALL_POINTS),
      mergeMap((action: PointsActions)=>{
        return this.pointService.getPoints()
          .pipe(
            map((point)=> new GetAllPointActionSuccess(point)),
            catchError((err)=>of(new GetAllPointActionError(err.message)))
          )
      })
    )
  );

  loadNextPageEffect: Observable<PointsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(PointActionsTypes.LOAD_NEXT_PAGE),
      withLatestFrom(this.store.pipe(select((state: PointsState) => state.currentPage))),
      mergeMap(([action, currentPage]) => {
        return of(new GetAllPointAction({ page: currentPage + 1, pageSize: 2 }));
      })
    )
  );


  /* new point*/
  newPointEffect:Observable<PointsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(PointActionsTypes.NEW_POINT),
      map((action: PointsActions)=>{
        return new NewPointActionSuccess({});
      })
    )
  );

  /* save point*/
  savePointEffect:Observable<PointsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(PointActionsTypes.SAVE_POINT),
      mergeMap((action: PointsActions)=>{
        return this.pointService.save(action.payload)
          .pipe(
            map((point)=> new SavePointActionSuccess(point)),
            catchError((err)=>of(new SavePointActionError(err.message)))
          )
      })
    )
  );

  /* delete point*/
  deletePointEffect:Observable<PointsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(PointActionsTypes.DELETE_POINT),
      mergeMap((action: PointsActions)=>{
        return this.pointService.delete(action.payload.id)
          .pipe(
            map(()=> new DeletePointActionSuccess(action.payload)),
            catchError((err)=>of(new DeletePointActionError(err.message)))
          )
      })
    )
  );


  /* edit point*/
  editPointEffect:Observable<PointsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(PointActionsTypes.EDIT_POINT),
      mergeMap((action: PointsActions)=>{
        return this.pointService.getPointById(action.payload)
          .pipe(
            map((p)=> new EditPointActionSuccess(p)),
            catchError((err)=>of(new EditPointActionError(err.message)))
          )
      })
    )
  );

  /* update point*/
  updatePointEffect:Observable<PointsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(PointActionsTypes.UPDATE_POINT),
      mergeMap((action: PointsActions)=>{
        return this.pointService.update(action.payload)
          .pipe(
            map((point)=> new UpdatePointActionSuccess(point)),
            catchError((err)=>of(new UpdatePointActionError(err.message)))
          )
      })
    )
  );
}
