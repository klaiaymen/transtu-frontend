import {Injectable} from "@angular/core";
import {DistrictsState} from "./district.reducers";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {select, Store} from "@ngrx/store";
import {DistrictService} from "../service/district.services";
import {Observable, of, withLatestFrom} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {
  DeleteDistrictActionError,
  DeleteDistrictActionSuccess,
  DistrictActionsTypes,
  DistrictsActions,
  EditDistrictActionError,
  EditDistrictActionSuccess,
  GetAllDistrictAction,
  GetAllDistrictActionError,
  GetAllDistrictActionSuccess,
  NewDistrictAction, NewDistrictActionSuccess,
  SaveDistrictActionError,
  SaveDistrictActionSuccess, SearchDistrictActionError, SearchDistrictActionSuccess, UpdateDistrictActionError,
  UpdateDistrictActionSuccess
} from "./district.actions";

@Injectable()
export class DistrictEffects {
    state: DistrictsState|null=null;
    constructor(private districtService:DistrictService, private effectActions:Actions, private store:Store<any>) {
    }

    getAllDistrictsEffects:Observable<DistrictsActions>=createEffect(
        ()=>this.effectActions.pipe(
            ofType(DistrictActionsTypes.GET_ALL_DISTRICTS),
            mergeMap((action: DistrictsActions)=>{
                return this.districtService.getDistricts()
                    .pipe(
                        map((district)=> new GetAllDistrictActionSuccess(district)),
                        catchError((err)=>of(new GetAllDistrictActionError(err.message)))
                    )
            })
        )
    );

    loadNextPageEffect: Observable<DistrictsActions> = createEffect(() =>
        this.effectActions.pipe(
            ofType(DistrictActionsTypes.LOAD_NEXT_PAGE),
            withLatestFrom(this.store.pipe(select((state: DistrictsState) => state.currentPage))),
            mergeMap(([action, currentPage]) => {
                return of(new GetAllDistrictAction({ page: currentPage + 1, pageSize: 2 }));
            })
        )
    );


    /* new district*/
    newDistrictEffect:Observable<DistrictsActions>=createEffect(
        ()=>this.effectActions.pipe(
            ofType(DistrictActionsTypes.NEW_DISTRICT),
            map((action: DistrictsActions)=>{
                return new NewDistrictActionSuccess({});
            })
        )
    );

    /* save district*/
    saveDistrictEffect:Observable<DistrictsActions>=createEffect(
        ()=>this.effectActions.pipe(
            ofType(DistrictActionsTypes.SAVE_DISTRICT),
            mergeMap((action: DistrictsActions)=>{
                return this.districtService.save(action.payload)
                    .pipe(
                        map((district)=> new SaveDistrictActionSuccess(district)),
                        catchError((err)=>of(new SaveDistrictActionError(err.message)))
                    )
            })
        )
    );

    /* delete district*/
    deleteDistrictEffect:Observable<DistrictsActions>=createEffect(
        ()=>this.effectActions.pipe(
            ofType(DistrictActionsTypes.DELETE_DISTRICT),
            mergeMap((action: DistrictsActions)=>{
                return this.districtService.delete(action.payload.id)
                    .pipe(
                        map(()=> new DeleteDistrictActionSuccess(action.payload)),
                        catchError((err)=>of(new DeleteDistrictActionError(err.message)))
                    )
            })
        )
    );

     /*Search district*/
    searchDistrictEffect:Observable<DistrictsActions>=createEffect(
      ()=>this.effectActions.pipe(
        ofType(DistrictActionsTypes.SEARCH_DISTRICT),
        mergeMap((action: DistrictsActions)=>{
          return this.districtService.searchDistricts(action.payload)
            .pipe(
              map((districts)=> new SearchDistrictActionSuccess(districts)),
              catchError((err)=>of(new SearchDistrictActionError(err.message)))
            )
        })
      )
    );

    /* edit district*/
    editDistrictEffect:Observable<DistrictsActions>=createEffect(
        ()=>this.effectActions.pipe(
            ofType(DistrictActionsTypes.EDIT_DISTRICT),
            mergeMap((action: DistrictsActions)=>{
                return this.districtService.getDistrictById(action.payload)
                    .pipe(
                        map((d)=> new EditDistrictActionSuccess(d)),
                        catchError((err)=>of(new EditDistrictActionError(err.message)))
                    )
            })
        )
    );

    /* update district*/
    updateDistrictEffect:Observable<DistrictsActions>=createEffect(
        ()=>this.effectActions.pipe(
            ofType(DistrictActionsTypes.UPDATE_DISTRICT),
            mergeMap((action: DistrictsActions)=>{
                return this.districtService.update(action.payload)
                    .pipe(
                        map((district)=> new UpdateDistrictActionSuccess(district)),
                        catchError((err)=>of(new UpdateDistrictActionError(err.message)))
                    )
            })
        )
    );
}
