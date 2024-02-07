import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonDirective, CardBodyComponent, CardComponent, ColComponent, TableDirective} from "@coreui/angular";
import {MtItemComponent} from "../../moyens-transport/mt-list/mt-item/mt-item.component";
import {Observable} from "rxjs";
import {District} from "../model/district.model";
import {DistrictsState} from "../ngrx/district.reducers";
import {Store} from "@ngrx/store";
import {LoadNextPageAction} from "../../moyens-transport/ngrx/moyensTransport.actions";
import {DistrictItemComponent} from "./district-item/district-item.component";

@Component({
  selector: 'app-district-list',
  standalone: true,
  imports: [CommonModule, ButtonDirective, CardBodyComponent, CardComponent, ColComponent, MtItemComponent, TableDirective, DistrictItemComponent],
  templateUrl: './district-list.component.html',
  styleUrl: './district-list.component.scss'
})
export class DistrictListComponent implements  OnInit{
  @Input() district: District|null=null;
  @Input() state:DistrictsState|null=null;
  districts$: Observable<District[]>|null=null;
  currentPage$: Observable<number>|null=null;

  constructor(private store:Store<any>) {
  }

  ngOnInit(): void {
    this.districts$ = this.store.select(state => state.districts);
    this.currentPage$ = this.store.select(state => state.currentPage);
  }

  loadNextPage() {
    this.store.dispatch(new LoadNextPageAction());
  }

}
