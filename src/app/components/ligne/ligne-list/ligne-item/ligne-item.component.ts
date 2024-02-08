import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfirmationComponent} from "../../../modal-confirmation/modal-confirmation.component";
import {Ligne} from "../../model/ligne.model";
import {DeleteLigneAction} from "../../ngrx/ligne.actions";
import {EditLigneComponent} from "../../edit-ligne/edit-ligne.component";
import {LigneDetailsComponent} from "./ligne-details/ligne-details.component";

@Component({
  selector: 'app-ligne-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ligne-item.component.html',
  styleUrl: './ligne-item.component.scss'
})
export class LigneItemComponent {
  @Input() ligne: Ligne|null=null;

  constructor(private store:Store, private router:Router,private modalService: NgbModal) {
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
}
