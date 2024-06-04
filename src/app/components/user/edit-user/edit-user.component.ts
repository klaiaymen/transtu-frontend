import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent} from "@coreui/angular";
import {UsersState, UsersStateEnum} from "../ngrx/user.reducers";
import {AuthService} from "../../authService/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {UserService} from "../services/user.service";
import {EditUserAction, UpdateUserAction} from "../ngrx/user.actions";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit{

  state:UsersState|null=null;
  formBuilt: boolean= false;
  userID: number | undefined;
  userFormGroup: FormGroup |null=null;
  readonly UsersStateEnum= UsersStateEnum;
  submitted: boolean=false;
  constructor(public authService:AuthService,private modalService: NgbModal,private userService:UserService,private activatedRoute: ActivatedRoute, private store:Store<any>, private router:Router,private fb:FormBuilder) {
  }

  ngOnInit(): void {
      this.userService.getUserByUsername(this.authService.username).subscribe(
          (response:any)=>{
              console.log((response.userId))

              this.store.dispatch(new EditUserAction(response.userId));
              this.store.subscribe(state=>{
                  this.state= state.userState;
                  if(this.state?.dataState==UsersStateEnum.LOADED){
                      if(this.state.currentUser!=null){
                          this.userFormGroup=this.fb.group({
                              userId:[this.state.currentUser.userId],
                              username:[this.state.currentUser.username,Validators.required],
                              password:[this.state.currentUser.password,Validators.required],
                              email:[this.state.currentUser.email,Validators.required],
                              tel:[this.state.currentUser.tel,Validators.required],
                          });
                          this.formBuilt=true;
                      }
                  }

              });
          }
      )

  }


  onUpdateUser() {
    this.submitted=true;
    if(this.userFormGroup?.invalid)return
    this.store.dispatch(new UpdateUserAction(this.userFormGroup?.value));
  }
}
