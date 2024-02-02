import {MoyenTransport} from "../model/moyenTransport.model";
import {MoyensTransportActions, MoyensTransportActionsTypes} from "./moyensTransport.actions";
import {Action} from "@ngrx/store";



export enum MoyensTransportStateEnum{
  LOADING="Loading",
  LOADED="Loaded",
  ERROR="Error",
  INITIAL="Initial",
  NEW="NEW",
  EDIT="EDIT",
  UPDATED="UPDATED"
}

export interface MoyensTransportState{
  moyensTransport:MoyenTransport[],
  errorMessage:string,
  dataState:MoyensTransportStateEnum,
  currentMt: MoyenTransport|null,
}

const initState:MoyensTransportState={
  moyensTransport:[],
  errorMessage:"",
  dataState:MoyensTransportStateEnum.INITIAL,
  currentMt:null,
}
export function moyensTransportReducer (state =initState,action :Action): MoyensTransportState{
  switch (action.type) {
    /*get all moyens transport */
    case MoyensTransportActionsTypes.GET_ALL_MT:
      return {...state, dataState:MoyensTransportStateEnum.LOADING }
    case MoyensTransportActionsTypes.GET_ALL_MT_SUCCESS:
      return {...state, dataState:MoyensTransportStateEnum.LOADED, moyensTransport:(<MoyensTransportActions>action).payload}
    case MoyensTransportActionsTypes.GET_ALL_MT_ERROR:
      return {...state, dataState:MoyensTransportStateEnum.ERROR,errorMessage:(<MoyensTransportActions>action).payload }

      /*new moyen transport */
    case MoyensTransportActionsTypes.NEW_MT:
      return {...state, dataState:MoyensTransportStateEnum.LOADING }
    case MoyensTransportActionsTypes.NEW_MT_SUCCESS:
      return {...state, dataState:MoyensTransportStateEnum.NEW}
    case MoyensTransportActionsTypes.NEW_MT_ERROR:
      return {...state, dataState:MoyensTransportStateEnum.ERROR,errorMessage:(<MoyensTransportActions>action).payload }

      /* save Product*/
    case MoyensTransportActionsTypes.SAVE_MT:
      return {...state, dataState:MoyensTransportStateEnum.LOADING }
    case MoyensTransportActionsTypes.SAVE_MT_SUCCESS:
      let moyenTransports:MoyenTransport[]=[...state.moyensTransport];
      moyenTransports.push((<MoyensTransportActions>action).payload);
      return {...state, dataState:MoyensTransportStateEnum.LOADED,moyensTransport:moyenTransports}
    case MoyensTransportActionsTypes.SAVE_MT_ERROR:
      return {...state, dataState:MoyensTransportStateEnum.ERROR, errorMessage:(<MoyensTransportActions>action).payload}

      /* delete moyen transport*/
    case MoyensTransportActionsTypes.DELETE_MT:
      return {...state, dataState:MoyensTransportStateEnum.LOADING }
    case MoyensTransportActionsTypes.DELETE_MT_SUCCESS:
      let mt:MoyenTransport=(<MoyensTransportActions>action).payload;
      let index= state.moyensTransport.indexOf(mt);
      let MTsList=[...state.moyensTransport];
      MTsList.splice(index,1);
      return {...state, dataState:MoyensTransportStateEnum.LOADED, moyensTransport:MTsList}
    case MoyensTransportActionsTypes.DELETE_MT_ERROR:
      return {...state, dataState:MoyensTransportStateEnum.ERROR, errorMessage:(<MoyensTransportActions>action).payload}

    /* edit Product*/
    case MoyensTransportActionsTypes.EDIT_MT:
      return {...state, dataState:MoyensTransportStateEnum.LOADING }
    case MoyensTransportActionsTypes.EDIT_MT_SUCCESS:
      return {...state, dataState:MoyensTransportStateEnum.LOADED,currentMt:(<MoyensTransportActions>action).payload}
    case MoyensTransportActionsTypes.EDIT_MT_ERROR:
      return {...state, dataState:MoyensTransportStateEnum.ERROR, errorMessage:(<MoyensTransportActions>action).payload}


      /* update Product*/
    case MoyensTransportActionsTypes.UPDATE_MT:
      return {...state, dataState:MoyensTransportStateEnum.LOADING }
    case MoyensTransportActionsTypes.UPDATE_MT_SUCCESS:
      let updatedMoyenTransport: MoyenTransport=(<MoyensTransportActions>action).payload;
      let updatedMoyensTransport= state.moyensTransport.map(mt=>(mt.id==updatedMoyenTransport.id)?updatedMoyenTransport:mt);
      return {...state, dataState:MoyensTransportStateEnum.UPDATED,moyensTransport:updatedMoyensTransport}
    case MoyensTransportActionsTypes.UPDATE_MT_ERROR:
      return {...state, dataState:MoyensTransportStateEnum.ERROR, errorMessage:(<MoyensTransportActions>action).payload}

    default : return {...state}
  }
}

