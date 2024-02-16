import {Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {APIKey, Marker, Road} from "./model/maps.model";
import {MapsService} from "./service/maps.service";
import {DxMapComponent, DxMapModule, DxSelectBoxModule} from "devextreme-angular";

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

  constructor(service: MapsService) {
    this.apiKey.bing = 'Aq3LKP2BOmzWY47TZoT1YdieypN_rB6RY9FqBfx-MDCKjvvWBbT68R51xwbL-AqC';

    this.markers = service.getMarkers();
    this.routes = service.getRoutes();
  }

  addMarker(e:any) {
    const newMarker = {
      location: e.location,
    };
    this.markers.push(newMarker);

    // Afficher les coordonnées dans la console
    console.log('Coordonnées du marqueur :', e.location);
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
