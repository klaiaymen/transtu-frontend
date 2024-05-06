import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonDirective, CardBodyComponent, CardComponent, ColComponent, TableDirective} from "@coreui/angular";
import {LigneItemComponent} from "../../ligne/ligne-list/ligne-item/ligne-item.component";
import {Ligne} from "../../ligne/model/ligne.model";
import {LignesState} from "../../ligne/ngrx/ligne.reducers";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {LoadNextPageAction} from "../../moyens-transport/ngrx/moyensTransport.actions";
import {Station} from "../model/station.model";
import {StationsState} from "../ngrx/station.reducers";
import {StationItemComponent} from "./station-item/station-item.component";
import {AuthService} from "../../authService/auth.service";

@Component({
  selector: 'app-station-list',
  standalone: true,
  imports: [CommonModule, ButtonDirective, CardBodyComponent, CardComponent, ColComponent, LigneItemComponent, TableDirective, StationItemComponent],
  templateUrl: './station-list.component.html',
  styleUrl: './station-list.component.scss'
})
export class StationListComponent implements OnInit{

  @Input() station: Station|null=null;
  @Input() state:StationsState|null=null;
  stations$: Observable<Station[]>|null=null;
  currentPage$: Observable<number>|null=null;

  constructor(public authService:AuthService,private store:Store<any>) {
  }


  ngOnInit(): void {
    this.stations$ = this.store.select(state => state.stations);
    this.currentPage$ = this.store.select(state => state.currentPage);
  }

  loadNextPage() {
    this.store.dispatch(new LoadNextPageAction());
  }
}
