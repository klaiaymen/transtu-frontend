import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfirmationComponent} from "../../../modal-confirmation/modal-confirmation.component";
import {Ligne} from "../../model/ligne.model";
import {DeleteLigneAction} from "../../ngrx/ligne.actions";
import {EditLigneComponent} from "../../edit-ligne/edit-ligne.component";
import {LigneDetailsComponent} from "./ligne-details/ligne-details.component";
import {MoyenTransport} from "../../../moyens-transport/model/moyenTransport.model";
import {Station} from "../../../station/model/station.model";
import {MoyenTransportService} from "../../../moyens-transport/services/moyenTransport.service";
import {LigneService} from "../../service/ligne.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableDirective} from "@coreui/angular";
import {result} from "lodash-es";
import {StationService} from "../../../station/service/station.service";

@Component({
  selector: 'app-ligne-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableDirective, FormsModule],
  templateUrl: './ligne-item.component.html',
  styleUrl: './ligne-item.component.scss'
})
export class LigneItemComponent implements OnInit{
  ngOnInit(): void {
    this.loadAllMoyensTransports()
    this.loadAllStations()
  }
  @Input() ligne: Ligne|null=null;
  moyenTransport: MoyenTransport|null=null;
  allMoyensTransports: MoyenTransport[]=[];
  allStations: Station[]=[];
  stations: Station[]=[];
  showTable:boolean=false;
  showTableStations: boolean=false;
  iconFullscreen: string = "cil-fullscreen";
  iconExitFullscreen: string = "cil-fullscreen-exit";
  iconFullscreenStations: string = "cil-fullscreen";
  iconExitFullscreenStations: string = "cil-fullscreen-exit";
  constructor(private store:Store, private router:Router,private modalService: NgbModal, private moyenTransportService:MoyenTransportService,
              private ligneService:LigneService,private stationService:StationService) {
  }

  onDelete(ligne:Ligne) {
    const modalRef = this.modalService.open(ModalConfirmationComponent);

    modalRef.componentInstance.confirmationMessage = "Êtes-vous sûr de vouloir supprimer cette ligne ?";

    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.store.dispatch(new DeleteLigneAction(ligne));
          console.log("ligne supprimé !");
        } else {
          console.log("Suppression annulée !");
        }
      },
      () => {
        console.log("Modal fermé sans confirmation");
      }
    );
  }

  onEdit(ligne:Ligne) {
    const modalRef = this.modalService.open(EditLigneComponent);
    modalRef.componentInstance.ligneID = ligne.id;
  }

  onDetails(ligne: Ligne) {
    const modalRef = this.modalService.open(LigneDetailsComponent);
    modalRef.componentInstance.ligneID = ligne.id;
  }

  //moyen transport panel
  loadAllMoyensTransports() {
    this.moyenTransportService.getMoyensTransport().subscribe(moyensTransports => {
      this.allMoyensTransports = moyensTransports.map(mt => ({
        ...mt,
        assignedToLigne: this.isMoyenTransportAssignedToLigne(mt, this.ligne),
        disabled: (this.ligne && this.ligne.moyenTransport && this.ligne.moyenTransport.id !== mt.id) || false
      }));
    });
  }

  isMoyenTransportAssignedToLigne(moyenTransport: MoyenTransport, ligne: Ligne | null): boolean {
    return ligne?.moyenTransport?.id === moyenTransport.id;
  }

  toggleMoyenTransportAssignments(moyenTransport: MoyenTransport, ligne: Ligne) {
    this.allMoyensTransports.forEach(mt => {
      if (mt.id !== moyenTransport.id) {
        mt.disabled = true;
      }
    });

    if (moyenTransport.assignedToLigne) {
      this.ligneService.assignMTToLigne(moyenTransport.id, ligne.id).subscribe(() => {
        moyenTransport.assignedToLigne = true;
        ligne.moyenTransport = moyenTransport;
      });
    } else {
      // Activer tous les autres moyens de transport
      this.allMoyensTransports.forEach(mt => {
        mt.disabled = false;
      });
      const index = ligne.moyenTransport ? 0 : -1;
      if (index !== -1) {
        // @ts-ignore
        this.ligneService.removeMTFromLigne(ligne.moyenTransport.id, ligne.id).subscribe(() => {
          ligne.moyenTransport = null;
        });
      }
    }
  }
  toggleTableMts(): void {
    this.showTable = !this.showTable;
    if (this.showTable) {
      this.iconFullscreen = "cil-exit-fullscreen";
    } else {
      this.iconFullscreen = "cil-fullscreen";
    }
  }

  //stations panel
  loadAllStations() {
    this.stationService.getStations().subscribe(stations => {
      this.allStations = stations.map(s => ({
        ...s,
        assignedToLigne: this.isStationAssignedToLigne(s, this.ligne)
      }));
    });
  }

  isStationAssignedToLigne(station: Station, ligne: Ligne | null): boolean {
    // @ts-ignore
    return ligne.stations.some(s => s.id === station.id);
  }

  toggleStationsAssignment(station: Station, ligne: Ligne) {
    if (station.assignedToLigne) {
      // Ajouter l station a la ligne
      this.ligneService.assignStationToLigne(station.id, ligne.id).subscribe(() => {
        station.assignedToLigne = true;
        ligne.stations.push(station);
      });
    } else {
      // Supprimer la station du ligne
      const index = ligne.stations.findIndex(s => s.id === station.id);
      if (index !== -1) {
        this.ligneService.removeStationFromLIgne(station.id, ligne.id).subscribe(() => {
          station.assignedToLigne = false;
          ligne.stations.splice(index, 1);
        });
      }
    }
  }
  toggleTableStations(): void {
    this.showTableStations = !this.showTableStations;
    if (this.showTableStations) {
      this.iconFullscreenStations = "cil-exit-fullscreen";
    } else {
      this.iconFullscreenStations = "cil-fullscreen";
    }
  }

}
