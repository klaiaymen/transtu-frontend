import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    SearchMoyensTransportComponent
} from "../../moyens-transport/search-moyens-transport/search-moyens-transport.component";
import {FormsModule} from "@angular/forms";
import {NewMoyenTransportComponent} from "../../moyens-transport/new-moyen-transport/new-moyen-transport.component";
import {NewDistrictComponent} from "../new-district/new-district.component";
import {GetAllMTAction} from "../../moyens-transport/ngrx/moyensTransport.actions";
import {GetAllDistrictAction} from "../ngrx/district.actions";
import {Store} from "@ngrx/store";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-district-navbar',
  standalone: true,
  imports: [CommonModule, SearchMoyensTransportComponent, FormsModule],
  templateUrl: './district-navbar.component.html',
  styleUrl: './district-navbar.component.scss'
})
export class DistrictNavbarComponent {
  constructor(private store:Store<any>,private modalService: NgbModal) {
  }

  onSearch(value: any) {

  }

  onNewDistrict() {
    const modalRef = this.modalService.open(NewDistrictComponent);
  }

  onGetAllDistricts() {
    this.store.dispatch(new GetAllDistrictAction({}))
  }
}
