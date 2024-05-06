import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalConfirmationComponent} from "../../../modal-confirmation/modal-confirmation.component";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {District} from "../../model/district.model";
import {DeleteDistrictAction} from "../../ngrx/district.actions";
import {EditDistrictComponent} from "../../edit-district/edit-district.component";
import {MtListComponent} from "../../../moyens-transport/mt-list/mt-list.component";
import {MoyensTransportComponent} from "../../../moyens-transport/moyens-transport.component";
import {MoyenTransport} from "../../../moyens-transport/model/moyenTransport.model";
import {DistrictService} from "../../service/district.services";
import {MoyenTransportService} from "../../../moyens-transport/services/moyenTransport.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableDirective} from "@coreui/angular";
import {result} from "lodash-es";
import {SearchMTAction} from "../../../moyens-transport/ngrx/moyensTransport.actions";
import {AuthService} from "../../../authService/auth.service";

@Component({
  selector: 'app-district-item',
  standalone: true,
  imports: [CommonModule, MtListComponent, MoyensTransportComponent, ReactiveFormsModule, TableDirective, FormsModule],
  templateUrl: './district-item.component.html',
  styleUrl: './district-item.component.scss'
})
export class DistrictItemComponent implements OnInit{
  ngOnInit(): void {
    this.loadAllMoyensTransports()
  }
  @Input() district: District|null=null;
  allMoyensTransports: MoyenTransport[]=[]
  showTable:boolean=false;
  iconFullscreen: string = "cil-fullscreen";
  iconExitFullscreen: string = "cil-fullscreen-exit";
  searchQuery: string='';
  constructor(public authService:AuthService,private store:Store, private router:Router,private modalService: NgbModal,private districtService: DistrictService, private moyenTransportService: MoyenTransportService) {
  }

  searchMts(query: string) {
    if (query.trim() !== '') {
      this.showTable=true;
      this.searchMoyenTransports(query)
      //this.store.dispatch(new SearchMTAction(query));
    } else {
      this.showTable=false;
      this.loadAllMoyensTransports()
    }
  }
  onDelete(district:District) {
    const modalRef = this.modalService.open(ModalConfirmationComponent);

    modalRef.componentInstance.confirmationMessage = "Êtes-vous sûr de vouloir supprimer ce district ?";

    modalRef.result.then(
        (result) => {
          if (result === 'confirm') {
            this.store.dispatch(new DeleteDistrictAction(district));
            console.log("district supprimé !");
          } else {
            console.log("Suppression annulée !");
          }
        },
        () => {
          console.log("Modal fermé sans confirmation");
        }
    );
  }

  onEdit(district:District) {
    const modalRef = this.modalService.open(EditDistrictComponent);
    modalRef.componentInstance.districtID = district.id;
  }

  /*onDetails(district: District) {
    const modalRef = this.modalService.open(DistrictDetailsComponent);
    modalRef.componentInstance.districtID = district.id;
  }*/


  searchMoyenTransports(query:string) {
    this.moyenTransportService.searchMts(query).subscribe(moyensTransports => {
      this.allMoyensTransports = moyensTransports.map(mt => ({
        ...mt,
        assignedToDistrict: this.isMoyenTransportAssignedToDistrict(mt, this.district),
        disabled:!this.authService.roles.includes('ADMIN')
      }));
    });
  }
  loadAllMoyensTransports() {
    this.moyenTransportService.getMts(1,2).subscribe(moyensTransports => {
      this.allMoyensTransports = moyensTransports.map(mt => ({
        ...mt,
        assignedToDistrict: this.isMoyenTransportAssignedToDistrict(mt, this.district),
        disabled:!this.authService.roles.includes('ADMIN')
      }));
    });
  }

  isMoyenTransportAssignedToDistrict(moyenTransport: MoyenTransport, district: District | null): boolean {
    // @ts-ignore
    return district.moyensTransport.some(mt => mt.id === moyenTransport.id);
  }

  toggleMoyenTransportAssignment(moyenTransport: MoyenTransport, district: District) {
    if (moyenTransport.assignedToDistrict) {
      // Ajouter le moyen de transport au district
      this.districtService.assignMTToDistrict(moyenTransport.id, district.id).subscribe(() => {
        moyenTransport.assignedToDistrict = true;
        district.moyensTransport.push(moyenTransport);
      });
    } else {
      // Supprimer le moyen de transport du district
      const index = district.moyensTransport.findIndex(mt => mt.id === moyenTransport.id);
      if (index !== -1) {
        this.districtService.removeMTFromDistrict(moyenTransport.id, district.id).subscribe(() => {
          moyenTransport.assignedToDistrict = false;
          district.moyensTransport.splice(index, 1);
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
}
