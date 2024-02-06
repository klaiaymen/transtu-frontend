import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MoyenTransport} from "../../../../model/moyenTransport.model";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteMTtAction, EditMTAction, GetAllMTAction} from "../../../../ngrx/moyensTransport.actions";
import {
  ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent, ModalTitleDirective,
  ModalToggleDirective
} from "@coreui/angular";
import {EditMoyenTransportComponent} from "../../edit-moyen-transport/edit-moyen-transport.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfirmationComponent} from "../../../modal-confirmation/modal-confirmation.component";


@Component({
  selector: 'app-mt-item',
  standalone: true,
    imports: [CommonModule, ModalToggleDirective, ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ButtonCloseDirective, ButtonDirective, ModalTitleDirective, FormControlDirective, FormDirective, FormLabelDirective, FormsModule, ReactiveFormsModule, EditMoyenTransportComponent],
  templateUrl: './mt-item.component.html',
  styleUrl: './mt-item.component.scss'
})
export class MtItemComponent implements  OnInit{
  @Input() moyenTransport: MoyenTransport|null=null;
  constructor(private store:Store, private router:Router,private modalService: NgbModal) {

    }
  ngOnInit(): void {
  }


    onDelete(moyenTransport:MoyenTransport) {
      const modalRef = this.modalService.open(ModalConfirmationComponent);

      modalRef.componentInstance.confirmationMessage = "Êtes-vous sûr de vouloir supprimer ce moyen de transport ?";

      modalRef.result.then(
        (result) => {
          if (result === 'confirm') {
            this.store.dispatch(new DeleteMTtAction(moyenTransport));
            console.log("Moyen de transport supprimé !");
          } else {
            console.log("Suppression annulée !");
          }
        },
        () => {
          console.log("Modal fermé sans confirmation");
        }
      );
    }

    onEdit(moyenTransport:MoyenTransport) {
        const modalRef = this.modalService.open(EditMoyenTransportComponent);
        modalRef.componentInstance.moyenTransportID = moyenTransport.id;
    }
}
