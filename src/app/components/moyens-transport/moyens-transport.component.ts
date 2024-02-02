import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocsComponentsModule} from "@docs-components/docs-components.module";
import {TableDirective} from "@coreui/angular";
import {MtNavbarComponent} from "./mt-navbar/mt-navbar.component";
import {MtListComponent} from "./mt-list/mt-list.component";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {MoyensTransportState, MoyensTransportStateEnum} from "../../ngrx/moyensTransport.reducer";
import {map} from "rxjs/operators";
import {state} from "@angular/animations";

@Component({
  selector: 'app-moyens-transport',
  standalone: true,
  imports: [CommonModule, DocsComponentsModule, TableDirective, MtNavbarComponent,MtListComponent],
  templateUrl: './moyens-transport.component.html',
  styleUrl: './moyens-transport.component.scss'
})
export class MoyensTransportComponent implements  OnInit{
  moyensTransportState$:Observable<MoyensTransportState>|null=null;
  readonly MoyensTransportStateEnum= MoyensTransportStateEnum;
  constructor(private store:Store<any> ) {
  }
  ngOnInit(): void {
    this.moyensTransportState$=this.store.pipe(
        map((state)=>  state.catalogState)
    );
  }

}
