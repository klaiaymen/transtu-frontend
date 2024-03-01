import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NewReclamationComponent} from "../new-reclamation/new-reclamation.component";
import {GetAllReclamationAction, SearchReclamationAction} from "../ngrx/reclamation.actions";

@Component({
  selector: 'app-reclamation-navbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './reclamation-navbar.component.html',
  styleUrl: './reclamation-navbar.component.scss'
})
export class ReclamationNavbarComponent {
  searchQuery: string='';
  constructor(private store:Store<any>,private modalService: NgbModal) {
  }

  onGetAllReclamations() {
    this.store.dispatch(new GetAllReclamationAction({}))
  }

 /* onNewReclamation() {
    const modalRef = this.modalService.open(NewReclamationComponent);
  }*/

  searchReclamations(query: string) {
    if (query.trim() !== '') {
      this.store.dispatch(new SearchReclamationAction(query));
    } else {
      this.onGetAllReclamations()
    }
  }
}
