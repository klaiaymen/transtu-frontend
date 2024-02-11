import {Action} from "@ngrx/store";
import {Points} from "../model/point.model";
import {PointActionsTypes, PointsActions} from "./point.actions";

export enum PointsStateEnum{
  LOADING="Loading",
  LOADED="Loaded",
  ERROR="Error",
  INITIAL="Initial",
  NEW="NEW",
  EDIT="EDIT",
  UPDATED="UPDATED"
}

export interface PointsState{
  points:Points[],
  errorMessage:string,
  dataState:PointsStateEnum,
  currentPoint: Points|null,
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

const initState:PointsState={
  points:[],
  errorMessage:"",
  dataState:PointsStateEnum.INITIAL,
  currentPoint:null,
  currentPage: 1,
  pageSize: 2,
  totalPages: 0,
}
export function PointReducers (state =initState,action :Action): PointsState{
  switch (action.type) {
    /*get all Points */
    case PointActionsTypes.GET_ALL_POINTS:
      return {...state, dataState:PointsStateEnum.LOADING }
    case PointActionsTypes.GET_ALL_POINTS_SUCCESS:
      return {...state, dataState:PointsStateEnum.LOADED, points:(<PointsActions>action).payload}
    case PointActionsTypes.GET_ALL_POINTS_ERROR:
      return {...state, dataState:PointsStateEnum.ERROR,errorMessage:(<PointsActions>action).payload }

    /*new point */
    case PointActionsTypes.NEW_POINT:
      return {...state, dataState:PointsStateEnum.LOADING }
    case PointActionsTypes.NEW_POINT_SUCCESS:
      return {...state, dataState:PointsStateEnum.NEW}
    case PointActionsTypes.NEW_POINT_ERROR:
      return {...state, dataState:PointsStateEnum.ERROR,errorMessage:(<PointsActions>action).payload }

    /* save point*/
    case PointActionsTypes.SAVE_POINT:
      return {...state, dataState:PointsStateEnum.LOADING }
    case PointActionsTypes.SAVE_POINT_SUCCESS:
      let points:Points[]=[...state.points];
      points.push((<PointsActions>action).payload);
      return {...state, dataState:PointsStateEnum.LOADED,points:points}
    case PointActionsTypes.SAVE_POINT_ERROR:
      return {...state, dataState:PointsStateEnum.ERROR, errorMessage:(<PointsActions>action).payload}

    /* delete point*/
    case PointActionsTypes.DELETE_POINT:
      return {...state, dataState:PointsStateEnum.LOADING }
    case PointActionsTypes.DELETE_POINT_SUCCESS:
      let p:Points=(<PointsActions>action).payload;
      let index= state.points.indexOf(p);
      let PointsList=[...state.points];
      PointsList.splice(index,1);
      return {...state, dataState:PointsStateEnum.LOADED, points:PointsList}
    case PointActionsTypes.DELETE_POINT_ERROR:
      return {...state, dataState:PointsStateEnum.ERROR, errorMessage:(<PointsActions>action).payload}

    /* edit point*/
    case PointActionsTypes.EDIT_POINT:
      return {...state, dataState:PointsStateEnum.LOADING }
    case PointActionsTypes.EDIT_POINT_SUCCESS:
      return {...state, dataState:PointsStateEnum.LOADED,currentPoint:(<PointsActions>action).payload}
    case PointActionsTypes.EDIT_POINT_ERROR:
      return {...state, dataState:PointsStateEnum.ERROR, errorMessage:(<PointsActions>action).payload}


    /* update point*/
    case PointActionsTypes.UPDATE_POINT:
      return {...state, dataState:PointsStateEnum.LOADING }
    case PointActionsTypes.UPDATE_POINT_SUCCESS:
      let updatedPoint: Points=(<PointsActions>action).payload;
      let updatedPoints= state.points.map(p=>(p.id==updatedPoint.id)?updatedPoint:p);
      return {...state, dataState:PointsStateEnum.UPDATED,points:updatedPoints}
    case PointActionsTypes.UPDATE_POINT_ERROR:
      return {...state, dataState:PointsStateEnum.ERROR, errorMessage:(<PointsActions>action).payload}

    case PointActionsTypes.LOAD_NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    default : return {...state}
  }
}
