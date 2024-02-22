import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {APIKey, Marker, Road} from "./model/maps.model";
import {MapsService} from "./service/maps.service";
import {DxMapComponent, DxMapModule, DxSelectBoxModule} from "devextreme-angular";
import {ModalConfirmationComponent} from "../modal-confirmation/modal-confirmation.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StationService} from "../station/service/station.service";
import {ItineraireService} from "../itineraire/service/itineraire.services";
import {Itineraire} from "../itineraire/model/itineraire.model";
import {DistrictService} from "../district/service/district.services";
import {FormsModule} from "@angular/forms";
import {District} from "../district/model/district.model";
@Component({
  selector: 'app-maps',
  standalone: true,
  providers: [MapsService],
  imports: [CommonModule, DxMapModule, DxSelectBoxModule, FormsModule],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent implements OnInit{
  @ViewChild(DxMapComponent, { static: false }) map: DxMapComponent | undefined;
  routes: Road[]=[];

  markers: Marker[]=[];

  apiKey: APIKey = {};
  districtList: District[] = [];
  districtId: number | undefined;
  constructor(private districtService: DistrictService,service: MapsService,private modalService: NgbModal,private stationService:StationService,private itineraireService:ItineraireService) {
    this.apiKey.bing = 'AjeWzxR3mKrEIK0TXRP_6EpnkfOWxM0h4ezJzrHdJpBkzXy0Q6oZ0PmzpwGbf8L8';

    //this.markers = service.getMarkers();
    //this.routes = service.getRoutes();
  }

  ngOnInit(): void {
    this.getDistricts();
    this.loadStations()
    this.loadItineraires()
  }
  getDistricts(): void {
    this.districtService.getDistricts()
      .subscribe(districts => this.districtList = districts);
  }

  loadStations(): void {
    this.stationService.getStations().subscribe(stations => {
      stations.forEach(station => {
        const marker: Marker  = {
          location: [station.latitude, station.longitude],
          tooltip: {
            text: station.label
          },
          iconCssClass: 'cil-bus-alt',

        };
        this.markers.push(marker);
      });
    });
  }
  loadItineraires(): void {
    if (this.districtId) {
      this.itineraireService.getItinerairesByDistrict(this.districtId).subscribe(itineraires => {
        this.routes = [];
        itineraires.forEach(itineraire => {
          const route: Road = {
            id:itineraire.id,
            name:itineraire.name,
            ligne:itineraire.ligne,
            weight: itineraire.weight,
            color: 'blue',
            opacity: itineraire.opacity,
            mode: itineraire.mode,
            locations: itineraire.points.map(point => {
              return [point.latitude, point.longitude];
            })
          };
          console.log('Ligne de l\'itinéraire:', route.ligne?.code,' Mt associé',route.ligne?.moyenTransport);
          this.routes.push(route);
        });
      });
    } else {
      this.itineraireService.getItineraires().subscribe(itineraires => {
        this.routes = [];
        itineraires.forEach(itineraire => {
          const route: Road = {
            id:itineraire.id,
            name:itineraire.name,
            ligne:itineraire.ligne,
            weight: itineraire.weight,
            color: 'yellow',
            opacity: itineraire.opacity,
            mode: itineraire.mode,
            locations: itineraire.points.map(point => {
              return [point.latitude, point.longitude];
            })
          };
          console.log('Ligne de l\'itinéraire:', route.ligne?.code,' Mt associé',route.ligne?.moyenTransport);
          this.routes.push(route);
        });
      });
    }
  }

  /*loadItineraire(districtId: number|undefined): void {
    const colors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple'];
    this.itineraireService.getItinerairesByDistrict(districtId).subscribe(itineraires => {
      itineraires.forEach(itineraire => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const randomColor = colors[randomIndex];
        const route: Road = {
          id:itineraire.id,
          name:itineraire.name,
          ligne:itineraire.ligne,
          weight: itineraire.weight,
          color: randomColor,
          opacity: itineraire.opacity,
          mode: itineraire.mode,
          locations: itineraire.points.map(point => {
            return [point.latitude, point.longitude];
          })
        };
        console.log('Ligne de l\'itinéraire:', route.ligne?.code,' Mt associé',route.ligne?.moyenTransport);
        this.routes.push(route);
      });
    });
  }*/

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
