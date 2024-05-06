import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    SearchMoyensTransportComponent
} from "../../moyens-transport/search-moyens-transport/search-moyens-transport.component";
import {FormsModule} from "@angular/forms";
import {NewDistrictComponent} from "../new-district/new-district.component";
import {GetAllDistrictAction, SearchDistrictAction} from "../ngrx/district.actions";
import {Store} from "@ngrx/store";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SearchMTAction} from "../../moyens-transport/ngrx/moyensTransport.actions";
import {AuthService} from "../../authService/auth.service";

@Component({
  selector: 'app-district-navbar',
  standalone: true,
  imports: [CommonModule, SearchMoyensTransportComponent, FormsModule],
  templateUrl: './district-navbar.component.html',
  styleUrl: './district-navbar.component.scss'
})
export class DistrictNavbarComponent {
  searchQuery: string='';
  constructor(private store:Store<any>,private modalService: NgbModal,public authService:AuthService) {
  }


  onNewDistrict() {
    const modalRef = this.modalService.open(NewDistrictComponent);
  }

  onGetAllDistricts() {
    this.store.dispatch(new GetAllDistrictAction({}))
  }

  searchDistricts(query: string) {
    if (query.trim() !== '') {
      this.store.dispatch(new SearchDistrictAction(query));
    } else {
      this.onGetAllDistricts()
    }
  }
}
