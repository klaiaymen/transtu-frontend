import {Action} from "@ngrx/store";
import {Reclamation} from "../model/reclamation.model";
import {ReclamationActionsTypes, ReclamationsActions} from "./reclamation.actions";

export enum ReclamationsStateEnum{
  LOADING="Loading",
  LOADED="Loaded",
  ERROR="Error",
  INITIAL="Initial",
  NEW="NEW",
  EDIT="EDIT",
  UPDATED="UPDATED"
}

export interface ReclamationsState{
  reclamations:Reclamation[],
  errorMessage:string,
  dataState:ReclamationsStateEnum,
  currentReclamation: Reclamation|null,
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

const initState:ReclamationsState={
  reclamations:[],
  errorMessage:"",
  dataState:ReclamationsStateEnum.INITIAL,
  currentReclamation:null,
  currentPage: 1,
  pageSize: 2,
  totalPages: 0,
}
export function reclamationReducers (state =initState,action :Action): ReclamationsState{
  switch (action.type) {
    /*get all reclamations */
    case ReclamationActionsTypes.GET_ALL_RECLAMATIONS:
      return {...state, dataState:ReclamationsStateEnum.LOADING }
    case ReclamationActionsTypes.GET_ALL_RECLAMATIONS_SUCCESS:
      return {...state, dataState:ReclamationsStateEnum.LOADED, reclamations:(<ReclamationsActions>action).payload}
    case ReclamationActionsTypes.GET_ALL_RECLAMATIONS_ERROR:
      return {...state, dataState:ReclamationsStateEnum.ERROR,errorMessage:(<ReclamationsActions>action).payload }

    /*get reclamations by user */
    case ReclamationActionsTypes.GET_ALL_RECLAMATIONS_BY_USER:
      return {...state, dataState:ReclamationsStateEnum.LOADING }
    case ReclamationActionsTypes.GET_ALL_RECLAMATIONS_BY_USER_SUCCESS:
      return {...state, dataState:ReclamationsStateEnum.LOADED, reclamations:(<ReclamationsActions>action).payload}
    case ReclamationActionsTypes.GET_ALL_RECLAMATIONS_BY_USER_ERROR:
      return {...state, dataState:ReclamationsStateEnum.ERROR,errorMessage:(<ReclamationsActions>action).payload }

    /*new reclamation */
    case ReclamationActionsTypes.NEW_RECLAMATION:
      return {...state, dataState:ReclamationsStateEnum.LOADING }
    case ReclamationActionsTypes.NEW_RECLAMATION_SUCCESS:
      return {...state, dataState:ReclamationsStateEnum.NEW}
    case ReclamationActionsTypes.NEW_RECLAMATION_ERROR:
      return {...state, dataState:ReclamationsStateEnum.ERROR,errorMessage:(<ReclamationsActions>action).payload }

    /* save reclamation*/
    case ReclamationActionsTypes.SAVE_RECLAMATION:
      return {...state, dataState:ReclamationsStateEnum.LOADING }
    case ReclamationActionsTypes.SAVE_RECLAMATION_SUCCESS:
      let reclamations:Reclamation[]=[...state.reclamations];
      reclamations.push((<ReclamationsActions>action).payload);
      return {...state, dataState:ReclamationsStateEnum.LOADED,reclamations:reclamations}
    case ReclamationActionsTypes.SAVE_RECLAMATION_ERROR:
      return {...state, dataState:ReclamationsStateEnum.ERROR, errorMessage:(<ReclamationsActions>action).payload}

    /* delete reclamation*/
    case ReclamationActionsTypes.DELETE_RECLAMATION:
      return {...state, dataState:ReclamationsStateEnum.LOADING }
    case ReclamationActionsTypes.DELETE_RECLAMATION_SUCCESS:
      let r:Reclamation=(<ReclamationsActions>action).payload;
      let index= state.reclamations.indexOf(r);
      let ReclamationsList=[...state.reclamations];
      ReclamationsList.splice(index,1);
      return {...state, dataState:ReclamationsStateEnum.LOADED, reclamations:ReclamationsList}
    case ReclamationActionsTypes.DELETE_RECLAMATION_ERROR:
      return {...state, dataState:ReclamationsStateEnum.ERROR, errorMessage:(<ReclamationsActions>action).payload}

    /* edit reclamation*/
    case ReclamationActionsTypes.EDIT_RECLAMATION:
      return {...state, dataState:ReclamationsStateEnum.LOADING }
    case ReclamationActionsTypes.EDIT_RECLAMATION_SUCCESS:
      return {...state, dataState:ReclamationsStateEnum.LOADED,currentReclamation:(<ReclamationsActions>action).payload}
    case ReclamationActionsTypes.EDIT_RECLAMATION_ERROR:
      return {...state, dataState:ReclamationsStateEnum.ERROR, errorMessage:(<ReclamationsActions>action).payload}


    /* update reclamation*/
    case ReclamationActionsTypes.UPDATE_RECLAMATION:
      return {...state, dataState:ReclamationsStateEnum.LOADING }
    case ReclamationActionsTypes.UPDATE_RECLAMATION_SUCCESS:
      let updatedReclamation: Reclamation=(<ReclamationsActions>action).payload;
      let updatedReclamations= state.reclamations.map(r=>(r.id==updatedReclamation.id)?updatedReclamation:r);
      return {...state, dataState:ReclamationsStateEnum.UPDATED,reclamations:updatedReclamations}
    case ReclamationActionsTypes.UPDATE_RECLAMATION_ERROR:
      return {...state, dataState:ReclamationsStateEnum.ERROR, errorMessage:(<ReclamationsActions>action).payload}

    /* search reclamation*/
    case ReclamationActionsTypes.SEARCH_RECLAMATION:
      return {...state, dataState:ReclamationsStateEnum.LOADING }
    case ReclamationActionsTypes.SEARCH_RECLAMATION_SUCCESS:
      return {...state, dataState:ReclamationsStateEnum.LOADED, reclamations:(<ReclamationsActions>action).payload}
    case ReclamationActionsTypes.SEARCH_RECLAMATION_ERROR:
      return {...state, dataState:ReclamationsStateEnum.ERROR, errorMessage:(<ReclamationsActions>action).payload}

    /*//search reclamtion by date range
    case ReclamationActionsTypes.SEARCH_RECLAMATION_BY_DATE_RANGE:
      return {...state, dataState:ReclamationsStateEnum.LOADING }
    case ReclamationActionsTypes.SEARCH_RECLAMATION_BY_DATE_RANGE_SUCCESS:
      return {...state, dataState:ReclamationsStateEnum.LOADED, reclamations:(<ReclamationsActions>action).payload}
    case ReclamationActionsTypes.SEARCH_RECLAMATION_BY_DATE_RANGE_ERROR:
      return {...state, dataState:ReclamationsStateEnum.ERROR, errorMessage:(<ReclamationsActions>action).payload}*/
    case ReclamationActionsTypes.SEARCH_RECLAMATION_GLOBAL:
      return {
        ...state,
        dataState:ReclamationsStateEnum.LOADING,
        errorMessage:''
      }
    case ReclamationActionsTypes.SEARCH_RECLAMATION_GLOBAL_SUCCESS:
      return {
        ...state,
        dataState: ReclamationsStateEnum.LOADED,
        reclamations:(<ReclamationsActions>action).payload,
        errorMessage: ''
      };
    case ReclamationActionsTypes.SEARCH_RECLAMATION_GLOBAL_ERROR:
      return {
        ...state,
        dataState: ReclamationsStateEnum.ERROR,
        errorMessage: (<ReclamationsActions>action).payload
      };
//without date range
    case ReclamationActionsTypes.SEARCH_RECLAMATION_WITHOUT_DATE:
      return {
        ...state,
        dataState:ReclamationsStateEnum.LOADING,
        errorMessage:''
      }
    case ReclamationActionsTypes.SEARCH_RECLAMATION_WITHOUT_DATE_SUCCESS:
      return {
        ...state,
        dataState: ReclamationsStateEnum.LOADED,
        reclamations:(<ReclamationsActions>action).payload,
        errorMessage: ''
      };
    case ReclamationActionsTypes.SEARCH_RECLAMATION_WITHOUT_DATE_ERROR:
      return {
        ...state,
        dataState: ReclamationsStateEnum.ERROR,
        errorMessage: (<ReclamationsActions>action).payload
      };

    case ReclamationActionsTypes.LOAD_NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    default : return {...state}
  }
}
