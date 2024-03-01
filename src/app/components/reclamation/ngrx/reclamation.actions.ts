import {Action} from "@ngrx/store";
import {District} from "../../district/model/district.model";
import {Reclamation} from "../model/reclamation.model";

export enum ReclamationActionsTypes{
  /* Get All Reclamation*/
  GET_ALL_RECLAMATIONS="[Reclamations] Get All reclamations",
  GET_ALL_RECLAMATIONS_SUCCESS="[Reclamations] Get All reclamations Success",
  GET_ALL_RECLAMATIONS_ERROR="[Reclamations] Get All reclamations Error",

  /* new reclamation*/
  NEW_RECLAMATION="[Reclamation] new Reclamation",
  NEW_RECLAMATION_SUCCESS="[Reclamation] new Reclamation Success",
  NEW_RECLAMATION_ERROR="[Reclamation] new Reclamation Error",

  /* save district*/
  SAVE_RECLAMATION="[Reclamation] save Reclamation",
  SAVE_RECLAMATION_SUCCESS="[Reclamation] save Reclamation Success",
  SAVE_RECLAMATION_ERROR="[Reclamation] save Reclamation Error",

  /* delete district*/
  DELETE_RECLAMATION="[Reclamation] delete Reclamation",
  DELETE_RECLAMATION_SUCCESS="[Districts] delete Reclamation Success",
  DELETE_RECLAMATION_ERROR="[Reclamation] delete Reclamation Error",

  /* edit district*/
  EDIT_RECLAMATION="[Reclamation] edit Reclamation",
  EDIT_RECLAMATION_SUCCESS="[Reclamation] edit Reclamation Success",
  EDIT_RECLAMATION_ERROR="[Reclamation] edit Reclamation Error",

  /* update district*/
  UPDATE_RECLAMATION="[Reclamation] update Reclamation",
  UPDATE_RECLAMATION_SUCCESS="[Districts] update Reclamation Success",
  UPDATE_RECLAMATION_ERROR="[Reclamation] update Reclamation Error",

  /* search  district*/
  SEARCH_RECLAMATION="[Reclamation] Search Reclamation",
  SEARCH_RECLAMATION_SUCCESS="[Reclamation] Search Reclamation Success",
  SEARCH_RECLAMATION_ERROR="[Reclamation] Search Reclamation Error",

  LOAD_NEXT_PAGE = '[Reclamation] Load Next Page',
}

/* Search reclamations Actions*/
export class SearchReclamationAction implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.SEARCH_RECLAMATION;
  constructor(public payload:string) {
  }
}

export class SearchReclamationActionSuccess implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.SEARCH_RECLAMATION_SUCCESS;
  constructor(public payload:Reclamation[]) {
  }
}

export class SearchReclamationActionError implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.SEARCH_RECLAMATION_ERROR;
  constructor(public payload:string) {
  }
}

export class LoadNextPageAction implements Action {
  readonly type: ReclamationActionsTypes = ReclamationActionsTypes.LOAD_NEXT_PAGE;
}

// new reclamtion
export class NewReclamationAction implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.NEW_RECLAMATION;
  constructor(public payload:any) {
  }
}
export class NewReclamationActionSuccess implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.NEW_RECLAMATION_SUCCESS;
  constructor(public payload:any) {
  }
}

export class NewReclamationActionError implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.NEW_RECLAMATION_ERROR;
  constructor(public payload:string) {
  }
}

// get all reclamtion
export class GetAllReclamationAction implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.GET_ALL_RECLAMATIONS;
  constructor(public payload:any) {
  }
}
export class GetAllReclamationActionSuccess implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.GET_ALL_RECLAMATIONS_SUCCESS;

  constructor(public payload: Reclamation[]) {
  }
}

export class GetAllReclamationActionError implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.GET_ALL_RECLAMATIONS_ERROR;
  constructor(public payload:string) {
  }
}
/* save reclamation Actions*/

export class SaveReclamationAction implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.SAVE_RECLAMATION;
  constructor(public payload:Reclamation) {
  }
}

export class SaveReclamationActionSuccess implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.SAVE_RECLAMATION_SUCCESS;
  constructor(public payload:Reclamation) {
  }
}

export class SaveReclamationActionError implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.SAVE_RECLAMATION_ERROR;
  constructor(public payload:string) {
  }
}

/* delete reclamation Actions*/

export class DeleteReclamationAction implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.DELETE_RECLAMATION;
  constructor(public payload:Reclamation) {
  }
}

export class DeleteReclamationActionSuccess implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.DELETE_RECLAMATION_SUCCESS;
  constructor(public payload:Reclamation) {
  }
}

export class DeleteReclamationActionError implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.DELETE_RECLAMATION_ERROR;
  constructor(public payload:string) {
  }
}

/* edit reclamation Actions*/

export class EditReclamationAction implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.EDIT_RECLAMATION;
  constructor(public payload:number) {
  }
}

export class EditReclamationActionSuccess implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.EDIT_RECLAMATION_SUCCESS;
  constructor(public payload:Reclamation) {
  }
}

export class EditReclamationActionError implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.EDIT_RECLAMATION_ERROR;
  constructor(public payload:string) {
  }
}

/* update reclamation Actions*/

export class UpdateReclamationAction implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.UPDATE_RECLAMATION;
  constructor(public payload:Reclamation) {
  }
}

export class UpdateReclamationActionSuccess implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.UPDATE_RECLAMATION_SUCCESS;
  constructor(public payload:Reclamation) {
  }
}

export class UpdateReclamationActionError implements Action{
  type: ReclamationActionsTypes=ReclamationActionsTypes.UPDATE_RECLAMATION_ERROR;
  constructor(public payload:string) {
  }
}
export type ReclamationsActions=
  NewReclamationAction | NewReclamationActionSuccess | NewReclamationActionError
  |SaveReclamationAction | SaveReclamationActionSuccess | SaveReclamationActionError
  |DeleteReclamationAction | DeleteReclamationActionSuccess | DeleteReclamationActionError
  |GetAllReclamationAction | GetAllReclamationActionSuccess | GetAllReclamationActionError
  |UpdateReclamationAction | UpdateReclamationActionSuccess | UpdateReclamationActionError
  |SearchReclamationAction | SearchReclamationActionSuccess | SearchReclamationActionError
  ;
