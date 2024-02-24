import {Action} from "@ngrx/store";
import {Itineraire} from "../model/itineraire.model";

export enum ItineraireActionsTypes{
  /* Get All Itineraires*/
  GET_ALL_ITINERAIRES="[Itineraires] Get All Itineraires",
  GET_ALL_ITINERAIRES_SUCCESS="[Itineraires] Get All Itineraires Success",
  GET_ALL_ITINERAIRES_ERROR="[Itineraires] Get All Itineraires Error",

  /* new Itineraire*/
  NEW_ITINERAIRE="[Itineraire] new Itineraire",
  NEW_ITINERAIRE_SUCCESS="[Itineraire] new Itineraire Success",
  NEW_ITINERAIRE_ERROR="[Itineraire] new Itineraire Error",

  /* save Itineraire*/
  SAVE_ITINERAIRE="[Itineraire] save Itineraire",
  SAVE_ITINERAIRE_SUCCESS="[Itineraire] save Itineraire Success",
  SAVE_ITINERAIRE_ERROR="[Itineraire] save Itineraire Error",

  /* delete Itineraire*/
  DELETE_ITINERAIRE="[Itineraire] delete Itineraire",
  DELETE_ITINERAIRE_SUCCESS="[Itineraire] delete Itineraire Success",
  DELETE_ITINERAIRE_ERROR="[Itineraire] delete Itineraire Error",

  /* edit Itineraire*/
  EDIT_ITINERAIRE="[Itineraire] edit Itineraire",
  EDIT_ITINERAIRE_SUCCESS="[Itineraire] edit Itineraire Success",
  EDIT_ITINERAIRE_ERROR="[Itineraire] edit Itineraire Error",

  /* update Itineraire*/
  UPDATE_ITINERAIRE="[Itineraire] update Itineraire",
  UPDATE_ITINERAIRE_SUCCESS="[Itineraire] update Itineraire Success",
  UPDATE_ITINERAIRE_ERROR="[Itineraire] update Itineraire Error",

  /* search Itineraire*/
  SEARCH_ITINERAIRE="[Itineraire] search Itineraire",
  SEARCH_ITINERAIRE_SUCCESS="[Itineraire] search Itineraire Success",
  SEARCH_ITINERAIRE_ERROR="[Itineraire] search Itineraire Error",

  LOAD_NEXT_PAGE = '[Itineraire] Load Next Page',
}

export class LoadNextPageAction implements Action {
  readonly type: ItineraireActionsTypes = ItineraireActionsTypes.LOAD_NEXT_PAGE;
}

// search Itineraire
export class SearchItineraireAction implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.SEARCH_ITINERAIRE;
  constructor(public payload:string) {
  }
}
export class SearchItineraireActionSuccess implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.SEARCH_ITINERAIRE_SUCCESS;
  constructor(public payload:Itineraire[]) {
  }
}

export class SearchItineraireActionError implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.SEARCH_ITINERAIRE_ERROR;
  constructor(public payload:string) {
  }
}

// new Itineraire
export class NewItineraireAction implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.NEW_ITINERAIRE;
  constructor(public payload:any) {
  }
}
export class NewItineraireActionSuccess implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.NEW_ITINERAIRE_SUCCESS;
  constructor(public payload:any) {
  }
}

export class NewItineraireActionError implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.NEW_ITINERAIRE_ERROR;
  constructor(public payload:string) {
  }
}

// get all Itineraire
export class GetAllItineraireAction implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.GET_ALL_ITINERAIRES;
  constructor(public payload:any) {
  }
}
export class GetAllItineraireActionSuccess implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.GET_ALL_ITINERAIRES_SUCCESS;

  constructor(public payload: Itineraire[]) {
  }
}

export class GetAllItineraireActionError implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.GET_ALL_ITINERAIRES_ERROR;
  constructor(public payload:string) {
  }
}
/* save Itineraire Actions*/

export class SaveItineraireAction implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.SAVE_ITINERAIRE;
  constructor(public payload:Itineraire) {
  }
}

export class SaveItineraireActionSuccess implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.SAVE_ITINERAIRE_SUCCESS;
  constructor(public payload:Itineraire) {
  }
}

export class SaveItineraireActionError implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.SAVE_ITINERAIRE_ERROR;
  constructor(public payload:string) {
  }
}

/* delete Itineraire Actions*/

export class DeleteItineraireAction implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.DELETE_ITINERAIRE;
  constructor(public payload:Itineraire) {
  }
}

export class DeleteItineraireActionSuccess implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.DELETE_ITINERAIRE_SUCCESS;
  constructor(public payload:Itineraire) {
  }
}

export class DeleteItineraireActionError implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.DELETE_ITINERAIRE_ERROR;
  constructor(public payload:string) {
  }
}

/* edit Itineraire Actions*/

export class EditItineraireAction implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.EDIT_ITINERAIRE;
  constructor(public payload:number) {
  }
}

export class EditItineraireActionSuccess implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.EDIT_ITINERAIRE_SUCCESS;
  constructor(public payload:Itineraire) {
  }
}

export class EditItineraireActionError implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.EDIT_ITINERAIRE_ERROR;
  constructor(public payload:string) {
  }
}

/* update Itineraire Actions*/

export class UpdateItineraireAction implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.UPDATE_ITINERAIRE;
  constructor(public payload:Itineraire) {
  }
}

export class UpdateItineraireActionSuccess implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.UPDATE_ITINERAIRE_SUCCESS;
  constructor(public payload:Itineraire) {
  }
}

export class UpdateItineraireActionError implements Action{
  type: ItineraireActionsTypes=ItineraireActionsTypes.UPDATE_ITINERAIRE_ERROR;
  constructor(public payload:string) {
  }
}
export type ItinerairesActions=
  NewItineraireAction | NewItineraireActionSuccess | NewItineraireActionError
  |SaveItineraireAction | SaveItineraireActionSuccess | SaveItineraireActionError
  |DeleteItineraireAction | DeleteItineraireActionSuccess | DeleteItineraireActionError
  |GetAllItineraireAction | GetAllItineraireActionSuccess | GetAllItineraireActionError
  |UpdateItineraireAction | UpdateItineraireActionSuccess | UpdateItineraireActionError
  |SearchItineraireAction | SearchItineraireActionSuccess | SearchItineraireActionError
  ;
