import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NewLigneComponent} from "../../ligne/new-ligne/new-ligne.component";
import {GetAllLigneAction} from "../../ligne/ngrx/ligne.actions";
import {NewStationComponent} from "../new-station/new-station.component";
import {GetAllStationAction} from "../ngrx/station.actions";

@Component({
  selector: 'app-station-navbar',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './station-navbar.component.html',
  styleUrl: './station-navbar.component.scss'
})
export class StationNavbarComponent {

  constructor(private store:Store<any>,private modalService: NgbModal) {
  }

  onGetAllStations() {
    this.store.dispatch(new GetAllStationAction({}))
  }

  onNewStation() {
    const modalRef = this.modalService.open(NewStationComponent);
  }

  onSearch(value: any) {

  }
}
