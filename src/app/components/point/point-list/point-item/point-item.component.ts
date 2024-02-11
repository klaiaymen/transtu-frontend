import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfirmationComponent} from "../../../modal-confirmation/modal-confirmation.component";
import {Points} from "../../model/point.model";
import {DeletePointAction} from "../../ngrx/point.actions";
import {EditPointComponent} from "../../edit-point/edit-point.component";

@Component({
  selector: 'app-point-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './point-item.component.html',
  styleUrl: './point-item.component.scss'
})
export class PointItemComponent {
  @Input() point: Points|null=null;

  constructor(private store:Store, private router:Router,private modalService: NgbModal) {
  }
  onDelete(point: any) {
    const modalRef = this.modalService.open(ModalConfirmationComponent);

    modalRef.componentInstance.confirmationMessage = "Êtes-vous sûr de vouloir supprimer ce point ?";

    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.store.dispatch(new DeletePointAction(point));
          console.log("point supprimé !");
        } else {
          console.log("Suppression annulée !");
        }
      },
      () => {
        console.log("Modal fermé sans confirmation");
      }
    );
  }

  onEdit(point: any) {
    const modalRef = this.modalService.open(EditPointComponent);
    modalRef.componentInstance.pointID = point.id;
  }
}
