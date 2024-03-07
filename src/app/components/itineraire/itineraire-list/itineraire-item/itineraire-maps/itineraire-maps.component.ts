import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DxMapComponent, DxMapModule} from "devextreme-angular";
import {APIKey, Marker, Road} from "../../../../maps/model/maps.model";
import {District} from "../../../../district/model/district.model";
import {DistrictService} from "../../../../district/service/district.services";
import {MapsService} from "../../../../maps/service/maps.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StationService} from "../../../../station/service/station.service";
import {ItineraireService} from "../../../service/itineraire.services";
import {NewReclamationComponent} from "../../../../reclamation/new-reclamation/new-reclamation.component";
import {ItineraireMaps, PointMaps} from "./model/itineraire-maps.model";
import {Points} from "../../../../point/model/point.model";
import {PointService} from "../../../../point/service/point.services";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-itineraire-maps',
  standalone: true,
    imports: [CommonModule, DxMapModule],
  templateUrl: './itineraire-maps.component.html',
  styleUrl: './itineraire-maps.component.scss'
})
export class ItineraireMapsComponent implements OnInit{
  @ViewChild(DxMapComponent, { static: false }) map: DxMapComponent | undefined;
  routes: ItineraireMaps[]=[];

  markers: PointMaps[]=[];

  apiKey: APIKey = {};
  itineraireID:number;
  /*districtList: District[] = [];
  districtId: number | undefined;
  searchQuery: string = '';*/
  constructor(private activatedRoute: ActivatedRoute,private pointService:PointService,private districtService: DistrictService,service: MapsService,private modalService: NgbModal,private stationService:StationService,private itineraireService:ItineraireService) {
    this.apiKey.bing = 'AjeWzxR3mKrEIK0TXRP_6EpnkfOWxM0h4ezJzrHdJpBkzXy0Q6oZ0PmzpwGbf8L8';
    this.itineraireID=activatedRoute.snapshot.params['id'];
    //this.markers = service.getMarkers();
    //this.routes = service.getRoutes();
  }

  ngOnInit(): void {
    //this.getDistricts();
    this.loadStations()
    this.loadItineraire()
  }
  /*getDistricts(): void {
    this.districtService.getDistricts()
      .subscribe(districts => this.districtList = districts);
  }*/

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

  loadItineraire(): void {
      this.itineraireService.getItineraireById(this.itineraireID).subscribe(itineraire => {
        this.routes = [];
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
          console.log('Ligne de l\'itinéraire ',route.id,' :', route.ligne);
          this.routes.push(route);

      });
    }


  addPointToItineraire(e: any) {
    const latitude = e.location.lat;
    const longitude = e.location.lng;

    const newPoint: Points = { latitude, longitude }; // Créer un objet avec les propriétés latitude et longitude
    //this.markers.push(newPoint);
    this.pointService.save(newPoint).subscribe(
      (createdPoint: Points) => {
        const pointId = createdPoint.id;
        const itineraireID = this.itineraireID;

        console.log('itineraireId :', this.itineraireID);
        console.log("point cree", createdPoint);

        this.itineraireService.assignPointToItineraire(pointId, itineraireID).subscribe(
          (response) => {
            console.log('Point assigné à l\'itinéraire avec succès !', response);
          },
          (error) => {
            console.error('Erreur lors de l\'assignation du point à l\'itinéraire :', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la création du point :', error);
      }
    );
  }







  /*searchItineraires(query: string): void {
    if (query.trim() !== '') {
      this.itineraireService.searchItineraires(query).subscribe(itineraires => {
        //this.routes = itineraires;
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
          console.log('Ligne de l\'itinéraire:', route.ligne);
          this.routes.push(route);
        });
      });
    } else {
      this.loadItineraires();
    }
  }*/

}
