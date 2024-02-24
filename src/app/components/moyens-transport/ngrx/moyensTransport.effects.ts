import {Injectable} from "@angular/core";
import {MoyenTransportService} from "../services/moyenTransport.service";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of, withLatestFrom} from "rxjs";
import {
  DeleteMTActionError,
  DeleteMTActionSuccess,
  EditMTActionError,
  EditMTActionSuccess, GetAllMTAction,
  GetAllMTActionError,
  GetAllMTActionSuccess,
  MoyensTransportActions,
  MoyensTransportActionsTypes,
  NewMTActionSuccess,
  SaveMTActionError,
  SaveMTActionSuccess, SearchMTActionError, SearchMTActionSuccess,
  UpdateMTActionError,
  UpdateMTActionSuccess
} from "./moyensTransport.actions";
import {catchError, map, mergeMap} from 'rxjs/operators';
import {select, Store} from "@ngrx/store";
import {MoyensTransportState} from "./moyensTransport.reducer";
@Injectable()
export class MoyensTransportEffects {
  state:MoyensTransportState|null=null;
  constructor(private moyenTransportService:MoyenTransportService, private effectActions:Actions, private store:Store<any> ) {
  }

  getAllMoyensTransportEffects:Observable<MoyensTransportActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(MoyensTransportActionsTypes.GET_ALL_MT),
      mergeMap((action: MoyensTransportActions)=>{
        return this.moyenTransportService.getMoyensTransport()
          .pipe(
            map((moyensTrasnport)=> new GetAllMTActionSuccess(moyensTrasnport)),
            catchError((err)=>of(new GetAllMTActionError(err.message)))
          )
      })
    )
  );
/*  getAllMoyensTransportEffect: Observable<MoyensTransportActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(MoyensTransportActionsTypes.GET_ALL_MT),
      mergeMap((action: MoyensTransportActions) => {
        const { page, pageSize } = action.payload;
        return this.moyenTransportService.getMoyensTransport(page, pageSize)
          .pipe(
            map(({ moyensTrasnport, totalPages }) => new GetAllMTActionSuccess(moyensTrasnport, totalPages)),
            catchError((err) => of(new GetAllMTActionError(err.message)))
          )
      })
    )
  );*/

  loadNextPageEffect: Observable<MoyensTransportActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(MoyensTransportActionsTypes.LOAD_NEXT_PAGE),
      withLatestFrom(this.store.pipe(select((state: MoyensTransportState) => state.currentPage))),
      mergeMap(([action, currentPage]) => {
        return of(new GetAllMTAction({ page: currentPage + 1, pageSize: 2 }));
      })
    )
  );


  /* new moyen transport*/
  newMoyensTransportEffect:Observable<MoyensTransportActions>=createEffect(
      ()=>this.effectActions.pipe(
          ofType(MoyensTransportActionsTypes.NEW_MT),
          map((action: MoyensTransportActions)=>{
            return new NewMTActionSuccess({});
          })
      )
  );

    /* save moyen transport*/
    saveMoyensTransportEffect:Observable<MoyensTransportActions>=createEffect(
        ()=>this.effectActions.pipe(
            ofType(MoyensTransportActionsTypes.SAVE_MT),
            mergeMap((action: MoyensTransportActions)=>{
                return this.moyenTransportService.save(action.payload)
                    .pipe(
                        map((moyentransport)=> new SaveMTActionSuccess(moyentransport)),
                        catchError((err)=>of(new SaveMTActionError(err.message)))
                    )
            })
        )
    );

    /* delete Moyen transport*/
    deleteMoyenTransportEffect:Observable<MoyensTransportActions>=createEffect(
        ()=>this.effectActions.pipe(
            ofType(MoyensTransportActionsTypes.DELETE_MT),
            mergeMap((action: MoyensTransportActions)=>{
                return this.moyenTransportService.delete(action.payload.id)
                    .pipe(
                        map(()=> new DeleteMTActionSuccess(action.payload)),
                        catchError((err)=>of(new DeleteMTActionError(err.message)))
                    )
            })
        )
    );

  /* Search Products*/
  searchMoyensTransportEffect:Observable<MoyensTransportActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(MoyensTransportActionsTypes.SEARCH_MT),
      mergeMap((action: MoyensTransportActions)=>{
        return this.moyenTransportService.searchMts(action.payload)
          .pipe(
            map((moyensTransport)=> new SearchMTActionSuccess(moyensTransport)),
            catchError((err)=>of(new SearchMTActionError(err.message)))
          )
      })
    )
  );

  /* edit Product*/
  editMoyenTransportEffect:Observable<MoyensTransportActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(MoyensTransportActionsTypes.EDIT_MT),
      mergeMap((action: MoyensTransportActions)=>{
        return this.moyenTransportService.getMtById(action.payload)
          .pipe(
            map((mt)=> new EditMTActionSuccess(mt)),
            catchError((err)=>of(new EditMTActionError(err.message)))
          )
      })
    )
  );

    /* update Product*/
    updateMoyenTransportEffect:Observable<MoyensTransportActions>=createEffect(
        ()=>this.effectActions.pipe(
            ofType(MoyensTransportActionsTypes.UPDATE_MT),
            mergeMap((action: MoyensTransportActions)=>{
                return this.moyenTransportService.update(action.payload)
                    .pipe(
                        map((moyenTransport)=> new UpdateMTActionSuccess(moyenTransport)),
                        catchError((err)=>of(new UpdateMTActionError(err.message)))
                    )
            })
        )
    );
}






