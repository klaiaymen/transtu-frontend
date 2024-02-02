import {Action} from "@ngrx/store";
import {MoyenTransport} from "../model/moyenTransport.model";

export enum MoyensTransportActionsTypes{
  /* Get All moyens transport*/
  GET_ALL_MT="[MoyensTransport] Get All moyens transport",
  GET_ALL_MT_SUCCESS="[MoyensTransport] Get All moyens transport Success",
  GET_ALL_MT_ERROR="[MoyensTransport] Get All moyens transport Error",
  /* new moyen transport*/
  NEW_MT="[MoyensTransport] new moyen transport",
  NEW_MT_SUCCESS="[MoyensTransport] new moyen transport Success",
  NEW_MT_ERROR="[MoyensTransport] new moyen transport Error",
  /* save moyen transport*/
  SAVE_MT="[MoyensTransport] save moyen transport",
  SAVE_MT_SUCCESS="[MoyensTransport] save moyen transport Success",
  SAVE_MT_ERROR="[MoyensTransport] save moyen transport Error",
  /* delete moyen transport*/
  DELETE_MT="[Product] delete moyen transport",
  DELETE_MT_SUCCESS="[Product] delete moyen transport Success",
  DELETE_MT_ERROR="[Product] delete moyen transport Error",
}

// new moyen transport
export class NewMTAction implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.NEW_MT;
  constructor(public payload:any) {
  }
}
export class NewMTActionSuccess implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.NEW_MT_SUCCESS;
  constructor(public payload:any) {
  }
}

export class NewMTActionError implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.NEW_MT_ERROR;
  constructor(public payload:string) {
  }
}

// get all moyens transport
export class GetAllMTAction implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.GET_ALL_MT;
  constructor(public payload:any) {
  }
}
export class GetAllMTActionSuccess implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.GET_ALL_MT_SUCCESS;
  constructor(public payload:MoyenTransport[]) {
  }
}

export class GetAllMTActionError implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.GET_ALL_MT_ERROR;
  constructor(public payload:string) {
  }
}
/* save moyen transport Actions*/

export class SaveMTAction implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.SAVE_MT;
  constructor(public payload:MoyenTransport) {
  }
}

export class SaveMTActionSuccess implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.SAVE_MT_SUCCESS;
  constructor(public payload:MoyenTransport) {
  }
}

export class SaveMTActionError implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.SAVE_MT_ERROR;
  constructor(public payload:string) {
  }
}

/* delete moyen transport Actions*/

export class DeleteMTtAction implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.DELETE_MT;
  constructor(public payload:MoyenTransport) {
  }
}

export class DeleteMTActionSuccess implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.DELETE_MT_SUCCESS;
  constructor(public payload:MoyenTransport) {
  }
}

export class DeleteMTActionError implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.DELETE_MT_ERROR;
  constructor(public payload:string) {
  }
}
export type MoyensTransportActions=
  GetAllMTAction | GetAllMTActionSuccess | GetAllMTActionError
  |SaveMTAction | SaveMTActionSuccess | SaveMTActionError
    |DeleteMTtAction | DeleteMTActionSuccess | DeleteMTActionError
  ;
