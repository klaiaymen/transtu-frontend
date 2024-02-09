import {Action} from "@ngrx/store";
import {Station} from "../model/station.model";
import {StationActionsTypes, StationsActions} from "./station.actions";

export enum StationsStateEnum{
  LOADING="Loading",
  LOADED="Loaded",
  ERROR="Error",
  INITIAL="Initial",
  NEW="NEW",
  EDIT="EDIT",
  UPDATED="UPDATED"
}

export interface StationsState{
  stations:Station[],
  errorMessage:string,
  dataState:StationsStateEnum,
  currentStation: Station|null,
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

const initState:StationsState={
  stations:[],
  errorMessage:"",
  dataState:StationsStateEnum.INITIAL,
  currentStation:null,
  currentPage: 1,
  pageSize: 2,
  totalPages: 0,
}
export function StationReducers (state =initState,action :Action): StationsState{
  switch (action.type) {
    /*get all stations */
    case StationActionsTypes.GET_ALL_STATIONS:
      return {...state, dataState:StationsStateEnum.LOADING }
    case StationActionsTypes.GET_ALL_STATIONS_SUCCESS:
      return {...state, dataState:StationsStateEnum.LOADED, stations:(<StationsActions>action).payload}
    case StationActionsTypes.GET_ALL_STATIONS_ERROR:
      return {...state, dataState:StationsStateEnum.ERROR,errorMessage:(<StationsActions>action).payload }

    /*new station */
    case StationActionsTypes.NEW_STATION:
      return {...state, dataState:StationsStateEnum.LOADING }
    case StationActionsTypes.NEW_STATION_SUCCESS:
      return {...state, dataState:StationsStateEnum.NEW}
    case StationActionsTypes.NEW_STATION_ERROR:
      return {...state, dataState:StationsStateEnum.ERROR,errorMessage:(<StationsActions>action).payload }

    /* save station*/
    case StationActionsTypes.SAVE_STATION:
      return {...state, dataState:StationsStateEnum.LOADING }
    case StationActionsTypes.SAVE_STATION_SUCCESS:
      let stations:Station[]=[...state.stations];
      stations.push((<StationsActions>action).payload);
      return {...state, dataState:StationsStateEnum.LOADED,stations:stations}
    case StationActionsTypes.SAVE_STATION_ERROR:
      return {...state, dataState:StationsStateEnum.ERROR, errorMessage:(<StationsActions>action).payload}

    /* delete station*/
    case StationActionsTypes.DELETE_STATION:
      return {...state, dataState:StationsStateEnum.LOADING }
    case StationActionsTypes.DELETE_STATION_SUCCESS:
      let s:Station=(<StationsActions>action).payload;
      let index= state.stations.indexOf(s);
      let StationsList=[...state.stations];
      StationsList.splice(index,1);
      return {...state, dataState:StationsStateEnum.LOADED, stations:StationsList}
    case StationActionsTypes.DELETE_STATION_ERROR:
      return {...state, dataState:StationsStateEnum.ERROR, errorMessage:(<StationsActions>action).payload}

    /* edit station*/
    case StationActionsTypes.EDIT_STATION:
      return {...state, dataState:StationsStateEnum.LOADING }
    case StationActionsTypes.EDIT_STATION_SUCCESS:
      return {...state, dataState:StationsStateEnum.LOADED,currentStation:(<StationsActions>action).payload}
    case StationActionsTypes.EDIT_STATION_ERROR:
      return {...state, dataState:StationsStateEnum.ERROR, errorMessage:(<StationsActions>action).payload}


    /* update station*/
    case StationActionsTypes.UPDATE_STATION:
      return {...state, dataState:StationsStateEnum.LOADING }
    case StationActionsTypes.UPDATE_STATION_SUCCESS:
      let updatedStation: Station=(<StationsActions>action).payload;
      let updatedStations= state.stations.map(s=>(s.id==updatedStation.id)?updatedStation:s);
      return {...state, dataState:StationsStateEnum.UPDATED,stations:updatedStations}
    case StationActionsTypes.UPDATE_STATION_ERROR:
      return {...state, dataState:StationsStateEnum.ERROR, errorMessage:(<StationsActions>action).payload}

    case StationActionsTypes.LOAD_NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    default : return {...state}
  }
}
