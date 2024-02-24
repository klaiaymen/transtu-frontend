import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {select, Store} from "@ngrx/store";
import {Observable, of, withLatestFrom} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {LigneService} from "../service/ligne.service";
import {
  DeleteLigneActionError,
  DeleteLigneActionSuccess,
  EditLigneActionError,
  EditLigneActionSuccess,
  GetAllLigneAction,
  GetAllLigneActionError,
  GetAllLigneActionSuccess,
  LigneActionsTypes,
  LignesActions,
  NewLigneActionSuccess,
  SaveLigneActionError,
  SaveLigneActionSuccess, SearchLigneActionError, SearchLigneActionSuccess,
  UpdateLigneActionError,
  UpdateLIgneActionSuccess
} from "./ligne.actions";
import {LignesState} from "./ligne.reducers";

@Injectable()
export class LigneEffects {
  state: LignesState|null=null;
  constructor(private ligneService:LigneService, private effectActions:Actions, private store:Store<any>) {
  }

  getAllLignesEffects:Observable<LignesActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(LigneActionsTypes.GET_ALL_LIGNES),
      mergeMap((action: LignesActions)=>{
        return this.ligneService.getLignes()
          .pipe(
            map((ligne)=> new GetAllLigneActionSuccess(ligne)),
            catchError((err)=>of(new GetAllLigneActionError(err.message)))
          )
      })
    )
  );

  loadNextPageEffect: Observable<LignesActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(LigneActionsTypes.LOAD_NEXT_PAGE),
      withLatestFrom(this.store.pipe(select((state: LignesState) => state.currentPage))),
      mergeMap(([action, currentPage]) => {
        return of(new GetAllLigneAction({ page: currentPage + 1, pageSize: 2 }));
      })
    )
  );


  /* new ligne*/
  newLigneEffect:Observable<LignesActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(LigneActionsTypes.NEW_LIGNE),
      map((action: LignesActions)=>{
        return new NewLigneActionSuccess({});
      })
    )
  );

  /* save ligne*/
  saveLigneEffect:Observable<LignesActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(LigneActionsTypes.SAVE_LIGNE),
      mergeMap((action: LignesActions)=>{
        return this.ligneService.save(action.payload)
          .pipe(
            map((ligne)=> new SaveLigneActionSuccess(ligne)),
            catchError((err)=>of(new SaveLigneActionError(err.message)))
          )
      })
    )
  );

  /* delete ligne*/
  deleteLigneEffect:Observable<LignesActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(LigneActionsTypes.DELETE_LIGNE),
      mergeMap((action: LignesActions)=>{
        return this.ligneService.delete(action.payload.id)
          .pipe(
            map(()=> new DeleteLigneActionSuccess(action.payload)),
            catchError((err)=>of(new DeleteLigneActionError(err.message)))
          )
      })
    )
  );


  /* edit Ligne*/
  editLigneEffect:Observable<LignesActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(LigneActionsTypes.EDIT_LIGNE),
      mergeMap((action: LignesActions)=>{
        return this.ligneService.getLigneById(action.payload)
          .pipe(
            map((l)=> new EditLigneActionSuccess(l)),
            catchError((err)=>of(new EditLigneActionError(err.message)))
          )
      })
    )
  );

  /* update ligne*/
  updateLigneEffect:Observable<LignesActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(LigneActionsTypes.UPDATE_LIGNE),
      mergeMap((action: LignesActions)=>{
        return this.ligneService.update(action.payload)
          .pipe(
            map((ligne)=> new UpdateLIgneActionSuccess(ligne)),
            catchError((err)=>of(new UpdateLigneActionError(err.message)))
          )
      })
    )
  );

  /* Search lignes*/
  searchMoyensTransportEffect:Observable<LignesActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(LigneActionsTypes.SEARCH_LIGNE),
      mergeMap((action: LignesActions)=>{
        return this.ligneService.searchLignes(action.payload)
          .pipe(
            map((lignes)=> new SearchLigneActionSuccess(lignes)),
            catchError((err)=>of(new SearchLigneActionError(err.message)))
          )
      })
    )
  );
}
