import {Action} from "@ngrx/store";
import {AppUser} from "../model/user.model";
import {UserActionsTypes, UsersActions} from "./user.actions";

export enum UsersStateEnum{
  LOADING="Loading",
  LOADED="Loaded",
  ERROR="Error",
  INITIAL="Initial",
  NEW="NEW",
  EDIT="EDIT",
  UPDATED="UPDATED"
}

export interface UsersState{
  users:AppUser[],
  errorMessage:string,
  dataState:UsersStateEnum,
  currentUser: AppUser|null,
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

const initState:UsersState={
  users:[],
  errorMessage:"",
  dataState:UsersStateEnum.INITIAL,
  currentUser:null,
  currentPage: 1,
  pageSize: 2,
  totalPages: 0,
}
export function userReducers (state =initState,action :Action): UsersState{
  switch (action.type) {
    /*get all users */
    case UserActionsTypes.GET_ALL_USERS:
      return {...state, dataState:UsersStateEnum.LOADING }
    case UserActionsTypes.GET_ALL_USERS_SUCCESS:
      return {...state, dataState:UsersStateEnum.LOADED, users:(<UsersActions>action).payload}
    case UserActionsTypes.GET_ALL_USERS_ERROR:
      return {...state, dataState:UsersStateEnum.ERROR,errorMessage:(<UsersActions>action).payload }

    /*new user */
    case UserActionsTypes.NEW_USER:
      return {...state, dataState:UsersStateEnum.LOADING }
    case UserActionsTypes.NEW_USER_SUCCESS:
      return {...state, dataState:UsersStateEnum.NEW}
    case UserActionsTypes.NEW_USER_ERROR:
      return {...state, dataState:UsersStateEnum.ERROR,errorMessage:(<UsersActions>action).payload }

    /* save user*/
    case UserActionsTypes.SAVE_USER:
      return {...state, dataState:UsersStateEnum.LOADING }
    case UserActionsTypes.SAVE_USER_SUCCESS:
      let users:AppUser[]=[...state.users];
      users.push((<UsersActions>action).payload);
      return {...state, dataState:UsersStateEnum.LOADED,users:users}
    case UserActionsTypes.SAVE_USER_ERROR:
      return {...state, dataState:UsersStateEnum.ERROR, errorMessage:(<UsersActions>action).payload}

    /* delete user*/
    case UserActionsTypes.DELETE_USER:
      return {...state, dataState:UsersStateEnum.LOADING }
    case UserActionsTypes.DELETE_USER_SUCCESS:
      let u:AppUser=(<UsersActions>action).payload;
      let index= state.users.indexOf(u);
      let UsersList=[...state.users];
      UsersList.splice(index,1);
      return {...state, dataState:UsersStateEnum.LOADED, users:UsersList}
    case UserActionsTypes.DELETE_USER_ERROR:
      return {...state, dataState:UsersStateEnum.ERROR, errorMessage:(<UsersActions>action).payload}

    /* edit user*/
    case UserActionsTypes.EDIT_USER:
      return {...state, dataState:UsersStateEnum.LOADING }
    case UserActionsTypes.EDIT_USER_SUCCESS:
      return {...state, dataState:UsersStateEnum.LOADED,currentUser:(<UsersActions>action).payload}
    case UserActionsTypes.EDIT_USER_ERROR:
      return {...state, dataState:UsersStateEnum.ERROR, errorMessage:(<UsersActions>action).payload}


    /* update user*/
    case UserActionsTypes.UPDATE_USER:
      return {...state, dataState:UsersStateEnum.LOADING }
    case UserActionsTypes.UPDATE_USER_SUCCESS:
      let updatedUser: AppUser=(<UsersActions>action).payload;
      let updatedUsers= state.users.map(u=>(u.userId==updatedUser.userId)?updatedUser:u);
      return {...state, dataState:UsersStateEnum.UPDATED,users:updatedUsers}
    case UserActionsTypes.UPDATE_USER_ERROR:
      return {...state, dataState:UsersStateEnum.ERROR, errorMessage:(<UsersActions>action).payload}

    /* search user*/
    case UserActionsTypes.SEARCH_USER:
      return {...state, dataState:UsersStateEnum.LOADING }
    case UserActionsTypes.SEARCH_USER_SUCCESS:
      return {...state, dataState:UsersStateEnum.LOADED, users:(<UsersActions>action).payload}
    case UserActionsTypes.SEARCH_USER_ERROR:
      return {...state, dataState:UsersStateEnum.ERROR, errorMessage:(<UsersActions>action).payload}

    case UserActionsTypes.LOAD_NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    default : return {...state}
  }
}

