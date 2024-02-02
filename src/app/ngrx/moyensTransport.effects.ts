import {Injectable} from "@angular/core";
import {MoyenTransportService} from "../services/moyenTransport.service";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { Observable, of} from "rxjs";
import {
    DeleteMTActionError,
    DeleteMTActionSuccess,
    GetAllMTActionError,
    GetAllMTActionSuccess,
    MoyensTransportActions,
    MoyensTransportActionsTypes, NewMTActionSuccess, SaveMTActionError, SaveMTActionSuccess
} from "./moyensTransport.actions";
import {catchError, map, mergeMap} from 'rxjs/operators';
@Injectable()
export class MoyensTransportEffects {
  constructor(private moyenTransportService:MoyenTransportService, private effectActions:Actions) {
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
}





