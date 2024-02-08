import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonDirective, CardBodyComponent, CardComponent, ColComponent, TableDirective} from "@coreui/angular";
import {DistrictItemComponent} from "../../district/district-list/district-item/district-item.component";
import {District} from "../../district/model/district.model";
import {DistrictsState} from "../../district/ngrx/district.reducers";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {LoadNextPageAction} from "../../moyens-transport/ngrx/moyensTransport.actions";
import {Ligne} from "../model/ligne.model";
import {LignesState} from "../ngrx/ligne.reducers";
import {LigneItemComponent} from "./ligne-item/ligne-item.component";

@Component({
  selector: 'app-ligne-list',
  standalone: true,
  imports: [CommonModule, ButtonDirective, CardBodyComponent, CardComponent, ColComponent, DistrictItemComponent, TableDirective, LigneItemComponent],
  templateUrl: './ligne-list.component.html',
  styleUrl: './ligne-list.component.scss'
})
export class LigneListComponent implements OnInit{

  @Input() ligne: Ligne|null=null;
  @Input() state:LignesState|null=null;
  lignes$: Observable<Ligne[]>|null=null;
  currentPage$: Observable<number>|null=null;

  constructor(private store:Store<any>) {
  }

  ngOnInit(): void {
    this.lignes$ = this.store.select(state => state.lignes);
    this.currentPage$ = this.store.select(state => state.currentPage);
  }

  loadNextPage() {
    this.store.dispatch(new LoadNextPageAction());
  }
}
