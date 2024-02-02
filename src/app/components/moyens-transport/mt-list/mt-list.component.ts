import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, TableDirective} from "@coreui/angular";
import {DocsComponentsModule} from "@docs-components/docs-components.module";
import {MtNavbarComponent} from "../mt-navbar/mt-navbar.component";
import {MoyenTransport} from "../../../model/moyenTransport.model";
import {MoyensTransportState} from "../../../ngrx/moyensTransport.reducer";
import {MtItemComponent} from "./mt-item/mt-item.component";

@Component({
  selector: 'app-mt-list',
  standalone: true,
  imports: [CommonModule, TableDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, DocsComponentsModule, MtNavbarComponent, MtItemComponent],
  templateUrl: './mt-list.component.html',
  styleUrl: './mt-list.component.scss'
})
export class MtListComponent implements OnInit{
    @Input() moyenTransport: MoyenTransport|null=null;
    @Input() state:MoyensTransportState|null=null;

  ngOnInit(): void {
  }

}
