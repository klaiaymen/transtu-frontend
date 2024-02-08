import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DistrictListComponent} from "../district/district-list/district-list.component";
import {DistrictNavbarComponent} from "../district/district-navbar/district-navbar.component";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {GetAllDistrictAction} from "../district/ngrx/district.actions";
import {LignesState, LignesStateEnum} from "./ngrx/ligne.reducers";
import {GetAllLigneAction} from "./ngrx/ligne.actions";
import {LigneNavbarComponent} from "./ligne-navbar/ligne-navbar.component";
import {LigneListComponent} from "./ligne-list/ligne-list.component";

@Component({
  selector: 'app-ligne',
  standalone: true,
  imports: [CommonModule, DistrictListComponent, DistrictNavbarComponent, LigneNavbarComponent, LigneListComponent],
  templateUrl: './ligne.component.html',
  styleUrl: './ligne.component.scss'
})
export class LigneComponent implements OnInit{
  lignesState$:Observable<LignesState>|null=null;
  readonly LignesStateEnum= LignesStateEnum;
  state:LignesState|null=null;

  constructor(private store:Store<any>) {
  }

  ngOnInit(): void {
    this.lignesState$=this.store.pipe(
      map((state)=>  state.lineState)
    );

    this.store.dispatch(new GetAllLigneAction({}))
  }


}
