import {Action} from "@ngrx/store";
import {District} from "../model/district.model";
import {DistrictActionsTypes, DistrictsActions} from "./district.actions";

export enum DistrictsStateEnum{
    LOADING="Loading",
    LOADED="Loaded",
    ERROR="Error",
    INITIAL="Initial",
    NEW="NEW",
    EDIT="EDIT",
    UPDATED="UPDATED"
}

export interface DistrictsState{
    districts:District[],
    errorMessage:string,
    dataState:DistrictsStateEnum,
    currentDistrict: District|null,
    currentPage: number;
    pageSize: number;
    totalPages: number;
}

const initState:DistrictsState={
    districts:[],
    errorMessage:"",
    dataState:DistrictsStateEnum.INITIAL,
    currentDistrict:null,
    currentPage: 1,
    pageSize: 2,
    totalPages: 0,
}
export function districtReducers (state =initState,action :Action): DistrictsState{
    switch (action.type) {
        /*get all district */
        case DistrictActionsTypes.GET_ALL_DISTRICTS:
            return {...state, dataState:DistrictsStateEnum.LOADING }
        case DistrictActionsTypes.GET_ALL_DISTRICTS_SUCCESS:
            return {...state, dataState:DistrictsStateEnum.LOADED, districts:(<DistrictsActions>action).payload}
        case DistrictActionsTypes.GET_ALL_DISTRICTS_ERROR:
            return {...state, dataState:DistrictsStateEnum.ERROR,errorMessage:(<DistrictsActions>action).payload }

        /*new district */
        case DistrictActionsTypes.NEW_DISTRICT:
            return {...state, dataState:DistrictsStateEnum.LOADING }
        case DistrictActionsTypes.NEW_DISTRICT_SUCCESS:
            return {...state, dataState:DistrictsStateEnum.NEW}
        case DistrictActionsTypes.NEW_DISTRICT_ERROR:
            return {...state, dataState:DistrictsStateEnum.ERROR,errorMessage:(<DistrictsActions>action).payload }

        /* save district*/
        case DistrictActionsTypes.SAVE_DISTRICT:
            return {...state, dataState:DistrictsStateEnum.LOADING }
        case DistrictActionsTypes.SAVE_DISTRICT_SUCCESS:
            let districts:District[]=[...state.districts];
            districts.push((<DistrictsActions>action).payload);
            return {...state, dataState:DistrictsStateEnum.LOADED,districts:districts}
        case DistrictActionsTypes.SAVE_DISTRICT_ERROR:
            return {...state, dataState:DistrictsStateEnum.ERROR, errorMessage:(<DistrictsActions>action).payload}

        /* delete district*/
        case DistrictActionsTypes.DELETE_DISTRICT:
            return {...state, dataState:DistrictsStateEnum.LOADING }
        case DistrictActionsTypes.DELETE_DISTRICT_SUCCESS:
            let d:District=(<DistrictsActions>action).payload;
            let index= state.districts.indexOf(d);
            let DistrictsList=[...state.districts];
            DistrictsList.splice(index,1);
            return {...state, dataState:DistrictsStateEnum.LOADED, districts:DistrictsList}
        case DistrictActionsTypes.DELETE_DISTRICT_ERROR:
            return {...state, dataState:DistrictsStateEnum.ERROR, errorMessage:(<DistrictsActions>action).payload}

        /* edit district*/
        case DistrictActionsTypes.EDIT_DISTRICT:
            return {...state, dataState:DistrictsStateEnum.LOADING }
        case DistrictActionsTypes.EDIT_DISTRICT_SUCCESS:
            return {...state, dataState:DistrictsStateEnum.LOADED,currentDistrict:(<DistrictsActions>action).payload}
        case DistrictActionsTypes.EDIT_DISTRICT_ERROR:
            return {...state, dataState:DistrictsStateEnum.ERROR, errorMessage:(<DistrictsActions>action).payload}


        /* update district*/
        case DistrictActionsTypes.UPDATE_DISTRICT:
            return {...state, dataState:DistrictsStateEnum.LOADING }
        case DistrictActionsTypes.UPDATE_DISTRICT_SUCCESS:
            let updatedDistrict: District=(<DistrictsActions>action).payload;
            let updatedDistricts= state.districts.map(d=>(d.id==updatedDistrict.id)?updatedDistrict:d);
            return {...state, dataState:DistrictsStateEnum.UPDATED,districts:updatedDistricts}
        case DistrictActionsTypes.UPDATE_DISTRICT_ERROR:
            return {...state, dataState:DistrictsStateEnum.ERROR, errorMessage:(<DistrictsActions>action).payload}

        /* search district*/
        case DistrictActionsTypes.SEARCH_DISTRICT:
          return {...state, dataState:DistrictsStateEnum.LOADING }
        case DistrictActionsTypes.SEARCH_DISTRICT_SUCCESS:
          return {...state, dataState:DistrictsStateEnum.LOADED, districts:(<DistrictsActions>action).payload}
        case DistrictActionsTypes.SEARCH_DISTRICT_ERROR:
          return {...state, dataState:DistrictsStateEnum.ERROR, errorMessage:(<DistrictsActions>action).payload}

        case DistrictActionsTypes.LOAD_NEXT_PAGE:
            return { ...state, currentPage: state.currentPage + 1 };
        default : return {...state}
    }
}

