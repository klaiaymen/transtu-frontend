import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent} from "@coreui/angular";
import {LignesState, LignesStateEnum} from "../../ligne/ngrx/ligne.reducers";
import {Store} from "@ngrx/store";
import {NewDistrictAction} from "../../district/ngrx/district.actions";
import {NewStationAction, SaveStationAction} from "../ngrx/station.actions";
import {StationsState, StationsStateEnum} from "../ngrx/station.reducers";

@Component({
  selector: 'app-new-station',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterComponent],
  templateUrl: './new-station.component.html',
  styleUrl: './new-station.component.scss'
})
export class NewStationComponent implements OnInit{

  stationFormGroup:  FormGroup|null=null;
  state:StationsState|null=null;
  readonly StationsStateEnum= StationsStateEnum;
  submitted: boolean=false;

  constructor(private store:Store<any>, private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.store.dispatch(new NewStationAction({}))
    this.store.subscribe(state=>{
      this.state=state.stationState;
      if(this.state?.dataState==StationsStateEnum.NEW){
        this.stationFormGroup=this.fb.group({
          code:['',Validators.required],
          label:['',Validators.required],
          longitude:['',Validators.required],
          latitude:['',Validators.required],
        })
      }
    })
  }

  onSaveStation() {
    this.submitted=true;
    if(!this.stationFormGroup?.valid) return
    this.store.dispatch(new SaveStationAction(this.stationFormGroup?.value));
  }

  newStation() {
    this.store.dispatch(new NewStationAction({}));
  }


}
