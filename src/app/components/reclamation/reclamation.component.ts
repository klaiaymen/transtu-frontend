import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DistrictListComponent} from "../district/district-list/district-list.component";
import {DistrictNavbarComponent} from "../district/district-navbar/district-navbar.component";
import {ReclamationNavbarComponent} from "./reclamation-navbar/reclamation-navbar.component";
import {ReclamationListComponent} from "./reclamation-list/reclamation-list.component";
import {Observable} from "rxjs";
import {DistrictsState} from "../district/ngrx/district.reducers";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {GetAllDistrictAction} from "../district/ngrx/district.actions";
import {ReclamationsState, ReclamationsStateEnum} from "./ngrx/reclamation.reducers";
import {GetAllReclamationAction, GetReclamationByUserAction} from "./ngrx/reclamation.actions";
import {AuthService} from "../authService/auth.service";
import {UserService} from "../user/services/user.service";

@Component({
  selector: 'app-reclamation',
  standalone: true,
  imports: [CommonModule, DistrictListComponent, DistrictNavbarComponent, ReclamationNavbarComponent, ReclamationListComponent],
  templateUrl: './reclamation.component.html',
  styleUrl: './reclamation.component.scss'
})
export class ReclamationComponent {
  reclamationsState$:Observable<ReclamationsState>|null=null;
  readonly ReclamationsStateEnum= ReclamationsStateEnum;
  state:ReclamationsState|null=null;

  constructor(private userService:UserService,private authService:AuthService,private store:Store<any>) {
  }

  ngOnInit(): void {
    this.reclamationsState$=this.store.pipe(
      map((state)=>  state.reclamationState)
    );

    this.userService.getUserByUsername(this.authService.username).subscribe(
      (response:any)=>{
        if(this.authService.roles.includes('ADMIN')){
          this.store.dispatch(new GetAllReclamationAction({}))
        }else{
          this.store.dispatch(new GetReclamationByUserAction(response.userId))
        }
      }
    )
  }



}
