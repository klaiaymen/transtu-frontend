import {Action} from "@ngrx/store";
import {District} from "../model/district.model";

export enum DistrictActionsTypes{
    /* Get All Districts*/
    GET_ALL_DISTRICTS="[Districts] Get All districts",
    GET_ALL_DISTRICTS_SUCCESS="[Districts] Get All districts Success",
    GET_ALL_DISTRICTS_ERROR="[Districts] Get All districts Error",
    /* new district*/
    NEW_DISTRICT="[Districts] new district",
    NEW_DISTRICT_SUCCESS="[Districts] new district Success",
    NEW_DISTRICT_ERROR="[Districts] new district Error",
    /* save district*/
    SAVE_DISTRICT="[Districts] save district",
    SAVE_DISTRICT_SUCCESS="[Districts] save district Success",
    SAVE_DISTRICT_ERROR="[Districts] save district Error",
    /* delete district*/
    DELETE_DISTRICT="[Districts] delete district",
    DELETE_DISTRICT_SUCCESS="[Districts] delete district Success",
    DELETE_DISTRICT_ERROR="[Districts] delete districtt Error",

    /* edit district*/
    EDIT_DISTRICT="[Districts] edit district",
    EDIT_DISTRICT_SUCCESS="[Districts] edit district Success",
    EDIT_DISTRICT_ERROR="[Districts] edit district Error",

    /* update district*/
    UPDATE_DISTRICT="[Districts] update district",
    UPDATE_DISTRICT_SUCCESS="[Districts] update district Success",
    UPDATE_DISTRICT_ERROR="[Districts] update district Error",

    /* search  district*/
    SEARCH_DISTRICT="[District] Search District",
    SEARCH_DISTRICT_SUCCESS="[District] Search District Success",
    SEARCH_DISTRICT_ERROR="[District] Search District Error",

    LOAD_NEXT_PAGE = '[Districts] Load Next Page',
}

/* Search districts Actions*/
export class SearchDistrictAction implements Action{
  type: DistrictActionsTypes=DistrictActionsTypes.SEARCH_DISTRICT;
  constructor(public payload:string) {
  }
}

export class SearchDistrictActionSuccess implements Action{
  type: DistrictActionsTypes=DistrictActionsTypes.SEARCH_DISTRICT_SUCCESS;
  constructor(public payload:District[]) {
  }
}

export class SearchDistrictActionError implements Action{
  type: DistrictActionsTypes=DistrictActionsTypes.SEARCH_DISTRICT_ERROR;
  constructor(public payload:string) {
  }
}

export class LoadNextPageAction implements Action {
    readonly type: DistrictActionsTypes = DistrictActionsTypes.LOAD_NEXT_PAGE;
}

// new district
export class NewDistrictAction implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.NEW_DISTRICT;
    constructor(public payload:any) {
    }
}
export class NewDistrictActionSuccess implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.NEW_DISTRICT_SUCCESS;
    constructor(public payload:any) {
    }
}

export class NewDistrictActionError implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.NEW_DISTRICT_ERROR;
    constructor(public payload:string) {
    }
}

// get all District
export class GetAllDistrictAction implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.GET_ALL_DISTRICTS;
    constructor(public payload:any) {
    }
}
export class GetAllDistrictActionSuccess implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.GET_ALL_DISTRICTS_SUCCESS;

    constructor(public payload: District[]) {
    }
}

export class GetAllDistrictActionError implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.GET_ALL_DISTRICTS_ERROR;
    constructor(public payload:string) {
    }
}
/* save District Actions*/

export class SaveDistrictAction implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.SAVE_DISTRICT;
    constructor(public payload:District) {
    }
}

export class SaveDistrictActionSuccess implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.SAVE_DISTRICT_SUCCESS;
    constructor(public payload:District) {
    }
}

export class SaveDistrictActionError implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.SAVE_DISTRICT_ERROR;
    constructor(public payload:string) {
    }
}

/* delete District Actions*/

export class DeleteDistrictAction implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.DELETE_DISTRICT;
    constructor(public payload:District) {
    }
}

export class DeleteDistrictActionSuccess implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.DELETE_DISTRICT_SUCCESS;
    constructor(public payload:District) {
    }
}

export class DeleteDistrictActionError implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.DELETE_DISTRICT_ERROR;
    constructor(public payload:string) {
    }
}

/* edit District Actions*/

export class EditDistrictAction implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.EDIT_DISTRICT;
    constructor(public payload:number) {
    }
}

export class EditDistrictActionSuccess implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.EDIT_DISTRICT_SUCCESS;
    constructor(public payload:District) {
    }
}

export class EditDistrictActionError implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.EDIT_DISTRICT_ERROR;
    constructor(public payload:string) {
    }
}

/* update District Actions*/

export class UpdateDistrictAction implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.UPDATE_DISTRICT;
    constructor(public payload:District) {
    }
}

export class UpdateDistrictActionSuccess implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.UPDATE_DISTRICT_SUCCESS;
    constructor(public payload:District) {
    }
}

export class UpdateDistrictActionError implements Action{
    type: DistrictActionsTypes=DistrictActionsTypes.UPDATE_DISTRICT_ERROR;
    constructor(public payload:string) {
    }
}
export type DistrictsActions=
    NewDistrictAction | NewDistrictActionSuccess | NewDistrictActionError
    |SaveDistrictAction | SaveDistrictActionSuccess | SaveDistrictActionError
    |DeleteDistrictAction | DeleteDistrictActionSuccess | DeleteDistrictActionError
    |GetAllDistrictAction | GetAllDistrictActionSuccess | GetAllDistrictActionError
    |UpdateDistrictAction | UpdateDistrictActionSuccess | UpdateDistrictActionError
  |SearchDistrictAction | SearchDistrictActionSuccess | SearchDistrictActionError
    ;
