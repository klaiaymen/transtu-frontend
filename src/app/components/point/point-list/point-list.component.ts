import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonDirective, CardBodyComponent, CardComponent, ColComponent, TableDirective} from "@coreui/angular";
import {StationItemComponent} from "../../station/station-list/station-item/station-item.component";
import {Station} from "../../station/model/station.model";
import {StationsState} from "../../station/ngrx/station.reducers";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {LoadNextPageAction} from "../../moyens-transport/ngrx/moyensTransport.actions";
import {Points} from "../model/point.model";
import {PointsState} from "../ngrx/point.reducers";
import {PointItemComponent} from "./point-item/point-item.component";

@Component({
  selector: 'app-point-list',
  standalone: true,
  imports: [CommonModule, ButtonDirective, CardBodyComponent, CardComponent, ColComponent, StationItemComponent, TableDirective, PointItemComponent],
  templateUrl: './point-list.component.html',
  styleUrl: './point-list.component.scss'
})
export class PointListComponent implements  OnInit{
  @Input() point: Points|null=null;
  @Input() state:PointsState|null=null;
  points$: Observable<Points[]>|null=null;
  currentPage$: Observable<number>|null=null;

  constructor(private store:Store<any>) {
  }


  ngOnInit(): void {
    this.points$ = this.store.select(state => state.points);
    this.currentPage$ = this.store.select(state => state.currentPage);
  }

  loadNextPage() {
    this.store.dispatch(new LoadNextPageAction());
  }
}
