import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LigneListComponent} from "../ligne/ligne-list/ligne-list.component";
import {LigneNavbarComponent} from "../ligne/ligne-navbar/ligne-navbar.component";
import {Observable} from "rxjs";
import {LignesState} from "../ligne/ngrx/ligne.reducers";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {GetAllLigneAction} from "../ligne/ngrx/ligne.actions";
import {StationsState, StationsStateEnum} from "./ngrx/station.reducers";
import {GetAllStationAction} from "./ngrx/station.actions";
import {StationListComponent} from "./station-list/station-list.component";
import {StationNavbarComponent} from "./station-navbar/station-navbar.component";

@Component({
  selector: 'app-station',
  standalone: true,
  imports: [CommonModule, LigneListComponent, LigneNavbarComponent, StationListComponent, StationNavbarComponent],
  templateUrl: './station.component.html',
  styleUrl: './station.component.scss'
})
export class StationComponent implements OnInit{
  StationsState$:Observable<StationsState>|null=null;
  readonly StationsStateEnum= StationsStateEnum;
  state:StationsState|null=null;

  constructor(private store:Store<any>) {
  }

  ngOnInit(): void {
    this.StationsState$=this.store.pipe(
      map((state)=>  state.stationState)
    );

    this.store.dispatch(new GetAllStationAction({}))
  }
}
