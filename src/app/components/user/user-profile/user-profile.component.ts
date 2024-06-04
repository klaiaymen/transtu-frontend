import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../authService/auth.service";
import {UserService} from "../services/user.service";
import {Router, RouterLink} from "@angular/router";
import {EditStationComponent} from "../../station/edit-station/edit-station.component";
import {EditUserComponent} from "../edit-user/edit-user.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Station} from "../../station/model/station.model";
import {AppUser} from "../model/user.model";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  @Input() user: AppUser|null=null;
  userId:number|undefined
  tel:string|undefined
  email:string|undefined
  constructor(private modalService: NgbModal,private router:Router,private userService:UserService,public authService:AuthService) {
  }


  ngOnInit(): void {
    this.userService.getUserByUsername(this.authService.username).subscribe(
      (response:any)=>{
        console.log((response))
        this.userId=response.id;
        this.tel=response.tel
        this.email=response.email
      }
    )
  }


  onEdit() {
    this.router.navigateByUrl("/editUser/"+3)
  }
}
