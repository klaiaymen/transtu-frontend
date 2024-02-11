import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StationListComponent} from "../station/station-list/station-list.component";
import {StationNavbarComponent} from "../station/station-navbar/station-navbar.component";
import {Observable} from "rxjs";
import {StationsState} from "../station/ngrx/station.reducers";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {GetAllStationAction} from "../station/ngrx/station.actions";
import {PointsState, PointsStateEnum} from "./ngrx/point.reducers";
import {GetAllPointAction} from "./ngrx/point.actions";
import {PointListComponent} from "./point-list/point-list.component";
import {PointNavbarComponent} from "./point-navbar/point-navbar.component";

@Component({
  selector: 'app-point',
  standalone: true,
  imports: [CommonModule, StationListComponent, StationNavbarComponent, PointListComponent, PointNavbarComponent],
  templateUrl: './point.component.html',
  styleUrl: './point.component.scss'
})
export class PointComponent {
  PointsState$:Observable<PointsState>|null=null;
  readonly PointsStateEnum= PointsStateEnum;
  state:PointsState|null=null;

  constructor(private store:Store<any>) {
  }

  ngOnInit(): void {
    this.PointsState$=this.store.pipe(
      map((state)=>  state.pointState)
    );

    this.store.dispatch(new GetAllPointAction({}))
  }

}
