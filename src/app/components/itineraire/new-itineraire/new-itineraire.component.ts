import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent} from "@coreui/angular";
import {LignesState} from "../../ligne/ngrx/ligne.reducers";
import {Store} from "@ngrx/store";
import {NewLigneAction, SaveLigneAction} from "../../ligne/ngrx/ligne.actions";
import {ItinerairesState, ItinerairesStateEnum} from "../ngrx/itineraire.reducers";
import {NewItineraireAction, SaveItineraireAction} from "../ngrx/itineraire.actions";

@Component({
  selector: 'app-new-itineraire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterComponent],
  templateUrl: './new-itineraire.component.html',
  styleUrl: './new-itineraire.component.scss'
})
export class NewItineraireComponent implements OnInit{
  itineraireFormGroup:  FormGroup|null=null;
  state:ItinerairesState|null=null;
  readonly ItinerairesStateEnum= ItinerairesStateEnum;
  submitted: boolean=false;

  constructor(private store:Store<any>, private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.store.dispatch(new NewItineraireAction({}))
    this.store.subscribe(state=>{
      this.state=state.itineraireState;
      if(this.state?.dataState==ItinerairesStateEnum.NEW){
        this.itineraireFormGroup=this.fb.group({
          /*code:['',Validators.required],
          type:['',Validators.required],*/
        })
      }
    })
  }

  onSaveItineraire() {
    this.submitted=true;
    if(!this.itineraireFormGroup?.valid) return
    this.store.dispatch(new SaveItineraireAction(this.itineraireFormGroup?.value));
  }

  newItineraire() {
    this.store.dispatch(new NewItineraireAction({}));
  }
}
