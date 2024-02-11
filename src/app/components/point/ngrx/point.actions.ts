import {Action} from "@ngrx/store";
import {Station} from "../../station/model/station.model";
import {Points} from "../model/point.model";

export enum PointActionsTypes{
  /* Get All points*/
  GET_ALL_POINTS="[points] Get All points",
  GET_ALL_POINTS_SUCCESS="[points] Get All points Success",
  GET_ALL_POINTS_ERROR="[points] Get All points Error",

  /* new point*/
  NEW_POINT="[point] new point",
  NEW_POINT_SUCCESS="[point] new point Success",
  NEW_POINT_ERROR="[point] new point Error",

  /* save point*/
  SAVE_POINT="[point] save point",
  SAVE_POINT_SUCCESS="[point] save point Success",
  SAVE_POINT_ERROR="[point] save point Error",

  /* delete point*/
  DELETE_POINT="[point] delete point",
  DELETE_POINT_SUCCESS="[point] delete point Success",
  DELETE_POINT_ERROR="[point] delete point Error",

  /* edit point*/
  EDIT_POINT="[point] edit point",
  EDIT_POINT_SUCCESS="[point] edit point Success",
  EDIT_POINT_ERROR="[point] edit point Error",

  /* update Station*/
  UPDATE_POINT="[Station] update Station",
  UPDATE_POINT_SUCCESS="[Station] update Station Success",
  UPDATE_POINT_ERROR="[Station] update Station Error",

  LOAD_NEXT_PAGE = '[point] Load Next Page',
}

export class LoadNextPageAction implements Action {
  readonly type: PointActionsTypes = PointActionsTypes.LOAD_NEXT_PAGE;
}

// new Station
export class NewPointAction implements Action{
  type: PointActionsTypes=PointActionsTypes.NEW_POINT;
  constructor(public payload:any) {
  }
}
export class NewPointActionSuccess implements Action{
  type: PointActionsTypes=PointActionsTypes.NEW_POINT_SUCCESS;
  constructor(public payload:any) {
  }
}

export class NewPointActionError implements Action{
  type: PointActionsTypes=PointActionsTypes.NEW_POINT_ERROR;
  constructor(public payload:string) {
  }
}

// get all Stations
export class GetAllPointAction implements Action{
  type: PointActionsTypes=PointActionsTypes.GET_ALL_POINTS;
  constructor(public payload:any) {
  }
}
export class GetAllPointActionSuccess implements Action{
  type: PointActionsTypes=PointActionsTypes.GET_ALL_POINTS_SUCCESS;

  constructor(public payload: Points[]) {
  }
}

export class GetAllPointActionError implements Action{
  type: PointActionsTypes=PointActionsTypes.GET_ALL_POINTS_ERROR;
  constructor(public payload:string) {
  }
}
/* save Point Actions*/

export class SavePointAction implements Action{
  type: PointActionsTypes=PointActionsTypes.SAVE_POINT;
  constructor(public payload:Points) {
  }
}

export class SavePointActionSuccess implements Action{
  type: PointActionsTypes=PointActionsTypes.SAVE_POINT_SUCCESS;
  constructor(public payload:Points) {
  }
}

export class SavePointActionError implements Action{
  type: PointActionsTypes=PointActionsTypes.SAVE_POINT_ERROR;
  constructor(public payload:string) {
  }
}

/* delete Station Actions*/

export class DeletePointAction implements Action{
  type: PointActionsTypes=PointActionsTypes.DELETE_POINT;
  constructor(public payload:Points) {
  }
}

export class DeletePointActionSuccess implements Action{
  type: PointActionsTypes=PointActionsTypes.DELETE_POINT_SUCCESS;
  constructor(public payload:Points) {
  }
}

export class DeletePointActionError implements Action{
  type: PointActionsTypes=PointActionsTypes.DELETE_POINT_ERROR;
  constructor(public payload:string) {
  }
}

/* edit point Actions*/

export class EditPointAction implements Action{
  type: PointActionsTypes=PointActionsTypes.EDIT_POINT;
  constructor(public payload:number) {
  }
}

export class EditPointActionSuccess implements Action{
  type: PointActionsTypes=PointActionsTypes.EDIT_POINT_SUCCESS;
  constructor(public payload:Points) {
  }
}

export class EditPointActionError implements Action{
  type: PointActionsTypes=PointActionsTypes.EDIT_POINT_ERROR;
  constructor(public payload:string) {
  }
}

/* update point Actions*/

export class UpdatePointAction implements Action{
  type: PointActionsTypes=PointActionsTypes.UPDATE_POINT;
  constructor(public payload:Points) {
  }
}

export class UpdatePointActionSuccess implements Action{
  type: PointActionsTypes=PointActionsTypes.UPDATE_POINT_SUCCESS;
  constructor(public payload:Points) {
  }
}

export class UpdatePointActionError implements Action{
  type: PointActionsTypes=PointActionsTypes.UPDATE_POINT_ERROR;
  constructor(public payload:string) {
  }
}
export type PointsActions=
  NewPointAction | NewPointActionSuccess | NewPointActionError
  |SavePointAction | SavePointActionSuccess | SavePointActionError
  |DeletePointAction | DeletePointActionSuccess | DeletePointActionError
  |GetAllPointAction | GetAllPointActionSuccess | GetAllPointActionError
  |UpdatePointAction | UpdatePointActionSuccess | UpdatePointActionError
  ;
