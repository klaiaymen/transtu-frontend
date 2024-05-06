import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DistrictListComponent} from "../district/district-list/district-list.component";
import {DistrictNavbarComponent} from "../district/district-navbar/district-navbar.component";
import {UserNavbarComponent} from "./user-navbar/user-navbar.component";
import {Observable} from "rxjs";
import {DistrictsState} from "../district/ngrx/district.reducers";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {GetAllDistrictAction} from "../district/ngrx/district.actions";
import {UsersState, UsersStateEnum} from "./ngrx/user.reducers";
import {GetAllUsersAction} from "./ngrx/user.actions";
import {UserListComponent} from "./user-list/user-list.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, DistrictListComponent, DistrictNavbarComponent, UserNavbarComponent, UserListComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{
  usersState$:Observable<UsersState>|null=null;
  readonly UsersStateEnum= UsersStateEnum;
  state:UsersState|null=null;

  constructor(private store:Store<any>) {
  }

  ngOnInit(): void {
    this.usersState$=this.store.pipe(
      map((state)=>  state.userState)
    );

    this.store.dispatch(new GetAllUsersAction({}))
  }
}
