import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {select, Store} from "@ngrx/store";
import {Observable, of, withLatestFrom} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {ReclamationsState} from "./reclamation.reducers";
import {ReclamationService} from "../service/reclamation.service";
import {
  DeleteReclamationActionError,
  DeleteReclamationActionSuccess,
  EditReclamationActionError,
  EditReclamationActionSuccess,
  GetAllReclamationAction,
  GetAllReclamationActionError,
  GetAllReclamationActionSuccess,
  NewReclamationActionSuccess,
  ReclamationActionsTypes,
  ReclamationsActions,
  SaveReclamationActionError,
  SaveReclamationActionSuccess,
  SearchReclamationActionError,
  SearchReclamationActionSuccess, SearchReclamationsError
  , SearchReclamationsGlobalError, SearchReclamationsGlobalSuccess, SearchReclamationsSuccess,
  UpdateReclamationActionError,
  UpdateReclamationActionSuccess
} from "./reclamation.actions";

@Injectable()
export class ReclamationEffects {
  state: ReclamationsState|null=null;
  constructor(private reclamationService:ReclamationService, private effectActions:Actions, private store:Store<any>) {
  }

  getAllReclamationsEffects:Observable<ReclamationsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ReclamationActionsTypes.GET_ALL_RECLAMATIONS),
      mergeMap((action: ReclamationsActions)=>{
        return this.reclamationService.getReclamations()
          .pipe(
            map((reclamation)=> new GetAllReclamationActionSuccess(reclamation)),
            catchError((err)=>of(new GetAllReclamationActionError(err.message)))
          )
      })
    )
  );

  loadNextPageEffect: Observable<ReclamationsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ReclamationActionsTypes.LOAD_NEXT_PAGE),
      withLatestFrom(this.store.pipe(select((state: ReclamationsState) => state.currentPage))),
      mergeMap(([action, currentPage]) => {
        return of(new GetAllReclamationAction({ page: currentPage + 1, pageSize: 2 }));
      })
    )
  );


  /* new reclamation*/
  newReclamationEffect:Observable<ReclamationsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ReclamationActionsTypes.NEW_RECLAMATION),
      map((action: ReclamationsActions)=>{
        return new NewReclamationActionSuccess({});
      })
    )
  );

  /* save reclamation*/
  saveReclamationEffect:Observable<ReclamationsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ReclamationActionsTypes.SAVE_RECLAMATION),
      mergeMap((action: ReclamationsActions)=>{
        return this.reclamationService.save(action.payload)
          .pipe(
            map((reclamation)=> new SaveReclamationActionSuccess(reclamation)),
            catchError((err)=>of(new SaveReclamationActionError(err.message)))
          )
      })
    )
  );

  /* delete reclamtion*/
  deleteReclamationEffect:Observable<ReclamationsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ReclamationActionsTypes.DELETE_RECLAMATION),
      mergeMap((action: ReclamationsActions)=>{
        return this.reclamationService.delete(action.payload.id)
          .pipe(
            map(()=> new DeleteReclamationActionSuccess(action.payload)),
            catchError((err)=>of(new DeleteReclamationActionError(err.message)))
          )
      })
    )
  );

  /*Search reclamation*/
  /*searchReclamationEffect:Observable<ReclamationsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ReclamationActionsTypes.SEARCH_RECLAMATION),
      mergeMap((action: ReclamationsActions)=>{
        return this.reclamationService.searchReclamations(action.payload)
          .pipe(
            map((reclamations)=> new SearchReclamationActionSuccess(reclamations)),
            catchError((err)=>of(new SearchReclamationActionError(err.message)))
          )
      })
    )
  );*/

  /* edit reclamation*/
  editReclamationEffect:Observable<ReclamationsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ReclamationActionsTypes.EDIT_RECLAMATION),
      mergeMap((action: ReclamationsActions)=>{
        return this.reclamationService.getReclamationById(action.payload)
          .pipe(
            map((r)=> new EditReclamationActionSuccess(r)),
            catchError((err)=>of(new EditReclamationActionError(err.message)))
          )
      })
    )
  );

  /* update reclamation*/
  updateReclamationEffect:Observable<ReclamationsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ReclamationActionsTypes.UPDATE_RECLAMATION),
      mergeMap((action: ReclamationsActions)=>{
        return this.reclamationService.update(action.payload)
          .pipe(
            map((reclamation)=> new UpdateReclamationActionSuccess(reclamation)),
            catchError((err)=>of(new UpdateReclamationActionError(err.message)))
          )
      })
    )
  );

  //search reclamation global
  searchReclamationsGlobalEffect: Observable<ReclamationsActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(ReclamationActionsTypes.SEARCH_RECLAMATION_GLOBAL),
      mergeMap((action:ReclamationsActions) =>{
        return this.reclamationService.searchReclamationsGlobal(
          action.payload.query,
          action.payload.fromDate,
          action.payload.toDate,
          action.payload.typeAccidentIncident,
          action.payload.typeDegat
        )
          .pipe(
            map((reclamations) => new SearchReclamationsGlobalSuccess(reclamations)),
            catchError((error) => of(new SearchReclamationsGlobalError(error)))
          )
      })
    )
  );

  //search reclamation without date range
  searchReclamationsEffect: Observable<ReclamationsActions> = createEffect(
    () => this.effectActions.pipe(
      ofType(ReclamationActionsTypes.SEARCH_RECLAMATION_WITHOUT_DATE),
      mergeMap((action:ReclamationsActions) =>{
        return this.reclamationService.searchReclamationsWithoutDateRange(
          action.payload.query,
          action.payload.typeAccidentIncident,
          action.payload.typeDegat
        )
          .pipe(
            map((reclamations) => new SearchReclamationsSuccess(reclamations)),
            catchError((error) => of(new SearchReclamationsError(error)))
          )
      })
    )
  );
}
