import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LignesState, LignesStateEnum} from "../../ligne/ngrx/ligne.reducers";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent} from "@coreui/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {EditLigneAction, UpdateLigneAction} from "../../ligne/ngrx/ligne.actions";
import {StationsState, StationsStateEnum} from "../ngrx/station.reducers";
import {EditStationAction, UpdateStationAction} from "../ngrx/station.actions";

@Component({
  selector: 'app-edit-station',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterComponent],
  templateUrl: './edit-station.component.html',
  styleUrl: './edit-station.component.scss'
})
export class EditStationComponent implements  OnInit{

  state:StationsState|null=null;
  formBuilt: boolean= false;
  stationID:number;
  stationFormGroup: FormGroup |null=null;
  readonly StationsStateEnum= StationsStateEnum;

  constructor(private activatedRoute: ActivatedRoute, private store:Store<any>, private router:Router,private fb:FormBuilder) {
    this.stationID=activatedRoute.snapshot.params['id'];
  }


  ngOnInit(): void {
    this.store.dispatch(new EditStationAction(this.stationID));
    this.store.subscribe(state=>{
      this.state= state.stationState;
      if(this.state?.dataState==StationsStateEnum.LOADED){
        if(this.state.currentStation!=null){
          this.stationFormGroup=this.fb.group({
            id:[this.state.currentStation.id],
            label:[this.state.currentStation.label,Validators.required],
            code:[this.state.currentStation.code,Validators.required],
            longitude:[this.state.currentStation.longitude,Validators.required],
            latitude:[this.state.currentStation.lattitude,Validators.required],
          });
          this.formBuilt=true;
        }
      }

    });
  }

  onUpdateStation() {
    if(this.stationFormGroup?.invalid)return
    this.store.dispatch(new UpdateStationAction(this.stationFormGroup?.value));
  }
}
