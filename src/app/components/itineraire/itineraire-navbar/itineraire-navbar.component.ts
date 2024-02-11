import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GetAllItineraireAction, NewItineraireAction} from "../ngrx/itineraire.actions";
import {NewItineraireComponent} from "../new-itineraire/new-itineraire.component";

@Component({
  selector: 'app-itineraire-navbar',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './itineraire-navbar.component.html',
  styleUrl: './itineraire-navbar.component.scss'
})
export class ItineraireNavbarComponent {
  constructor(private store:Store<any>,private modalService: NgbModal) {
  }

  onGetAllItineraires() {
    this.store.dispatch(new GetAllItineraireAction({}))
  }

  onNewItineraire() {
    const modalRef = this.modalService.open(NewItineraireComponent);
  }

  onSearch(value: any) {

  }
}
