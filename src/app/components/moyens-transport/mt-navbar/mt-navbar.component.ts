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
import {EditMoyenTransportComponent} from "../edit-moyen-transport/edit-moyen-transport.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NewMoyenTransportComponent} from "../new-moyen-transport/new-moyen-transport.component";

@Component({
  selector: 'app-mt-navbar',
  standalone: true,
  imports: [CommonModule, ContainerComponent, NavbarComponent, NavbarTogglerDirective, CollapseDirective, NavbarNavComponent, NavItemComponent, DropdownComponent, RouterLink],
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
}
