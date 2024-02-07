import {Component, Input} from '@angular/core';
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
import {DistrictDetailsComponent} from "./district-details/district-details.component";

@Component({
  selector: 'app-district-item',
  standalone: true,
  imports: [CommonModule, MtListComponent, MoyensTransportComponent],
  templateUrl: './district-item.component.html',
  styleUrl: './district-item.component.scss'
})
export class DistrictItemComponent {
  @Input() district: District|null=null;
  constructor(private store:Store, private router:Router,private modalService: NgbModal) {
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

  onDetails(district: District) {
    const modalRef = this.modalService.open(DistrictDetailsComponent);
    modalRef.componentInstance.districtID = district.id;
  }
}
