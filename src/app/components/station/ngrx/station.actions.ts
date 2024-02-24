import {Action} from "@ngrx/store";
import {Station} from "../model/station.model";

export enum StationActionsTypes{
  /* Get All stations*/
  GET_ALL_STATIONS="[Stations] Get All stations",
  GET_ALL_STATIONS_SUCCESS="[stations] Get All stations Success",
  GET_ALL_STATIONS_ERROR="[Stations] Get All stations Error",

  /* search stations*/
  SEARCH_STATIONS="[Stations] search stations",
  SEARCH_STATIONS_SUCCESS="[stations] search stations Success",
  SEARCH_STATIONS_ERROR="[Stations] search stations Error",

  /* new Station*/
  NEW_STATION="[Station] new Station",
  NEW_STATION_SUCCESS="[Station] new Station Success",
  NEW_STATION_ERROR="[Station] new Station Error",

  /* save Station*/
  SAVE_STATION="[Station] save Station",
  SAVE_STATION_SUCCESS="[Station] save Station Success",
  SAVE_STATION_ERROR="[Station] save Station Error",

  /* delete Station*/
  DELETE_STATION="[Station] delete Station",
  DELETE_STATION_SUCCESS="[Station] delete Station Success",
  DELETE_STATION_ERROR="[Station] delete Station Error",

  /* edit Station*/
  EDIT_STATION="[Station] edit Station",
  EDIT_STATION_SUCCESS="[Station] edit Station Success",
  EDIT_STATION_ERROR="[Station] edit Station Error",

  /* update Station*/
  UPDATE_STATION="[Station] update Station",
  UPDATE_STATION_SUCCESS="[Station] update Station Success",
  UPDATE_STATION_ERROR="[Station] update Station Error",

  LOAD_NEXT_PAGE = '[Station] Load Next Page',
}

// search Station
export class SearchStationAction implements Action{
  type: StationActionsTypes=StationActionsTypes.SEARCH_STATIONS;
  constructor(public payload:string) {
  }
}
export class SearchStationActionSuccess implements Action{
  type: StationActionsTypes=StationActionsTypes.SEARCH_STATIONS_SUCCESS;
  constructor(public payload:Station[]) {
  }
}

export class SearchStationActionError implements Action{
  type: StationActionsTypes=StationActionsTypes.NEW_STATION_ERROR;
  constructor(public payload:string) {
  }
}
export class LoadNextPageAction implements Action {
  readonly type: StationActionsTypes = StationActionsTypes.LOAD_NEXT_PAGE;
}

// new Station
export class NewStationAction implements Action{
  type: StationActionsTypes=StationActionsTypes.NEW_STATION;
  constructor(public payload:any) {
  }
}
export class NewStationActionSuccess implements Action{
  type: StationActionsTypes=StationActionsTypes.NEW_STATION_SUCCESS;
  constructor(public payload:any) {
  }
}

export class NewStationActionError implements Action{
  type: StationActionsTypes=StationActionsTypes.NEW_STATION_ERROR;
  constructor(public payload:string) {
  }
}

// get all Stations
export class GetAllStationAction implements Action{
  type: StationActionsTypes=StationActionsTypes.GET_ALL_STATIONS;
  constructor(public payload:any) {
  }
}
export class GetAllStationActionSuccess implements Action{
  type: StationActionsTypes=StationActionsTypes.GET_ALL_STATIONS_SUCCESS;

  constructor(public payload: Station[]) {
  }
}

export class GetAllStationActionError implements Action{
  type: StationActionsTypes=StationActionsTypes.GET_ALL_STATIONS_ERROR;
  constructor(public payload:string) {
  }
}
/* save Station Actions*/

export class SaveStationAction implements Action{
  type: StationActionsTypes=StationActionsTypes.SAVE_STATION;
  constructor(public payload:Station) {
  }
}

export class SaveStationActionSuccess implements Action{
  type: StationActionsTypes=StationActionsTypes.SAVE_STATION_SUCCESS;
  constructor(public payload:Station) {
  }
}

export class SaveStationActionError implements Action{
  type: StationActionsTypes=StationActionsTypes.SAVE_STATION_ERROR;
  constructor(public payload:string) {
  }
}

/* delete Station Actions*/

export class DeleteStationAction implements Action{
  type: StationActionsTypes=StationActionsTypes.DELETE_STATION;
  constructor(public payload:Station) {
  }
}

export class DeleteStationActionSuccess implements Action{
  type: StationActionsTypes=StationActionsTypes.DELETE_STATION_SUCCESS;
  constructor(public payload:Station) {
  }
}

export class DeleteStationActionError implements Action{
  type: StationActionsTypes=StationActionsTypes.DELETE_STATION_ERROR;
  constructor(public payload:string) {
  }
}

/* edit Station Actions*/

export class EditStationAction implements Action{
  type: StationActionsTypes=StationActionsTypes.EDIT_STATION;
  constructor(public payload:number) {
  }
}

export class EditStationActionSuccess implements Action{
  type: StationActionsTypes=StationActionsTypes.EDIT_STATION_SUCCESS;
  constructor(public payload:Station) {
  }
}

export class EditStationActionError implements Action{
  type: StationActionsTypes=StationActionsTypes.EDIT_STATION_ERROR;
  constructor(public payload:string) {
  }
}

/* update Station Actions*/

export class UpdateStationAction implements Action{
  type: StationActionsTypes=StationActionsTypes.UPDATE_STATION;
  constructor(public payload:Station) {
  }
}

export class UpdateStationActionSuccess implements Action{
  type: StationActionsTypes=StationActionsTypes.UPDATE_STATION_SUCCESS;
  constructor(public payload:Station) {
  }
}

export class UpdateStationActionError implements Action{
  type: StationActionsTypes=StationActionsTypes.UPDATE_STATION_ERROR;
  constructor(public payload:string) {
  }
}
export type StationsActions=
  NewStationAction | NewStationActionSuccess | NewStationActionError
  |SaveStationAction | SaveStationActionSuccess | SaveStationActionError
  |DeleteStationAction | DeleteStationActionSuccess | DeleteStationActionError
  |GetAllStationAction | GetAllStationActionSuccess | GetAllStationActionError
  |UpdateStationAction | UpdateStationActionSuccess | UpdateStationActionError
  |SearchStationAction | SearchStationActionSuccess | SearchStationActionError
  ;
