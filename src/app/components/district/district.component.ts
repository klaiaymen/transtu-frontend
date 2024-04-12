import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MtListComponent} from "../moyens-transport/mt-list/mt-list.component";
import {DistrictNavbarComponent} from "./district-navbar/district-navbar.component";
import {Observable} from "rxjs";
import {DistrictsState, DistrictsStateEnum} from "./ngrx/district.reducers";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {GetAllDistrictAction} from "./ngrx/district.actions";
import {DistrictListComponent} from "./district-list/district-list.component";

@Component({
  selector: 'app-district',
  standalone: true,
  imports: [CommonModule, MtListComponent, DistrictNavbarComponent, DistrictListComponent],
  templateUrl: './district.component.html',
  styleUrl: './district.component.scss'
})
export class DistrictComponent implements  OnInit{
  districtsState$:Observable<DistrictsState>|null=null;
  readonly DistrictsStateEnum= DistrictsStateEnum;
  state:DistrictsState|null=null;

  constructor(private store:Store<any>) {
  }

  ngOnInit(): void {
    this.districtsState$=this.store.pipe(
        map((state)=>  state.districtState)
    );

    this.store.dispatch(new GetAllDistrictAction({}))
  }

}
