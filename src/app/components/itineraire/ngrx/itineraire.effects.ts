import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {select, Store} from "@ngrx/store";
import {Observable, of, withLatestFrom} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {ItinerairesState} from "./itineraire.reducers";
import {ItineraireService} from "../service/itineraire.services";
import {
  DeleteItineraireActionError,
  DeleteItineraireActionSuccess,
  EditItineraireActionError,
  EditItineraireActionSuccess,
  GetAllItineraireAction,
  GetAllItineraireActionError, GetAllItineraireActionSuccess,
  ItineraireActionsTypes,
  ItinerairesActions,
  NewItineraireActionSuccess,
  SaveItineraireActionError,
  SaveItineraireActionSuccess, SearchItineraireActionError, SearchItineraireActionSuccess, UpdateItineraireActionError,
  UpdateItineraireActionSuccess
} from "./itineraire.actions";

@Injectable()
export class ItineraireEffects {
  state: ItinerairesState|null=null;
  constructor(private itineraireService:ItineraireService, private effectActions:Actions, private store:Store<any>) {
  }

  getAllItinerairesEffects:Observable<ItinerairesActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ItineraireActionsTypes.GET_ALL_ITINERAIRES),
      mergeMap((action: ItinerairesActions)=>{
        return this.itineraireService.getItineraires()
          .pipe(
            map((itineraire)=> new GetAllItineraireActionSuccess(itineraire)),
            catchError((err)=>of(new GetAllItineraireActionError(err.message)))
          )
      })
    )
  );

  loadNextPageEffect: Observable<ItinerairesActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ItineraireActionsTypes.LOAD_NEXT_PAGE),
      withLatestFrom(this.store.pipe(select((state: ItinerairesState) => state.currentPage))),
      mergeMap(([action, currentPage]) => {
        return of(new GetAllItineraireAction({ page: currentPage + 1, pageSize: 2 }));
      })
    )
  );


  /* new itineraire*/
  newItineraireEffect:Observable<ItinerairesActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ItineraireActionsTypes.NEW_ITINERAIRE),
      map((action: ItinerairesActions)=>{
        return new NewItineraireActionSuccess({});
      })
    )
  );

  /* save itineraire*/
  saveItineraireEffect:Observable<ItinerairesActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ItineraireActionsTypes.SAVE_ITINERAIRE),
      mergeMap((action: ItinerairesActions)=>{
        return this.itineraireService.save(action.payload)
          .pipe(
            map((itineraire)=> new SaveItineraireActionSuccess(itineraire)),
            catchError((err)=>of(new SaveItineraireActionError(err.message)))
          )
      })
    )
  );

  /* delete itineraire*/
  deleteItineraireEffect:Observable<ItinerairesActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ItineraireActionsTypes.DELETE_ITINERAIRE),
      mergeMap((action: ItinerairesActions)=>{
        return this.itineraireService.delete(action.payload.id)
          .pipe(
            map(()=> new DeleteItineraireActionSuccess(action.payload)),
            catchError((err)=>of(new DeleteItineraireActionError(err.message)))
          )
      })
    )
  );


  /* edit Itineraire*/
  editItineraireEffect:Observable<ItinerairesActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ItineraireActionsTypes.EDIT_ITINERAIRE),
      mergeMap((action: ItinerairesActions)=>{
        return this.itineraireService.getItineraireById(action.payload)
          .pipe(
            map((i)=> new EditItineraireActionSuccess(i)),
            catchError((err)=>of(new EditItineraireActionError(err.message)))
          )
      })
    )
  );

  /* update Itineraire*/
  updateItineraireEffect:Observable<ItinerairesActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ItineraireActionsTypes.UPDATE_ITINERAIRE),
      mergeMap((action: ItinerairesActions)=>{
        return this.itineraireService.update(action.payload)
          .pipe(
            map((itineraire)=> new UpdateItineraireActionSuccess(itineraire)),
            catchError((err)=>of(new UpdateItineraireActionError(err.message)))
          )
      })
    )
  );

  /* Search itineraires*/
  searchItinerairesEffect:Observable<ItinerairesActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ItineraireActionsTypes.SEARCH_ITINERAIRE),
      mergeMap((action: ItinerairesActions)=>{
        return this.itineraireService.searchItineraires(action.payload)
          .pipe(
            map((itineraires)=> new SearchItineraireActionSuccess(itineraires)),
            catchError((err)=>of(new SearchItineraireActionError(err.message)))
          )
      })
    )
  );
}
