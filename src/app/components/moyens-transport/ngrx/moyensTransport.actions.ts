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
  DELETE_MT="[MoyensTransport] delete moyen transport",
  DELETE_MT_SUCCESS="[MoyensTransport] delete moyen transport Success",
  DELETE_MT_ERROR="[MoyensTransport] delete moyen transport Error",

  /* edit moyen transport*/
  EDIT_MT="[MoyensTransport] edit product",
  EDIT_MT_SUCCESS="[MoyensTransport] edit product Success",
  EDIT_MT_ERROR="[MoyensTransport] edit product Error",

  /* update moyen transport*/
  UPDATE_MT="[MoyensTransport] update product",
  UPDATE_MT_SUCCESS="[MoyensTransport] update product Success",
  UPDATE_MT_ERROR="[MoyensTransport] update product Error",

  /* search moyens transport*/
  SEARCH_MT="[Moyen transports] Search moyens transport",
  SEARCH_MT_SUCCESS="[Moyen transports] Search moyens transport Success",
  SEARCH_MT_ERROR="[Moyen transports] Search moyens transport Error",
  LOAD_NEXT_PAGE = '[MoyensTransport] Load Next Page',
}

export class LoadNextPageAction implements Action {
  readonly type: MoyensTransportActionsTypes = MoyensTransportActionsTypes.LOAD_NEXT_PAGE;
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

  constructor(public payload: MoyenTransport[]) {
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

/* edit Product Actions*/

export class EditMTAction implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.EDIT_MT;
  constructor(public payload:number) {
  }
}

export class EditMTActionSuccess implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.EDIT_MT_SUCCESS;
  constructor(public payload:MoyenTransport) {
  }
}

export class EditMTActionError implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.EDIT_MT_ERROR;
  constructor(public payload:string) {
  }
}

/* update moyen transport Actions*/

export class UpdateMTAction implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.UPDATE_MT;
  constructor(public payload:MoyenTransport) {
  }
}

export class UpdateMTActionSuccess implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.UPDATE_MT_SUCCESS;
  constructor(public payload:MoyenTransport) {
  }
}

export class UpdateMTActionError implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.UPDATE_MT_ERROR;
  constructor(public payload:string) {
  }
}

/* Search Products Actions*/

export class SearchMTAction implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.SEARCH_MT;
  constructor(public payload:string) {
  }
}

export class SearchMTActionSuccess implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.SEARCH_MT_SUCCESS;
  constructor(public payload:MoyenTransport[]) {
  }
}

export class SearchMTActionError implements Action{
  type: MoyensTransportActionsTypes=MoyensTransportActionsTypes.SEARCH_MT_ERROR;
  constructor(public payload:string) {
  }
}
export type MoyensTransportActions=
  GetAllMTAction | GetAllMTActionSuccess | GetAllMTActionError
  |SaveMTAction | SaveMTActionSuccess | SaveMTActionError
    |DeleteMTtAction | DeleteMTActionSuccess | DeleteMTActionError
  |SearchMTAction | SearchMTActionSuccess | SearchMTActionError
  ;
