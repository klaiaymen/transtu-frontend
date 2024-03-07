import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Itineraire} from "../../model/itineraire.model";
import {ModalConfirmationComponent} from "../../../modal-confirmation/modal-confirmation.component";
import {DeleteItineraireAction} from "../../ngrx/itineraire.actions";
import {ItineraireDetailsComponent} from "./itineraire-details/itineraire-details.component";
import {EditItineraireComponent} from "../../edit-itineraire/edit-itineraire.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableDirective} from "@coreui/angular";
import {Ligne} from "../../../ligne/model/ligne.model";
import {Points} from "../../../point/model/point.model";
import {result} from "lodash-es";
import {ItineraireService} from "../../service/itineraire.services";
import {PointService} from "../../../point/service/point.services";
import {LigneService} from "../../../ligne/service/ligne.service";
import {NewReclamationComponent} from "../../../reclamation/new-reclamation/new-reclamation.component";
import {MapsComponent} from "../../../maps/maps.component";
import {ItineraireMapsComponent} from "./itineraire-maps/itineraire-maps.component";

@Component({
  selector: 'app-itineraire-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableDirective, FormsModule],
  templateUrl: './itineraire-item.component.html',
  styleUrl: './itineraire-item.component.scss'
})
export class ItineraireItemComponent implements OnInit{
  ngOnInit(): void {
    this.loadAllPoints()
    this.loadAllLignes()
  }
  @Input() itineraire: Itineraire|null=null;
  ligne: Ligne|null=null;
  allLignes: Ligne[]=[];
  allPoints: Points[]=[];
  points: Points[]=[];
  showTable: boolean=false;
  iconFullscreen: string = "cil-fullscreen";
  iconExitFullscreen: string = "cil-fullscreen-exit";
  showTableLignes: boolean=false;
  constructor(private store:Store, private router:Router,private modalService: NgbModal,private itineraireService: ItineraireService,
              private pointService:PointService,private ligneService:LigneService) {
  }

  onDelete(itineraire: Itineraire) {
    const modalRef = this.modalService.open(ModalConfirmationComponent);

    modalRef.componentInstance.confirmationMessage = "Êtes-vous sûr de vouloir supprimer cet itineraire ?";

    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.store.dispatch(new DeleteItineraireAction(itineraire));
          console.log("itineraire supprimé !");
        } else {
          console.log("Suppression annulée !");
        }
      },
      () => {
        console.log("Modal fermé sans confirmation");
      }
    );
  }

  onDetails(itineraire: Itineraire) {
    const modalRef = this.modalService.open(ItineraireDetailsComponent);
    modalRef.componentInstance.itineraireID = itineraire.id;
  }

  onEdit(itineraire: Itineraire) {
    const modalRef = this.modalService.open(EditItineraireComponent);
    modalRef.componentInstance.itineraireID = itineraire.id;
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
  toggleTablePoints() {
    this.showTable = !this.showTable;
    if (this.showTable) {
      this.iconFullscreen = "cil-exit-fullscreen";
    } else {
      this.iconFullscreen = "cil-fullscreen";
    }
  }


  //ligne panel
  loadAllLignes() {
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
  toggleTableLignes() {
    this.showTableLignes = !this.showTableLignes;
    if (this.showTable) {
      this.iconFullscreen = "cil-exit-fullscreen";
    } else {
      this.iconFullscreen = "cil-fullscreen";
    }
  }

  ShowMap(itineraire: Itineraire) {
    const modalRef = this.modalService.open(ItineraireMapsComponent, { size: 'xl' });
    modalRef.componentInstance.itineraireID = itineraire.id;
    //console.log(itineraire.id)
  }
}
