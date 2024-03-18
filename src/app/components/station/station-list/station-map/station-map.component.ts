import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DxMapComponent, DxMapModule, DxSelectBoxModule} from "devextreme-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {APIKey, Marker, Road} from "../../../maps/model/maps.model";
import {District} from "../../../district/model/district.model";
import {DistrictService} from "../../../district/service/district.services";
import {MapsService} from "../../../maps/service/maps.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StationService} from "../../service/station.service";
import {ItineraireService} from "../../../itineraire/service/itineraire.services";
import {NewStationComponent} from "../../new-station/new-station.component";
import {StationMaps} from "./model/station-map.model";
import {ModalComponent} from "@coreui/angular";
import {EditStationComponent} from "../../edit-station/edit-station.component";
import {Station} from "../../model/station.model";

@Component({
  selector: 'app-station-map',
  standalone: true,
  imports: [CommonModule, DxMapModule, DxSelectBoxModule, ReactiveFormsModule, FormsModule],
  templateUrl: './station-map.component.html',
  styleUrl: './station-map.component.scss'
})
export class StationMapComponent implements OnInit{
  @ViewChild(DxMapComponent, { static: false }) map: DxMapComponent | undefined;

  stations: StationMaps[]=[];

  apiKey: APIKey = {};
  districtList: District[] = [];
  districtId: number | undefined;
  searchQuery: string = '';

  constructor(private districtService: DistrictService,service: MapsService,private modalService: NgbModal,private stationService:StationService,private itineraireService:ItineraireService) {
    this.apiKey.bing = 'AjeWzxR3mKrEIK0TXRP_6EpnkfOWxM0h4ezJzrHdJpBkzXy0Q6oZ0PmzpwGbf8L8';
  }

  ngOnInit(): void {
    this.getDistricts();
    this.loadStations()
  }
  getDistricts(): void {
    this.districtService.getDistricts()
      .subscribe(districts => this.districtList = districts);
  }


  loadStations(): void {
    if (this.districtId) {
      this.stationService.getStationsByDistrict(this.districtId).subscribe(stations => {
        this.stations = [];
        stations.forEach(station => {
          const marker: StationMaps = {
            id:station.id,
            location: [station.latitude, station.longitude],
            tooltip: {
              text: station.label
            },
          };
          //console.log('Ligne de l\'itinéraire:', route.ligne);
          this.stations.push(marker);
        });
      });
    } else {
      this.stationService.getStations().subscribe(stations => {
        this.stations = [];
        stations.forEach(station => {
          const marker: StationMaps = {
            id:station.id,
            location: [station.latitude, station.longitude],
            tooltip: {
              text: station.label
            },
            onClick: () => this.openModal(station),
          };
          //console.log('Ligne de l\'itinéraire ',route.id,' :', route.ligne);
          this.stations.push(marker);
        });
      });
    }
  }

  openModal(station: Station): void {
    const modalRef = this.modalService.open(EditStationComponent);
    modalRef.componentInstance.stationID = station.id;

  }



  addMarker(e: any) {
    const newMarker = {
      location: e.location,
    };
    this.stations.push(newMarker);

    const modalRef = this.modalService.open(NewStationComponent);

    // Passez la latitude et la longitude au composant NewStationComponent
    const latitude = e.location.lat;
    const longitude = e.location.lng;
    modalRef.componentInstance.latitude = latitude;
    modalRef.componentInstance.longitude = longitude;

    // Afficher les coordonnées dans la console
    console.log('Coordonnées du marqueur :', latitude, longitude);
  }


  searchStations(query: string): void {
    if (query.trim() !== '') {
      this.stationService.searchStations(query).subscribe(stations => {
        //this.routes = itineraires;
        this.stations = [];
        stations.forEach(station => {
          const marker: StationMaps = {
            id:station.id,
            location: [station.latitude,station.longitude],
            tooltip: {
              text: station.label
            },
          };
          //console.log('Ligne de l\'itinéraire:', route.ligne);
          this.stations.push(marker);
        });
      });
    } else {
      this.loadStations();
    }
  }



}
