import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonDirective, CardBodyComponent, CardComponent, ColComponent, TableDirective} from "@coreui/angular";
import {DistrictItemComponent} from "../../district/district-list/district-item/district-item.component";
import {District} from "../../district/model/district.model";
import {DistrictsState} from "../../district/ngrx/district.reducers";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {LoadNextPageAction} from "../../moyens-transport/ngrx/moyensTransport.actions";
import {AppUser} from "../model/user.model";
import {UsersState} from "../ngrx/user.reducers";
import {UserItemComponent} from "./user-item/user-item.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ButtonDirective, CardBodyComponent, CardComponent, ColComponent, DistrictItemComponent, TableDirective, UserItemComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @Input() user: AppUser|null=null;
  @Input() state:UsersState|null=null;
  users$: Observable<AppUser[]>|null=null;
  currentPage$: Observable<number>|null=null;

  constructor(private store:Store<any>) {
  }

  ngOnInit(): void {
    this.users$ = this.store.select(state => state.users);
    this.currentPage$ = this.store.select(state => state.currentPage);
  }

  loadNextPage() {
    this.store.dispatch(new LoadNextPageAction());
  }
}
