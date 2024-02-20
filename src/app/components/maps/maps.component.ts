import {Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {APIKey, Marker, Road} from "./model/maps.model";
import {MapsService} from "./service/maps.service";
import {DxMapComponent, DxMapModule, DxSelectBoxModule} from "devextreme-angular";
import {ModalConfirmationComponent} from "../modal-confirmation/modal-confirmation.component";
import {DeleteDistrictAction} from "../district/ngrx/district.actions";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-maps',
  standalone: true,
  providers: [MapsService],
  imports: [CommonModule, DxMapModule, DxSelectBoxModule],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent {
  @ViewChild(DxMapComponent, { static: false }) map: DxMapComponent | undefined;
  routes: Road[];

  markers: Marker[];

  apiKey: APIKey = {};

  constructor(service: MapsService,private modalService: NgbModal) {
    this.apiKey.bing = 'AjeWzxR3mKrEIK0TXRP_6EpnkfOWxM0h4ezJzrHdJpBkzXy0Q6oZ0PmzpwGbf8L8';

    this.markers = service.getMarkers();
    this.routes = service.getRoutes();
  }

  addMarker(e: any) {
    const newMarker = {
      location: e.location,
    };
    this.markers.push(newMarker);

    //popup reclamation
    const modalRef = this.modalService.open(ModalConfirmationComponent);
    const latitude = e.location.lat;
    const longitude = e.location.lng;
    modalRef.componentInstance.confirmationMessage = `Reclamation contenu... avec coordonnées : Latitude ${latitude}, Longitude ${longitude}`;

    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          console.log("Reclamation envoyée !");
        } else {
          console.log("Reclamation annulée !");
        }
      },
      () => {
        console.log("Modal fermé sans confirmation");
      }
    );

    // Afficher les coordonnées dans la console
    console.log('Coordonnées du marqueur :', latitude, longitude);
  }




  setMode(e:any) {
    this.routes = this.routes.map((item) => {
      item.mode = e.value;
      return item;
    });
  }

  selectColor(e:any) {
    this.routes = this.routes.map((item) => {
      item.color = e.value;
      return item;
    });
  }

}
