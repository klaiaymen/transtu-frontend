import {Action} from "@ngrx/store";
import {AppUser} from "../model/user.model";

export enum UserActionsTypes{
  /* Get All users*/
  GET_ALL_USERS="[users] Get All users",
  GET_ALL_USERS_SUCCESS="[users] Get All users Success",
  GET_ALL_USERS_ERROR="[users] Get All users Error",
  /* new USER*/
  NEW_USER="[USER] new USER",
  NEW_USER_SUCCESS="[USER] new USER Success",
  NEW_USER_ERROR="[USER] new USER Error",
  /* save USER*/
  SAVE_USER="[USER] save USER",
  SAVE_USER_SUCCESS="[USER] save USER Success",
  SAVE_USER_ERROR="[USER] save USER Error",
  /* delete USER*/
  DELETE_USER="[USER] delete USER",
  DELETE_USER_SUCCESS="[USER] delete USER Success",
  DELETE_USER_ERROR="[USER] delete USER Error",

  /* edit USER*/
  EDIT_USER="[USER] edit USER",
  EDIT_USER_SUCCESS="[USER] edit USER Success",
  EDIT_USER_ERROR="[USER] edit USER Error",

  /* update USER*/
  UPDATE_USER="[USER] update USER",
  UPDATE_USER_SUCCESS="[USER] update USER Success",
  UPDATE_USER_ERROR="[USER] update USER Error",

  /* search  USER*/
  SEARCH_USER="[USER] Search USER",
  SEARCH_USER_SUCCESS="[USER] Search USER Success",
  SEARCH_USER_ERROR="[USER] Search USER Error",

  LOAD_NEXT_PAGE = '[USER] Load Next Page',
}

/* Search USERs Actions*/
export class SearchUserAction implements Action{
  type: UserActionsTypes=UserActionsTypes.SEARCH_USER;
  constructor(public payload:string) {
  }
}

export class SearchUserActionSuccess implements Action{
  type: UserActionsTypes=UserActionsTypes.SEARCH_USER_SUCCESS;
  constructor(public payload:AppUser[]) {
  }
}

export class SearchUserActionError implements Action{
  type: UserActionsTypes=UserActionsTypes.SEARCH_USER_ERROR;
  constructor(public payload:string) {
  }
}

export class LoadNextPageAction implements Action {
  readonly type: UserActionsTypes = UserActionsTypes.LOAD_NEXT_PAGE;
}

// new user
export class NewUserAction implements Action{
  type: UserActionsTypes=UserActionsTypes.NEW_USER;
  constructor(public payload:any) {
  }
}
export class NewUserActionSuccess implements Action{
  type: UserActionsTypes=UserActionsTypes.NEW_USER_SUCCESS;
  constructor(public payload:any) {
  }
}

export class NewUserActionError implements Action{
  type: UserActionsTypes=UserActionsTypes.NEW_USER_ERROR;
  constructor(public payload:string) {
  }
}

// get all users
export class GetAllUsersAction implements Action{
  type: UserActionsTypes=UserActionsTypes.GET_ALL_USERS;
  constructor(public payload:any) {
  }
}
export class GetAllUsersActionSuccess implements Action{
  type: UserActionsTypes=UserActionsTypes.GET_ALL_USERS_SUCCESS;

  constructor(public payload: AppUser[]) {
  }
}

export class GetAllUsersActionError implements Action{
  type: UserActionsTypes=UserActionsTypes.GET_ALL_USERS_ERROR;
  constructor(public payload:string) {
  }
}
/* save User Actions*/

export class SaveUserAction implements Action{
  type: UserActionsTypes=UserActionsTypes.SAVE_USER;
  constructor(public payload:AppUser) {
  }
}

export class SaveUserActionSuccess implements Action{
  type: UserActionsTypes=UserActionsTypes.SAVE_USER_SUCCESS;
  constructor(public payload:AppUser) {
  }
}

export class SaveUserActionError implements Action{
  type: UserActionsTypes=UserActionsTypes.SAVE_USER_ERROR;
  constructor(public payload:string) {
  }
}

/* delete User Actions*/

export class DeleteUserAction implements Action{
  type: UserActionsTypes=UserActionsTypes.DELETE_USER;
  constructor(public payload:AppUser) {
  }
}

export class DeleteUserActionSuccess implements Action{
  type: UserActionsTypes=UserActionsTypes.DELETE_USER_SUCCESS;
  constructor(public payload:AppUser) {
  }
}

export class DeleteUserActionError implements Action{
  type: UserActionsTypes=UserActionsTypes.DELETE_USER_ERROR;
  constructor(public payload:string) {
  }
}

/* edit user Actions*/

export class EditUserAction implements Action{
  type: UserActionsTypes=UserActionsTypes.EDIT_USER;
  constructor(public payload:string) {
  }
}

export class EditUserActionSuccess implements Action{
  type: UserActionsTypes=UserActionsTypes.EDIT_USER_SUCCESS;
  constructor(public payload:AppUser) {
  }
}

export class EditUserActionError implements Action{
  type: UserActionsTypes=UserActionsTypes.EDIT_USER_ERROR;
  constructor(public payload:string) {
  }
}

/* update user Actions*/

export class UpdateUserAction implements Action{
  type: UserActionsTypes=UserActionsTypes.UPDATE_USER;
  constructor(public payload:AppUser) {
  }
}

export class UpdateUserActionSuccess implements Action{
  type: UserActionsTypes=UserActionsTypes.UPDATE_USER_SUCCESS;
  constructor(public payload:AppUser) {
  }
}

export class UpdateUserActionError implements Action{
  type: UserActionsTypes=UserActionsTypes.UPDATE_USER_ERROR;
  constructor(public payload:string) {
  }
}
export type UsersActions=
  NewUserAction | NewUserActionSuccess | NewUserActionError
  |SaveUserAction | SaveUserActionSuccess | SaveUserActionError
  |DeleteUserAction | DeleteUserActionSuccess | DeleteUserActionError
  |GetAllUsersAction | GetAllUsersActionSuccess | GetAllUsersActionError
  |UpdateUserAction | UpdateUserActionSuccess | UpdateUserActionError
  |SearchUserAction | SearchUserActionSuccess | SearchUserActionError
  ;
