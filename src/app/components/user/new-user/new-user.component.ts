import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NotAuthorizedComponent} from "../../../not-authorized/not-authorized.component";
import {ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent} from "@coreui/angular";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {UsersState, UsersStateEnum} from "../ngrx/user.reducers";
import {NewUserAction, SaveUserAction} from "../ngrx/user.actions";

@Component({
  selector: 'app-new-user',
  standalone: true,
    imports: [CommonModule, FormsModule, NotAuthorizedComponent, ReactiveFormsModule, ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterComponent],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent {
  userFormGroup:  FormGroup|null=null;
  state:UsersState|null=null;
  readonly UsersStateEnum= UsersStateEnum;
  submitted: boolean=false;
  constructor(private store:Store<any>, private fb:FormBuilder,private router:Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(new NewUserAction({}))
    this.store.subscribe(state=>{
      this.state=state.userState;
      if(this.state?.dataState==UsersStateEnum.NEW){
        this.userFormGroup=this.fb.group({
          username:['',Validators.required],
          password:['',Validators.required],
          confirmPassword:['',Validators.required],
          tel:['',Validators.required],
          email:['',Validators.required],
        })
      }
    })
  }

  onSaveUser() {
    this.submitted=true;
    if(!this.userFormGroup?.valid) return
    this.store.dispatch(new SaveUserAction(this.userFormGroup?.value));
  }

  newUser() {
    this.store.dispatch(new NewUserAction({}));
  }
}
