import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NewDistrictComponent} from "../../district/new-district/new-district.component";
import {GetAllDistrictAction} from "../../district/ngrx/district.actions";
import {Store} from "@ngrx/store";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NewLigneComponent} from "../new-ligne/new-ligne.component";
import {GetAllLigneAction, SearchLigneAction} from "../ngrx/ligne.actions";
import {SearchMTAction} from "../../moyens-transport/ngrx/moyensTransport.actions";

@Component({
  selector: 'app-ligne-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ligne-navbar.component.html',
  styleUrl: './ligne-navbar.component.scss'
})
export class LigneNavbarComponent {
  searchQuery: string='';

  constructor(private store:Store<any>,private modalService: NgbModal) {
  }


  onNewLigne() {
    const modalRef = this.modalService.open(NewLigneComponent);
  }

  onGetAllLignes() {
    this.store.dispatch(new GetAllLigneAction({}))
  }

  searchLignes(query: string) {
    if (query.trim() !== '') {
      this.store.dispatch(new SearchLigneAction(query));
    } else {
      this.onGetAllLignes()
    }
  }
}
