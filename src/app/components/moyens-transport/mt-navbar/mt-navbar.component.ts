import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CollapseDirective,
  ContainerComponent, DropdownComponent,
  NavbarComponent,
  NavbarNavComponent,
  NavbarTogglerDirective, NavItemComponent
} from "@coreui/angular";
import {Store} from "@ngrx/store";
import {GetAllMTAction} from "../../../ngrx/moyensTransport.actions";
import {RouterLink} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NewMoyenTransportComponent} from "../new-moyen-transport/new-moyen-transport.component";
import {SearchMoyensTransportComponent} from "../search-moyens-transport/search-moyens-transport.component";
import {FormsModule} from "@angular/forms";
import {MoyenTransportService} from "../../../services/moyenTransport.service";
import {MoyenTransport} from "../../../model/moyenTransport.model";


@Component({
  selector: 'app-mt-navbar',
  standalone: true,
  imports: [CommonModule, ContainerComponent, NavbarComponent, NavbarTogglerDirective, CollapseDirective, NavbarNavComponent, NavItemComponent, DropdownComponent, RouterLink, SearchMoyensTransportComponent, FormsModule],
  templateUrl: './mt-navbar.component.html',
  styleUrl: './mt-navbar.component.scss'
})
export class MtNavbarComponent implements OnInit{
  constructor(private store:Store<any>,private modalService: NgbModal) {
  }
  ngOnInit(): void {
  }

  onGetAllMTs() {
    this.store.dispatch(new GetAllMTAction({}))
  }

  onNewMT() {
    const modalRef = this.modalService.open(NewMoyenTransportComponent);
  }

  /*onSearch(dataForm: any) {
    console.log('Search:', dataForm.keyword);
    this.store.dispatch(new SearchMTAction(dataForm.keyword));
  }*/
}
