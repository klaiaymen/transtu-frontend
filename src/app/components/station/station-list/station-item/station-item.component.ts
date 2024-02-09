import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfirmationComponent} from "../../../modal-confirmation/modal-confirmation.component";
import {Station} from "../../model/station.model";
import {DeleteStationAction} from "../../ngrx/station.actions";
import {EditStationComponent} from "../../edit-station/edit-station.component";

@Component({
  selector: 'app-station-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './station-item.component.html',
  styleUrl: './station-item.component.scss'
})
export class StationItemComponent {
  @Input() station: Station|null=null;

  constructor(private store:Store, private router:Router,private modalService: NgbModal) {
  }
  onDelete(station: any) {
    const modalRef = this.modalService.open(ModalConfirmationComponent);

    modalRef.componentInstance.confirmationMessage = "Êtes-vous sûr de vouloir supprimer cette station ?";

    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.store.dispatch(new DeleteStationAction(station));
          console.log("station supprimé !");
        } else {
          console.log("Suppression annulée !");
        }
      },
      () => {
        console.log("Modal fermé sans confirmation");
      }
    );
  }

  onEdit(station: any) {
    const modalRef = this.modalService.open(EditStationComponent);
    modalRef.componentInstance.stationID = station.id;
  }
}
