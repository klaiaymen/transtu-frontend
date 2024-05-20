import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersState, UsersStateEnum} from "../../../components/user/ngrx/user.reducers";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {NewUserAction, SaveUserAction} from "../../../components/user/ngrx/user.actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
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
    this.router.navigateByUrl('/login')
  }
}
