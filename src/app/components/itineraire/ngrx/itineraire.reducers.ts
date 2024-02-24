import {Action} from "@ngrx/store";
import {Itineraire} from "../model/itineraire.model";
import {ItineraireActionsTypes, ItinerairesActions} from "./itineraire.actions";

export enum ItinerairesStateEnum{
  LOADING="Loading",
  LOADED="Loaded",
  ERROR="Error",
  INITIAL="Initial",
  NEW="NEW",
  EDIT="EDIT",
  UPDATED="UPDATED"
}

export interface ItinerairesState{
  itineraires:Itineraire[],
  errorMessage:string,
  dataState:ItinerairesStateEnum,
  currentItineraire: Itineraire|null,
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

const initState:ItinerairesState={
  itineraires:[],
  errorMessage:"",
  dataState:ItinerairesStateEnum.INITIAL,
  currentItineraire:null,
  currentPage: 1,
  pageSize: 2,
  totalPages: 0,
}
export function itineraireReducers (state =initState,action :Action): ItinerairesState{
  switch (action.type) {
    /*get all itineraires */
    case ItineraireActionsTypes.GET_ALL_ITINERAIRES:
      return {...state, dataState:ItinerairesStateEnum.LOADING }
    case ItineraireActionsTypes.GET_ALL_ITINERAIRES_SUCCESS:
      return {...state, dataState:ItinerairesStateEnum.LOADED, itineraires:(<ItinerairesActions>action).payload}
    case ItineraireActionsTypes.GET_ALL_ITINERAIRES_ERROR:
      return {...state, dataState:ItinerairesStateEnum.ERROR,errorMessage:(<ItinerairesActions>action).payload }

    /*new itineraire */
    case ItineraireActionsTypes.NEW_ITINERAIRE:
      return {...state, dataState:ItinerairesStateEnum.LOADING }
    case ItineraireActionsTypes.NEW_ITINERAIRE_SUCCESS:
      return {...state, dataState:ItinerairesStateEnum.NEW}
    case ItineraireActionsTypes.NEW_ITINERAIRE_ERROR:
      return {...state, dataState:ItinerairesStateEnum.ERROR,errorMessage:(<ItinerairesActions>action).payload }

    /* save itineraire*/
    case ItineraireActionsTypes.SAVE_ITINERAIRE:
      return {...state, dataState:ItinerairesStateEnum.LOADING }
    case ItineraireActionsTypes.SAVE_ITINERAIRE_SUCCESS:
      let itineraires:Itineraire[]=[...state.itineraires];
      itineraires.push((<ItinerairesActions>action).payload);
      return {...state, dataState:ItinerairesStateEnum.LOADED,itineraires:itineraires}
    case ItineraireActionsTypes.SAVE_ITINERAIRE_ERROR:
      return {...state, dataState:ItinerairesStateEnum.ERROR, errorMessage:(<ItinerairesActions>action).payload}

    /* delete itineraire*/
    case ItineraireActionsTypes.DELETE_ITINERAIRE:
      return {...state, dataState:ItinerairesStateEnum.LOADING }
    case ItineraireActionsTypes.DELETE_ITINERAIRE_SUCCESS:
      let i:Itineraire=(<ItinerairesActions>action).payload;
      let index= state.itineraires.indexOf(i);
      let ItinerairesList=[...state.itineraires];
      ItinerairesList.splice(index,1);
      return {...state, dataState:ItinerairesStateEnum.LOADED, itineraires:ItinerairesList}
    case ItineraireActionsTypes.DELETE_ITINERAIRE_ERROR:
      return {...state, dataState:ItinerairesStateEnum.ERROR, errorMessage:(<ItinerairesActions>action).payload}

    /* edit itineraire*/
    case ItineraireActionsTypes.EDIT_ITINERAIRE:
      return {...state, dataState:ItinerairesStateEnum.LOADING }
    case ItineraireActionsTypes.EDIT_ITINERAIRE_SUCCESS:
      return {...state, dataState:ItinerairesStateEnum.LOADED,currentItineraire:(<ItinerairesActions>action).payload}
    case ItineraireActionsTypes.EDIT_ITINERAIRE_ERROR:
      return {...state, dataState:ItinerairesStateEnum.ERROR, errorMessage:(<ItinerairesActions>action).payload}


    /* update itineraire*/
    case ItineraireActionsTypes.UPDATE_ITINERAIRE:
      return {...state, dataState:ItinerairesStateEnum.LOADING }
    case ItineraireActionsTypes.UPDATE_ITINERAIRE_SUCCESS:
      let updatedItineraire: Itineraire=(<ItinerairesActions>action).payload;
      let updatedItineraires= state.itineraires.map(i=>(i.id==updatedItineraire.id)?updatedItineraire:i);
      return {...state, dataState:ItinerairesStateEnum.UPDATED,itineraires:updatedItineraires}
    case ItineraireActionsTypes.UPDATE_ITINERAIRE_ERROR:
      return {...state, dataState:ItinerairesStateEnum.ERROR, errorMessage:(<ItinerairesActions>action).payload}

    /* search itineraire*/
    case ItineraireActionsTypes.SEARCH_ITINERAIRE:
      return {...state, dataState:ItinerairesStateEnum.LOADING }
    case ItineraireActionsTypes.SEARCH_ITINERAIRE_SUCCESS:
      return {...state, dataState:ItinerairesStateEnum.LOADED, itineraires:(<ItinerairesActions>action).payload}
    case ItineraireActionsTypes.SEARCH_ITINERAIRE_ERROR:
      return {...state, dataState:ItinerairesStateEnum.ERROR, errorMessage:(<ItinerairesActions>action).payload}

    case ItineraireActionsTypes.LOAD_NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    default : return {...state}
  }
}
