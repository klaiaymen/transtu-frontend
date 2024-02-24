import {Action} from "@ngrx/store";
import {Ligne} from "../model/ligne.model";
import {LigneActionsTypes, LignesActions} from "./ligne.actions";

export enum LignesStateEnum{
  LOADING="Loading",
  LOADED="Loaded",
  ERROR="Error",
  INITIAL="Initial",
  NEW="NEW",
  EDIT="EDIT",
  UPDATED="UPDATED"
}

export interface LignesState{
  lignes:Ligne[],
  errorMessage:string,
  dataState:LignesStateEnum,
  currentLigne: Ligne|null,
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

const initState:LignesState={
  lignes:[],
  errorMessage:"",
  dataState:LignesStateEnum.INITIAL,
  currentLigne:null,
  currentPage: 1,
  pageSize: 2,
  totalPages: 0,
}
export function ligneReducers (state =initState,action :Action): LignesState{
  switch (action.type) {
    /*get all ligne */
    case LigneActionsTypes.GET_ALL_LIGNES:
      return {...state, dataState:LignesStateEnum.LOADING }
    case LigneActionsTypes.GET_ALL_LIGNES_SUCCESS:
      return {...state, dataState:LignesStateEnum.LOADED, lignes:(<LignesActions>action).payload}
    case LigneActionsTypes.GET_ALL_LIGNES_ERROR:
      return {...state, dataState:LignesStateEnum.ERROR,errorMessage:(<LignesActions>action).payload }

    /*new ligne */
    case LigneActionsTypes.NEW_LIGNE:
      return {...state, dataState:LignesStateEnum.LOADING }
    case LigneActionsTypes.NEW_LIGNE_SUCCESS:
      return {...state, dataState:LignesStateEnum.NEW}
    case LigneActionsTypes.NEW_LIGNE_ERROR:
      return {...state, dataState:LignesStateEnum.ERROR,errorMessage:(<LignesActions>action).payload }

    /* save ligne*/
    case LigneActionsTypes.SAVE_LIGNE:
      return {...state, dataState:LignesStateEnum.LOADING }
    case LigneActionsTypes.SAVE_LIGNE_SUCCESS:
      let lignes:Ligne[]=[...state.lignes];
      lignes.push((<LignesActions>action).payload);
      return {...state, dataState:LignesStateEnum.LOADED,lignes:lignes}
    case LigneActionsTypes.SAVE_LIGNE_ERROR:
      return {...state, dataState:LignesStateEnum.ERROR, errorMessage:(<LignesActions>action).payload}

    /* delete ligne*/
    case LigneActionsTypes.DELETE_LIGNE:
      return {...state, dataState:LignesStateEnum.LOADING }
    case LigneActionsTypes.DELETE_LIGNE_SUCCESS:
      let l:Ligne=(<LignesActions>action).payload;
      let index= state.lignes.indexOf(l);
      let LignesList=[...state.lignes];
      LignesList.splice(index,1);
      return {...state, dataState:LignesStateEnum.LOADED, lignes:LignesList}
    case LigneActionsTypes.DELETE_LIGNE_ERROR:
      return {...state, dataState:LignesStateEnum.ERROR, errorMessage:(<LignesActions>action).payload}

    /* edit ligne*/
    case LigneActionsTypes.EDIT_LIGNE:
      return {...state, dataState:LignesStateEnum.LOADING }
    case LigneActionsTypes.EDIT_LIGNE_SUCCESS:
      return {...state, dataState:LignesStateEnum.LOADED,currentLigne:(<LignesActions>action).payload}
    case LigneActionsTypes.EDIT_LIGNE_ERROR:
      return {...state, dataState:LignesStateEnum.ERROR, errorMessage:(<LignesActions>action).payload}


    /* update ligne*/
    case LigneActionsTypes.UPDATE_LIGNE:
      return {...state, dataState:LignesStateEnum.LOADING }
    case LigneActionsTypes.UPDATE_LIGNE_SUCCESS:
      let updatedLigne: Ligne=(<LignesActions>action).payload;
      let updatedLignes= state.lignes.map(l=>(l.id==updatedLigne.id)?updatedLigne:l);
      return {...state, dataState:LignesStateEnum.UPDATED,lignes:updatedLignes}
    case LigneActionsTypes.UPDATE_LIGNE_ERROR:
      return {...state, dataState:LignesStateEnum.ERROR, errorMessage:(<LignesActions>action).payload}

    /* search lignes*/
    case LigneActionsTypes.SEARCH_LIGNE:
      return {...state, dataState:LignesStateEnum.LOADING }
    case LigneActionsTypes.SEARCH_LIGNE_SUCCESS:
      return {...state, dataState:LignesStateEnum.LOADED, lignes:(<LignesActions>action).payload}
    case LigneActionsTypes.SEARCH_LIGNE_ERROR:
      return {...state, dataState:LignesStateEnum.ERROR, errorMessage:(<LignesActions>action).payload}

    case LigneActionsTypes.LOAD_NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    default : return {...state}
  }
}
