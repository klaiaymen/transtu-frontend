import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../authService/auth.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  userId:number|undefined
  tel:string|undefined
  email:string|undefined

  constructor(private userService:UserService,public authService:AuthService) {
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

}
