import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MoyenTransport} from "../../model/moyenTransport.model";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteMTtAction, EditMTAction, GetAllMTAction} from "../../ngrx/moyensTransport.actions";
import {
    ButtonCloseDirective, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent, ModalTitleDirective,
    ModalToggleDirective, TableDirective
} from "@coreui/angular";
import {EditMoyenTransportComponent} from "../../edit-moyen-transport/edit-moyen-transport.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfirmationComponent} from "../../../modal-confirmation/modal-confirmation.component";
import {AuthService} from "../../../authService/auth.service";
import {AppUser} from "../../../user/model/user.model";
import {UserService} from "../../../user/services/user.service";
import {MoyenTransportService} from "../../services/moyenTransport.service";


@Component({
  selector: 'app-mt-item',
  standalone: true,
    imports: [CommonModule, ModalToggleDirective, ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ButtonCloseDirective, ButtonDirective, ModalTitleDirective, FormControlDirective, FormDirective, FormLabelDirective, FormsModule, ReactiveFormsModule, EditMoyenTransportComponent, TableDirective],
  templateUrl: './mt-item.component.html',
  styleUrl: './mt-item.component.scss'
})
export class MtItemComponent implements  OnInit{
  @Input() moyenTransport: MoyenTransport|null=null;
  allUsers: AppUser[]=[]
  showTable:boolean=false;
  iconFullscreen: string = "cil-fullscreen";
  iconExitFullscreen: string = "cil-fullscreen-exit";
  searchQuery: string='';
  constructor(private moyenTransportService:MoyenTransportService,private userService:UserService,public authService:AuthService,private store:Store, private router:Router,private modalService: NgbModal) {

    }
  ngOnInit(): void {
    this.loadAllUsers()
    console.log(this.moyenTransport?.users)
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

  searchUsers(query: string) {
    if (query.trim() !== '') {
      this.showTable=true;
      this.searchUser(query)
    } else {
      this.showTable=false;
      this.loadAllUsers()
    }
  }

  searchUser(query:string) {
    this.userService.searchUsers(query).subscribe(users => {
      this.allUsers = users.map(u => ({
        ...u,
        assignedToMt: this.isUserAssignedToMt(u, this.moyenTransport),
        disabled:!this.authService.roles.includes('ADMIN')
      }));
    });
  }

  loadAllUsers() {
    this.userService.getUsers().subscribe(users => {
      this.allUsers = users.map(u => ({
        ...u,
        assignedToMt: this.isUserAssignedToMt(u, this.moyenTransport),
        disabled:!this.authService.roles.includes('ADMIN')
      }));
    });
  }

  isUserAssignedToMt(user: AppUser, mt: MoyenTransport | null): boolean {
    //@ts-ignore
    return mt?.users.some(u => u.userId === user.userId);
  }

  toggleUserAssignment(user: AppUser, mt: MoyenTransport) {
    if (user.assignedToMt) {
      // Ajouter le user au mt
      this.moyenTransportService.assignUserToMt(user.userId, mt.id).subscribe(() => {
        user.assignedToMt = true;
        mt.users.push(user);
      });
    } else {
      // Supprimer le user du mt
      const index = mt.users.findIndex(u => u.userId === user.userId);
      if (index !== -1) {
        this.moyenTransportService.removeUserFromMt(user.userId, mt.id).subscribe(() => {
          user.assignedToMt = false;
          mt.users.splice(index, 1);
        });
      }
    }
  }
  toggleTableUsers(): void {
    this.showTable = !this.showTable;
    if (this.showTable) {
      this.iconFullscreen = "cil-exit-fullscreen";
    } else {
      this.iconFullscreen = "cil-fullscreen";
    }
  }
}
