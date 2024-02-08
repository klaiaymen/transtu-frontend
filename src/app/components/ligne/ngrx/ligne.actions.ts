import {Action} from "@ngrx/store";
import {Ligne} from "../model/ligne.model";

export enum LigneActionsTypes{
  /* Get All Lignes*/
  GET_ALL_LIGNES="[Lignes] Get All Lignes",
  GET_ALL_LIGNES_SUCCESS="[Lignes] Get All Lignes Success",
  GET_ALL_LIGNES_ERROR="[Lignes] Get All Lignes Error",

  /* new Lignes*/
  NEW_LIGNE="[Lignes] new ligne",
  NEW_LIGNE_SUCCESS="[Lignes] new Ligne Success",
  NEW_LIGNE_ERROR="[Lignes] new Ligne Error",

  /* save Lignes*/
  SAVE_LIGNE="[Lignes] save Ligne",
  SAVE_LIGNE_SUCCESS="[Lignes] save Ligne Success",
  SAVE_LIGNE_ERROR="[Lignes] save Ligne Error",

  /* delete Lignes*/
  DELETE_LIGNE="[Lignes] delete Ligne",
  DELETE_LIGNE_SUCCESS="[Lignes] delete Ligne Success",
  DELETE_LIGNE_ERROR="[Lignes] delete Ligne Error",

  /* edit Lignes*/
  EDIT_LIGNE="[Lignes] edit Ligne",
  EDIT_LIGNE_SUCCESS="[Lignes] edit Ligne Success",
  EDIT_LIGNE_ERROR="[Lignes] edit Ligne Error",

  /* update Lignes*/
  UPDATE_LIGNE="[Lignes] update Ligne",
  UPDATE_LIGNE_SUCCESS="[Lignes] update Ligne Success",
  UPDATE_LIGNE_ERROR="[Lignes] update Ligne Error",

  LOAD_NEXT_PAGE = '[Lignes] Load Next Page',
}

export class LoadNextPageAction implements Action {
  readonly type: LigneActionsTypes = LigneActionsTypes.LOAD_NEXT_PAGE;
}

// new ligne
export class NewLigneAction implements Action{
  type: LigneActionsTypes=LigneActionsTypes.NEW_LIGNE;
  constructor(public payload:any) {
  }
}
export class NewLigneActionSuccess implements Action{
  type: LigneActionsTypes=LigneActionsTypes.NEW_LIGNE_SUCCESS;
  constructor(public payload:any) {
  }
}

export class NewLigneActionError implements Action{
  type: LigneActionsTypes=LigneActionsTypes.NEW_LIGNE_ERROR;
  constructor(public payload:string) {
  }
}

// get all Lignes
export class GetAllLigneAction implements Action{
  type: LigneActionsTypes=LigneActionsTypes.GET_ALL_LIGNES;
  constructor(public payload:any) {
  }
}
export class GetAllLigneActionSuccess implements Action{
  type: LigneActionsTypes=LigneActionsTypes.GET_ALL_LIGNES_SUCCESS;

  constructor(public payload: Ligne[]) {
  }
}

export class GetAllLigneActionError implements Action{
  type: LigneActionsTypes=LigneActionsTypes.GET_ALL_LIGNES_ERROR;
  constructor(public payload:string) {
  }
}
/* save ligne Actions*/

export class SaveLigneAction implements Action{
  type: LigneActionsTypes=LigneActionsTypes.SAVE_LIGNE;
  constructor(public payload:Ligne) {
  }
}

export class SaveLigneActionSuccess implements Action{
  type: LigneActionsTypes=LigneActionsTypes.SAVE_LIGNE_SUCCESS;
  constructor(public payload:Ligne) {
  }
}

export class SaveLigneActionError implements Action{
  type: LigneActionsTypes=LigneActionsTypes.SAVE_LIGNE_ERROR;
  constructor(public payload:string) {
  }
}

/* delete Ligne Actions*/

export class DeleteLigneAction implements Action{
  type: LigneActionsTypes=LigneActionsTypes.DELETE_LIGNE;
  constructor(public payload:Ligne) {
  }
}

export class DeleteLigneActionSuccess implements Action{
  type: LigneActionsTypes=LigneActionsTypes.DELETE_LIGNE_SUCCESS;
  constructor(public payload:Ligne) {
  }
}

export class DeleteLigneActionError implements Action{
  type: LigneActionsTypes=LigneActionsTypes.DELETE_LIGNE_ERROR;
  constructor(public payload:string) {
  }
}

/* edit LIgne Actions*/

export class EditLigneAction implements Action{
  type: LigneActionsTypes=LigneActionsTypes.EDIT_LIGNE;
  constructor(public payload:number) {
  }
}

export class EditLigneActionSuccess implements Action{
  type: LigneActionsTypes=LigneActionsTypes.EDIT_LIGNE_SUCCESS;
  constructor(public payload:Ligne) {
  }
}

export class EditLigneActionError implements Action{
  type: LigneActionsTypes=LigneActionsTypes.EDIT_LIGNE_ERROR;
  constructor(public payload:string) {
  }
}

/* update Ligne Actions*/

export class UpdateLigneAction implements Action{
  type: LigneActionsTypes=LigneActionsTypes.UPDATE_LIGNE;
  constructor(public payload:Ligne) {
  }
}

export class UpdateLIgneActionSuccess implements Action{
  type: LigneActionsTypes=LigneActionsTypes.UPDATE_LIGNE_SUCCESS;
  constructor(public payload:Ligne) {
  }
}

export class UpdateLigneActionError implements Action{
  type: LigneActionsTypes=LigneActionsTypes.UPDATE_LIGNE_ERROR;
  constructor(public payload:string) {
  }
}
export type LignesActions=
  NewLigneAction | NewLigneActionSuccess | NewLigneActionError
  |SaveLigneAction | SaveLigneActionSuccess | SaveLigneActionError
  |DeleteLigneAction | DeleteLigneActionSuccess | DeleteLigneActionError
  |GetAllLigneAction | GetAllLigneActionSuccess | GetAllLigneActionError
  |UpdateLigneAction | UpdateLIgneActionSuccess | UpdateLigneActionError
  ;
