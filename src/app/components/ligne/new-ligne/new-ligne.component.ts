import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent} from "@coreui/angular";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {NewDistrictAction} from "../../district/ngrx/district.actions";
import {LignesState, LignesStateEnum} from "../ngrx/ligne.reducers";
import {NewLigneAction, SaveLigneAction} from "../ngrx/ligne.actions";

@Component({
  selector: 'app-new-ligne',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterComponent],
  templateUrl: './new-ligne.component.html',
  styleUrl: './new-ligne.component.scss'
})
export class NewLigneComponent implements OnInit{

  ligneFormGroup:  FormGroup|null=null;
  state:LignesState|null=null;
  readonly LignesStateEnum= LignesStateEnum;
  submitted: boolean=false;

  constructor(private store:Store<any>, private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.store.dispatch(new NewDistrictAction({}))
    this.store.subscribe(state=>{
      this.state=state.districtState;
      if(this.state?.dataState==LignesStateEnum.NEW){
        this.ligneFormGroup=this.fb.group({
          code:['',Validators.required],
          type:['',Validators.required],
        })
      }
    })
  }

  onSaveLigne() {
    this.submitted=true;
    if(!this.ligneFormGroup?.valid) return
    this.store.dispatch(new SaveLigneAction(this.ligneFormGroup?.value));
  }

  newLigne() {
    this.store.dispatch(new NewLigneAction({}));
  }
}
