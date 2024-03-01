import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DistrictListComponent} from "../district/district-list/district-list.component";
import {DistrictNavbarComponent} from "../district/district-navbar/district-navbar.component";
import {ReclamationNavbarComponent} from "./reclamation-navbar/reclamation-navbar.component";
import {ReclamationListComponent} from "./reclamation-list/reclamation-list.component";
import {Observable} from "rxjs";
import {DistrictsState} from "../district/ngrx/district.reducers";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {GetAllDistrictAction} from "../district/ngrx/district.actions";
import {ReclamationsState, ReclamationsStateEnum} from "./ngrx/reclamation.reducers";
import {GetAllReclamationAction} from "./ngrx/reclamation.actions";

@Component({
  selector: 'app-reclamation',
  standalone: true,
  imports: [CommonModule, DistrictListComponent, DistrictNavbarComponent, ReclamationNavbarComponent, ReclamationListComponent],
  templateUrl: './reclamation.component.html',
  styleUrl: './reclamation.component.scss'
})
export class ReclamationComponent {
  reclamationsState$:Observable<ReclamationsState>|null=null;
  readonly ReclamationsStateEnum= ReclamationsStateEnum;
  state:ReclamationsState|null=null;

  constructor(private store:Store<any>) {
  }

  ngOnInit(): void {
    this.reclamationsState$=this.store.pipe(
      map((state)=>  state.reclamationState)
    );

    this.store.dispatch(new GetAllReclamationAction({}))
  }
}
