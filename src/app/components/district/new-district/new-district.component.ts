import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent} from "@coreui/angular";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {DistrictsState, DistrictsStateEnum} from "../ngrx/district.reducers";
import {NewDistrictAction, SaveDistrictAction} from "../ngrx/district.actions";
import {NotAuthorizedComponent} from "../../../not-authorized/not-authorized.component";

@Component({
  selector: 'app-new-district',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterComponent, NotAuthorizedComponent],
  templateUrl: './new-district.component.html',
  styleUrl: './new-district.component.scss'
})
export class NewDistrictComponent implements OnInit{
  districtFormGroup:  FormGroup|null=null;
  state:DistrictsState|null=null;
  readonly DistrictsStateEnum= DistrictsStateEnum;
  submitted: boolean=false;
  constructor(private store:Store<any>, private fb:FormBuilder,private router:Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(new NewDistrictAction({}))
    this.store.subscribe(state=>{
      this.state=state.districtState;
      if(this.state?.dataState==DistrictsStateEnum.NEW){
        this.districtFormGroup=this.fb.group({
          label:['',Validators.required],
          adress:['',Validators.required],
          phoneNumber:['',Validators.required],
        })
      }
    })
  }

  onSaveDistrict() {
    this.submitted=true;
    if(!this.districtFormGroup?.valid) return
    this.store.dispatch(new SaveDistrictAction(this.districtFormGroup?.value));
  }

  newDistrict() {
    this.store.dispatch(new NewDistrictAction({}));
  }
}
