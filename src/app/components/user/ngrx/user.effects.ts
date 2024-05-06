import {Injectable} from "@angular/core";
import {DistrictsState} from "../../district/ngrx/district.reducers";
import {DistrictService} from "../../district/service/district.services";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {select, Store} from "@ngrx/store";
import {Observable, of, withLatestFrom} from "rxjs";
import {
  DeleteDistrictActionError,
  DeleteDistrictActionSuccess,
  DistrictActionsTypes,
  DistrictsActions, EditDistrictActionError, EditDistrictActionSuccess,
  GetAllDistrictAction,
  GetAllDistrictActionError,
  GetAllDistrictActionSuccess,
  NewDistrictActionSuccess,
  SaveDistrictActionError,
  SaveDistrictActionSuccess, SearchDistrictActionError,
  SearchDistrictActionSuccess, UpdateDistrictActionError, UpdateDistrictActionSuccess
} from "../../district/ngrx/district.actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {UsersState} from "./user.reducers";
import {UserService} from "../services/user.service";
import {
  DeleteUserActionError,
  DeleteUserActionSuccess, EditUserActionError, EditUserActionSuccess,
  GetAllUsersAction,
  GetAllUsersActionError,
  GetAllUsersActionSuccess,
  NewUserActionSuccess,
  SaveUserActionError,
  SaveUserActionSuccess,
  SearchUserActionError,
  SearchUserActionSuccess, UpdateUserActionError, UpdateUserActionSuccess,
  UserActionsTypes,
  UsersActions
} from "./user.actions";

@Injectable()
export class UserEffects {
  state: UsersState|null=null;
  constructor(private userService:UserService, private effectActions:Actions, private store:Store<any>) {
  }

  getAllUsersEffects:Observable<UsersActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(UserActionsTypes.GET_ALL_USERS),
      mergeMap((action: UsersActions)=>{
        return this.userService.getUsers()
          .pipe(
            map((user)=> new GetAllUsersActionSuccess(user)),
            catchError((err)=>of(new GetAllUsersActionError(err.message)))
          )
      })
    )
  );

  loadNextPageEffect: Observable<UsersActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(UserActionsTypes.LOAD_NEXT_PAGE),
      withLatestFrom(this.store.pipe(select((state: UsersState) => state.currentPage))),
      mergeMap(([action, currentPage]) => {
        return of(new GetAllUsersAction({ page: currentPage + 1, pageSize: 2 }));
      })
    )
  );


  /* new user*/
  newUserEffect:Observable<UsersActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(UserActionsTypes.NEW_USER),
      map((action: UsersActions)=>{
        return new NewUserActionSuccess({});
      })
    )
  );

  /* save user*/
  saveUserEffect:Observable<UsersActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(UserActionsTypes.SAVE_USER),
      mergeMap((action: UsersActions)=>{
        return this.userService.save(action.payload)
          .pipe(
            map((user)=> new SaveUserActionSuccess(user)),
            catchError((err)=>of(new SaveUserActionError(err.message)))
          )
      })
    )
  );

  /* delete User*/
  deleteUserEffect:Observable<UsersActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(UserActionsTypes.DELETE_USER),
      mergeMap((action: UsersActions)=>{
        return this.userService.delete(action.payload.userId)
          .pipe(
            map(()=> new DeleteUserActionSuccess(action.payload)),
            catchError((err)=>of(new DeleteUserActionError(err.message)))
          )
      })
    )
  );

  /*Search user*/
  searchUserEffect:Observable<UsersActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(UserActionsTypes.SEARCH_USER),
      mergeMap((action: UsersActions)=>{
        return this.userService.searchUsers(action.payload)
          .pipe(
            map((users)=> new SearchUserActionSuccess(users)),
            catchError((err)=>of(new SearchUserActionError(err.message)))
          )
      })
    )
  );

  /* edit user*/
  editUserEffect:Observable<UsersActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(UserActionsTypes.EDIT_USER),
      mergeMap((action: UsersActions)=>{
        return this.userService.getUserById(action.payload)
          .pipe(
            map((u)=> new EditUserActionSuccess(u)),
            catchError((err)=>of(new EditUserActionError(err.message)))
          )
      })
    )
  );

  /* update user*/
  updateUserEffect:Observable<UsersActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(UserActionsTypes.UPDATE_USER),
      mergeMap((action: UsersActions)=>{
        return this.userService.update(action.payload)
          .pipe(
            map((user)=> new UpdateUserActionSuccess(user)),
            catchError((err)=>of(new UpdateUserActionError(err.message)))
          )
      })
    )
  );
}
