import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  TableDirective
} from "@coreui/angular";
import {DocsComponentsModule} from "@docs-components/docs-components.module";
import {MtNavbarComponent} from "../mt-navbar/mt-navbar.component";
import {MoyenTransport} from "../model/moyenTransport.model";
import {MoyensTransportState} from "../ngrx/moyensTransport.reducer";
import {MtItemComponent} from "./mt-item/mt-item.component";
import {GetAllMTAction, LoadNextPageAction} from "../ngrx/moyensTransport.actions";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {MoyenTransportService} from "../services/moyenTransport.service";

@Component({
  selector: 'app-mt-list',
  standalone: true,
  imports: [CommonModule, TableDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, DocsComponentsModule, MtNavbarComponent, MtItemComponent, ButtonDirective],
  templateUrl: './mt-list.component.html',
  styleUrl: './mt-list.component.scss'
})
export class MtListComponent implements OnInit{
    @Input() moyenTransport: MoyenTransport|null=null;
    @Input() state:MoyensTransportState|null=null;
    moyensTransport$: Observable<MoyenTransport[]>|null=null;
    currentPage$: Observable<number>|null=null;
    constructor(private store:Store<any>) {

    }

  ngOnInit(): void {
    this.moyensTransport$ = this.store.select(state => state.moyensTransport); // Accès direct à l'état
    this.currentPage$ = this.store.select(state => state.currentPage);
  }

  loadNextPage() {
    this.store.dispatch(new LoadNextPageAction());
  }
}
