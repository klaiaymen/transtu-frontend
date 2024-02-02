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
      const isConfirmed = confirm("Êtes-vous sûr de vouloir supprimer ce moyen de transport ?");
      if (isConfirmed) {
        this.store.dispatch(new DeleteMTtAction(moyenTransport))
        console.log("moyen transport supprimé !");
      }
    }

    onEdit(moyenTransport:MoyenTransport) {
        const modalRef = this.modalService.open(EditMoyenTransportComponent);
        modalRef.componentInstance.moyenTransportID = moyenTransport.id;
    }
}
