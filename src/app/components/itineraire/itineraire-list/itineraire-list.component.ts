import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonDirective, CardBodyComponent, CardComponent, ColComponent, TableDirective} from "@coreui/angular";
import {LigneItemComponent} from "../../ligne/ligne-list/ligne-item/ligne-item.component";
import {LoadNextPageAction} from "../../moyens-transport/ngrx/moyensTransport.actions";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Itineraire} from "../model/itineraire.model";
import {ItinerairesState} from "../ngrx/itineraire.reducers";
import {ItineraireItemComponent} from "./itineraire-item/itineraire-item.component";

@Component({
  selector: 'app-itineraire-list',
  standalone: true,
  imports: [CommonModule, ButtonDirective, CardBodyComponent, CardComponent, ColComponent, LigneItemComponent, TableDirective, ItineraireItemComponent],
  templateUrl: './itineraire-list.component.html',
  styleUrl: './itineraire-list.component.scss'
})
export class ItineraireListComponent implements  OnInit{

  @Input() itineraire: Itineraire|null=null;
  @Input() state:ItinerairesState|null=null;
  itineraires$: Observable<Itineraire[]>|null=null;
  currentPage$: Observable<number>|null=null;

  constructor(private store:Store<any>) {
  }

  ngOnInit(): void {
    this.itineraires$ = this.store.select(state => state.itineraires);
    this.currentPage$ = this.store.select(state => state.currentPage);
  }

  loadNextPage() {
    this.store.dispatch(new LoadNextPageAction());
  }
}
