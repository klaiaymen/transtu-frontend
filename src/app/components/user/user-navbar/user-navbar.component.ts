import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../authService/auth.service";
import {GetAllUsersAction, SearchUserAction} from "../ngrx/user.actions";
import {NewUserComponent} from "../new-user/new-user.component";

@Component({
  selector: 'app-user-navbar',
  standalone: true,
    imports: [CommonModule, FormsModule],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.scss'
})
export class UserNavbarComponent {
  searchQuery: string='';
  constructor(private store:Store<any>,private modalService: NgbModal,public authService:AuthService) {
  }


  onNewUser() {
    const modalRef = this.modalService.open(NewUserComponent);
  }

  onGetAllUsers() {
    this.store.dispatch(new GetAllUsersAction({}))
  }

  searchUsers(query: string) {
    if (query.trim() !== '') {
      this.store.dispatch(new SearchUserAction(query));
    } else {
      this.onGetAllUsers()
    }
  }
}
