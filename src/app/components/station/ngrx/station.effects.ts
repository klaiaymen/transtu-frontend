import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {select, Store} from "@ngrx/store";
import {Observable, of, withLatestFrom} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {StationsState} from "./station.reducers";
import {
  DeleteStationActionError,
  DeleteStationActionSuccess, EditStationActionError, EditStationActionSuccess,
  GetAllStationAction,
  GetAllStationActionError,
  GetAllStationActionSuccess, NewStationActionSuccess, SaveStationActionError, SaveStationActionSuccess,
  StationActionsTypes,
  StationsActions, UpdateStationActionError, UpdateStationActionSuccess
} from "./station.actions";
import {StationService} from "../service/station.service";

@Injectable()
export class StationEffects {
  state: StationsState|null=null;
  constructor(private stationService:StationService, private effectActions:Actions, private store:Store<any>) {
  }

  getAllStationsEffects:Observable<StationsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(StationActionsTypes.GET_ALL_STATIONS),
      mergeMap((action: StationsActions)=>{
        return this.stationService.getStations()
          .pipe(
            map((station)=> new GetAllStationActionSuccess(station)),
            catchError((err)=>of(new GetAllStationActionError(err.message)))
          )
      })
    )
  );

  loadNextPageEffect: Observable<StationsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(StationActionsTypes.LOAD_NEXT_PAGE),
      withLatestFrom(this.store.pipe(select((state: StationsState) => state.currentPage))),
      mergeMap(([action, currentPage]) => {
        return of(new GetAllStationAction({ page: currentPage + 1, pageSize: 2 }));
      })
    )
  );


  /* new station*/
  newStationEffect:Observable<StationsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(StationActionsTypes.NEW_STATION),
      map((action: StationsActions)=>{
        return new NewStationActionSuccess({});
      })
    )
  );

  /* save station*/
  saveStationEffect:Observable<StationsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(StationActionsTypes.SAVE_STATION),
      mergeMap((action: StationsActions)=>{
        return this.stationService.save(action.payload)
          .pipe(
            map((station)=> new SaveStationActionSuccess(station)),
            catchError((err)=>of(new SaveStationActionError(err.message)))
          )
      })
    )
  );

  /* delete station*/
  deleteStationEffect:Observable<StationsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(StationActionsTypes.DELETE_STATION),
      mergeMap((action: StationsActions)=>{
        return this.stationService.delete(action.payload.id)
          .pipe(
            map(()=> new DeleteStationActionSuccess(action.payload)),
            catchError((err)=>of(new DeleteStationActionError(err.message)))
          )
      })
    )
  );


  /* edit station*/
  editStationEffect:Observable<StationsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(StationActionsTypes.EDIT_STATION),
      mergeMap((action: StationsActions)=>{
        return this.stationService.getStationById(action.payload)
          .pipe(
            map((s)=> new EditStationActionSuccess(s)),
            catchError((err)=>of(new EditStationActionError(err.message)))
          )
      })
    )
  );

  /* update station*/
  updateStationEffect:Observable<StationsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(StationActionsTypes.UPDATE_STATION),
      mergeMap((action: StationsActions)=>{
        return this.stationService.update(action.payload)
          .pipe(
            map((station)=> new UpdateStationActionSuccess(station)),
            catchError((err)=>of(new UpdateStationActionError(err.message)))
          )
      })
    )
  );
}
