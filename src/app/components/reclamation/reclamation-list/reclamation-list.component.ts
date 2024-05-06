import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonDirective, CardBodyComponent, CardComponent, ColComponent, TableDirective} from "@coreui/angular";
import {DistrictItemComponent} from "../../district/district-list/district-item/district-item.component";
import {District} from "../../district/model/district.model";
import {DistrictsState} from "../../district/ngrx/district.reducers";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {LoadNextPageAction} from "../../moyens-transport/ngrx/moyensTransport.actions";
import {ReclamationsState} from "../ngrx/reclamation.reducers";
import {Reclamation} from "../model/reclamation.model";
import {ReclamationItemComponent} from "./reclamation-item/reclamation-item.component";
import {ReclamationService} from "../service/reclamation.service";

@Component({
  selector: 'app-reclamation-list',
  standalone: true,
  imports: [CommonModule, ButtonDirective, CardBodyComponent, CardComponent, ColComponent, DistrictItemComponent, TableDirective, ReclamationItemComponent],
  templateUrl: './reclamation-list.component.html',
  styleUrl: './reclamation-list.component.scss'
})
export class ReclamationListComponent implements OnInit{
  @Input() reclamation: Reclamation|null=null;
  @Input() state:ReclamationsState|null=null;
  reclamations$: Observable<Reclamation[]>|null=null;
  currentPage$: Observable<number>|null=null;
  reclamations: Reclamation[] | undefined;
  constructor(private reclamationService:ReclamationService,private store:Store<any>) {
  }

  ngOnInit(): void {
    //this.reclamations$ = this.store.select(state => state.reclamations);
    //this.currentPage$ = this.store.select(state => state.currentPage);
  }

  loadNextPage() {
    this.store.dispatch(new LoadNextPageAction());
  }

}
