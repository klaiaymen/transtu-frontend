import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {TableDirective} from "@coreui/angular";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfirmationComponent} from "../../../modal-confirmation/modal-confirmation.component";
import {ReclamationService} from "../../service/reclamation.service";
import {Reclamation} from "../../model/reclamation.model";
import {DeleteReclamationAction, EditReclamationAction} from "../../ngrx/reclamation.actions";
import {EditReclamationComponent} from "../../edit-reclamation/edit-reclamation.component";
import {ReclamationDetailsComponent} from "./reclamation-details/reclamation-details.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NewReclamationComponent} from "../../new-reclamation/new-reclamation.component";

@Component({
  selector: 'app-reclamation-item',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TableDirective],
  templateUrl: './reclamation-item.component.html',
  styleUrl: './reclamation-item.component.scss'
})
export class ReclamationItemComponent {
  ngOnInit(): void {
  }
  @Input() reclamation: Reclamation|null=null;
  constructor(private http:HttpClient,private store:Store, private router:Router,private modalService: NgbModal,private reclamationService: ReclamationService) {
  }

  onDelete(reclamation:Reclamation) {
    const modalRef = this.modalService.open(ModalConfirmationComponent);

    modalRef.componentInstance.confirmationMessage = "Êtes-vous sûr de vouloir supprimer cette réclamation ?";

    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.store.dispatch(new DeleteReclamationAction(reclamation));
          console.log("reclamation supprimé !");
        } else {
          console.log("Suppression annulée !");
        }
      },
      () => {
        console.log("Modal fermé sans confirmation");
      }
    );
  }

  onEdit(reclamation:Reclamation) {
    const modalRef = this.modalService.open(EditReclamationComponent, { size: 'xl' });
    modalRef.componentInstance.reclamationID = reclamation.id;
  }

  onDetails(reclamation: Reclamation) {
    //const modalRef = this.modalService.open(ReclamationDetailsComponent);
      const modalRef = this.modalService.open(ReclamationDetailsComponent, { size: 'xl' });
    modalRef.componentInstance.reclamationID = reclamation.id;
  }

    onDispatcherValidate(id: number) {
      this.reclamationService.dispatcherValidate(id).subscribe(
          (response: Reclamation) => {
            console.log('Réclamation dispatcher validée avec succès:', response);
            window.location.reload();
            //this.router.navigateByUrl('/reclamation')
          },
          (error) => {
            console.error('Erreur lors de la validation de la réclamation:', error);
          }
      );
    }


  /*sendEmail(recipient: string, subject: string, body: string): void {
    const url = 'http://localhost:8081/reclamation/sendEmail';
    const payload = { recipient, subject, body };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(url, payload, { headers }).subscribe({
      next: () => {
        console.log('E-mail sent successfully!');
      },
      error: (error) => {
        console.error('Failed to send e-mail:', error);
      }
    });
  }*/
}
