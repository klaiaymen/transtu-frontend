import {Component, Input, OnInit} from '@angular/core';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import {ReclamationService} from "../../../components/reclamation/service/reclamation.service";
import {Reclamation} from "../../../components/reclamation/model/reclamation.model";
import {AuthService} from "../../../components/authService/auth.service";
//import Array from "$GLOBAL$";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit{
  ngOnInit(): void {
  }
  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(public authService: AuthService,private classToggler: ClassToggleService,private reclamationService: ReclamationService) {
    super();
  }

  hangleLogout() {
    this.authService.logout();
  }
}
