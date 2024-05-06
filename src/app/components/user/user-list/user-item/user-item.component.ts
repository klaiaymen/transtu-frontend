import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {TableDirective} from "@coreui/angular";
import {District} from "../../../district/model/district.model";
import {MoyenTransport} from "../../../moyens-transport/model/moyenTransport.model";
import {AuthService} from "../../../authService/auth.service";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DistrictService} from "../../../district/service/district.services";
import {MoyenTransportService} from "../../../moyens-transport/services/moyenTransport.service";
import {ModalConfirmationComponent} from "../../../modal-confirmation/modal-confirmation.component";
import {DeleteDistrictAction, SearchDistrictAction} from "../../../district/ngrx/district.actions";
import {EditDistrictComponent} from "../../../district/edit-district/edit-district.component";
import {AppUser} from "../../model/user.model";
import {UserService} from "../../services/user.service";
import {DeleteUserAction} from "../../ngrx/user.actions";
import {EditUserComponent} from "../../edit-user/edit-user.component";
import {AppRole} from "../../../role/model/role.model";
import {RoleService} from "../../../role/service/role.service";

@Component({
  selector: 'app-user-item',
  standalone: true,
    imports: [CommonModule, FormsModule, TableDirective],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss'
})
export class UserItemComponent implements OnInit{
  ngOnInit(): void {
    this.loadAllRoles()
  }
  @Input() user: AppUser|null=null;
  roles: AppRole[]=[]
  filtredRoles: AppRole[]=[]
  showTable:boolean=false;
  iconFullscreen: string = "cil-fullscreen";
  iconExitFullscreen: string = "cil-fullscreen-exit";
  searchQuery: string='';
  query: string='';
  constructor(public authService:AuthService,private store:Store, private router:Router,private modalService: NgbModal,private userService: UserService, private roleService: RoleService) {
  }


  onDelete(user:AppUser) {
    const modalRef = this.modalService.open(ModalConfirmationComponent);

    modalRef.componentInstance.confirmationMessage = "Êtes-vous sûr de vouloir supprimer ce user ?";

    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.store.dispatch(new DeleteUserAction(user));
          console.log("user supprimé !");
        } else {
          console.log("Suppression annulée !");
        }
      },
      () => {
        console.log("Modal fermé sans confirmation");
      }
    );
  }

  onEdit(user:AppUser) {
    const modalRef = this.modalService.open(EditUserComponent);
    modalRef.componentInstance.userID = user.userId;
  }


  loadAllRoles() {
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles.map(r => ({
        ...r,
        assignedToUser: this.isRoleAssignedToUser(r, this.user),
        disabled:!this.authService.roles.includes('ADMIN')
      }));
    });
  }

  isRoleAssignedToUser(role: AppRole, user: AppUser | null): boolean {
    // @ts-ignore
    return user?.roles.some(r => r.role === role.role);
  }

  toggleRoleAssignment(role: AppRole, user: AppUser) {
    if (role.assignedToUser) {
      // Ajouter le role au user
      this.userService.assignRoleToUser(user.userId,role.role).subscribe(() => {
        role.assignedToUser = true;
        // @ts-ignore
        user.roles.push(role);
      });
    } else {
      // Supprimer le Role du user
      // @ts-ignore
      const index = user.roles.findIndex(r => r.role === role.role);
      if (index !== -1) {
        this.userService.removeRoleFromUser(user.userId,role.role).subscribe(() => {
          role.assignedToUser = false;
          // @ts-ignore
          user.roles.splice(index, 1);
        });
      }
    }
  }
  toggleTableRoles(): void {
    this.showTable = !this.showTable;
    if (this.showTable) {
      this.iconFullscreen = "cil-exit-fullscreen";
    } else {
      this.iconFullscreen = "cil-fullscreen";
    }
  }

  searchRoles(query: string) {
    if ((query.trim() !== '') && (query !== 'All')) {
      this.roles = this.roles.filter(role => role.role.toLowerCase().includes(query.toLowerCase()));
    } else {
      this.loadAllRoles();
    }

  }


}
