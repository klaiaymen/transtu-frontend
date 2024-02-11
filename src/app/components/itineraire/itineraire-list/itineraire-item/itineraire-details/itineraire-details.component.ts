import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AccordionButtonDirective,
    AccordionComponent,
    AccordionItemComponent,
    CardBodyComponent,
    CardComponent, ColComponent, TableDirective, TemplateIdDirective
} from "@coreui/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ligne} from "../../../../ligne/model/ligne.model";
import {MoyenTransport} from "../../../../moyens-transport/model/moyenTransport.model";
import {Station} from "../../../../station/model/station.model";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {StationService} from "../../../../station/service/station.service";
import {LigneService} from "../../../../ligne/service/ligne.service";
import {MoyenTransportService} from "../../../../moyens-transport/services/moyenTransport.service";
import {Itineraire} from "../../../model/itineraire.model";
import {ItineraireService} from "../../../service/itineraire.services";
import {PointService} from "../../../../point/service/point.services";
import {Points} from "../../../../point/model/point.model";

@Component({
  selector: 'app-itineraire-details',
  standalone: true,
  imports: [CommonModule, AccordionButtonDirective, AccordionComponent, AccordionItemComponent, CardBodyComponent, CardComponent, ColComponent, ReactiveFormsModule, TableDirective, TemplateIdDirective, FormsModule],
  templateUrl: './itineraire-details.component.html',
  styleUrl: './itineraire-details.component.scss'
})
export class ItineraireDetailsComponent implements OnInit{
  @Input() itineraireID: number;
  itineraire: Itineraire|null=null;
  ligne: Ligne|null=null;
  allLignes: Ligne[]=[];
  allPoints: Points[]=[];
  points: Points[]=[];

  constructor(public activeModal: NgbActiveModal,private activatedRoute: ActivatedRoute,private sanitizer: DomSanitizer,
              private pointService: PointService,private modalService: NgbModal, private itineraireService: ItineraireService, private ligneService: LigneService) {
    this.itineraireID=activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadItineraireDetails();
    this.loadAllMoyensTransports();
    this.loadAllPoints()
  }

  loadItineraireDetails(): void {
    this.itineraireService.getItineraireById(this.itineraireID).subscribe((itineraire: Itineraire) => {
      this.itineraire = itineraire;
      this.ligne = itineraire.ligne;
      this.points=itineraire.points;
    });
  }

  //ligne panel
  loadAllMoyensTransports() {
    this.ligneService.getLignes().subscribe(lignes => {
      this.allLignes = lignes.map(l => ({
        ...l,
        assignedToItineraire: this.isLigneAssignedToItineraire(l, this.itineraire),
        disabled: (this.itineraire && this.itineraire.ligne && this.itineraire.ligne.id !== l.id) || false
      }));
    });
  }

  isLigneAssignedToItineraire(ligne: Ligne, itineraire: Itineraire | null): boolean {
    return itineraire?.ligne?.id === ligne.id;
  }

  toggleLigneAssignment(ligne: Ligne, itineraire: Itineraire) {
    this.allLignes.forEach(l => {
      if (l.id !== ligne.id) {
        l.disabled = true;
      }
    });

    if (ligne.assignedToItineraire) {
      this.itineraireService.assignLigneToItineraire(ligne.id, itineraire.id).subscribe(() => {
        ligne.assignedToItineraire = true;
        itineraire.ligne = ligne;
      });
    } else {
      // Activer tous les autres lignes
      this.allLignes.forEach(l => {
        l.disabled = false;
      });
      const index = itineraire.ligne ? 0 : -1;
      if (index !== -1) {
        // @ts-ignore
        this.itineraireService.removeLigneFromItineraire(itineraire.ligne.id, itineraire.id).subscribe(() => {
          itineraire.ligne = null;
        });
      }
    }
  }

  //points panel
  loadAllPoints() {
    this.pointService.getPoints().subscribe(points => {
      this.allPoints = points.map(p => ({
        ...p,
        assignedToItineraire: this.isPointAssignedToItineraire(p, this.itineraire)
      }));
    });
  }

  isPointAssignedToItineraire(point: Points, itineraire: Itineraire | null): boolean {
    // @ts-ignore
    return itineraire.points.some(p => p.id === point.id);
  }

  togglePointsAssignment(point: Points, itineraire: Itineraire) {
    if (point.assignedToItineraire) {
      // Ajouter le point a l itineraire
      this.itineraireService.assignPointToItineraire(point.id, itineraire.id).subscribe(() => {
        point.assignedToItineraire = true;
        itineraire.points.push(point);
      });
    } else {
      // Supprimer le point du itineraire
      const index = itineraire.points.findIndex(p => p.id === point.id);
      if (index !== -1) {
        this.itineraireService.removePointFromItineraire(point.id, itineraire.id).subscribe(() => {
          point.assignedToItineraire = false;
          itineraire.points.splice(index, 1);
        });
      }
    }
  }

}
