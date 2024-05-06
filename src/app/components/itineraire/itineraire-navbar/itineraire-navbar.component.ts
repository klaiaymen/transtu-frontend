import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GetAllItineraireAction, NewItineraireAction, SearchItineraireAction} from "../ngrx/itineraire.actions";
import {NewItineraireComponent} from "../new-itineraire/new-itineraire.component";
import {SearchMTAction} from "../../moyens-transport/ngrx/moyensTransport.actions";
import {AuthService} from "../../authService/auth.service";

@Component({
  selector: 'app-itineraire-navbar',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './itineraire-navbar.component.html',
  styleUrl: './itineraire-navbar.component.scss'
})
export class ItineraireNavbarComponent {
  searchQuery: string='';
  constructor(public authService:AuthService,private store:Store<any>,private modalService: NgbModal) {
  }

  onGetAllItineraires() {
    this.store.dispatch(new GetAllItineraireAction({}))
  }

  onNewItineraire() {
    const modalRef = this.modalService.open(NewItineraireComponent);
  }


  searchItineraires(query: string) {
    if (query.trim() !== '') {
      this.store.dispatch(new SearchItineraireAction(query));
    } else {
      this.onGetAllItineraires()
    }

  }
}
