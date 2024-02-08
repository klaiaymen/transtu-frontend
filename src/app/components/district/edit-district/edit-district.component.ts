import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent} from "@coreui/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {DistrictsState, DistrictsStateEnum} from "../ngrx/district.reducers";
import {EditDistrictAction, UpdateDistrictAction} from "../ngrx/district.actions";

@Component({
  selector: 'app-edit-district',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterComponent],
  templateUrl: './edit-district.component.html',
  styleUrl: './edit-district.component.scss'
})
export class EditDistrictComponent implements  OnInit{

  state:DistrictsState|null=null;
  formBuilt: boolean= false;
  districtID:number;
  districtFormGroup: FormGroup |null=null;
  readonly DistrictsStateEnum= DistrictsStateEnum;

  constructor(private activatedRoute: ActivatedRoute, private store:Store<any>, private router:Router,private fb:FormBuilder) {
    this.districtID=activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.store.dispatch(new EditDistrictAction(this.districtID));
    this.store.subscribe(state=>{
      this.state= state.districtState;
      if(this.state?.dataState==DistrictsStateEnum.LOADED){
        if(this.state.currentDistrict!=null){
          this.districtFormGroup=this.fb.group({
            id:[this.state.currentDistrict.id],
            label:[this.state.currentDistrict.label,Validators.required],
            adress:[this.state.currentDistrict.adress,Validators.required],
            phoneNumber:[this.state.currentDistrict.phoneNumber,Validators.required],
          });
          this.formBuilt=true;
        }
      }

    });
  }

  onUpdateDistrict() {
    if(this.districtFormGroup?.invalid)return
    this.store.dispatch(new UpdateDistrictAction(this.districtFormGroup?.value));
  }

}
