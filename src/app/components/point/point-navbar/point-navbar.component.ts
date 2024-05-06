import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GetAllPointAction} from "../ngrx/point.actions";
import {NewPointComponent} from "../new-point/new-point.component";
import {AuthService} from "../../authService/auth.service";

@Component({
  selector: 'app-point-navbar',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './point-navbar.component.html',
  styleUrl: './point-navbar.component.scss'
})
export class PointNavbarComponent {
  constructor(public authService:AuthService,private store:Store<any>,private modalService: NgbModal) {
  }

  onGetAllPoints() {
    this.store.dispatch(new GetAllPointAction({}))
  }

  onNewPoint() {
    const modalRef = this.modalService.open(NewPointComponent);
  }

  onSearch(value: any) {

  }
}
