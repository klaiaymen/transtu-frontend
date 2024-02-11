import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LigneListComponent} from "../ligne/ligne-list/ligne-list.component";
import {LigneNavbarComponent} from "../ligne/ligne-navbar/ligne-navbar.component";
import {ItineraireListComponent} from "./itineraire-list/itineraire-list.component";
import {Observable} from "rxjs";
import {LignesState} from "../ligne/ngrx/ligne.reducers";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {GetAllLigneAction} from "../ligne/ngrx/ligne.actions";
import {ItinerairesState, ItinerairesStateEnum} from "./ngrx/itineraire.reducers";
import {GetAllItineraireAction} from "./ngrx/itineraire.actions";
import {ItineraireNavbarComponent} from "./itineraire-navbar/itineraire-navbar.component";

@Component({
  selector: 'app-itineraire',
  standalone: true,
  imports: [CommonModule, LigneListComponent, LigneNavbarComponent, ItineraireListComponent, ItineraireNavbarComponent],
  templateUrl: './itineraire.component.html',
  styleUrl: './itineraire.component.scss'
})
export class ItineraireComponent implements OnInit{
  itinerairesState$:Observable<ItinerairesState>|null=null;
  readonly ItineriresStateEnum= ItinerairesStateEnum;
  state:ItinerairesState|null=null;

  constructor(private store:Store<any>) {
  }

  ngOnInit(): void {
    this.itinerairesState$=this.store.pipe(
      map((state)=>  state.itineraireState)
    );

    this.store.dispatch(new GetAllItineraireAction({}))
  }
}
