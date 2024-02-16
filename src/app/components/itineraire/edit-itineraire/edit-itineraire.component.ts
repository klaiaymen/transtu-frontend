import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent} from "@coreui/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {ItinerairesState, ItinerairesStateEnum} from "../ngrx/itineraire.reducers";
import {EditItineraireAction, UpdateItineraireAction} from "../ngrx/itineraire.actions";

@Component({
  selector: 'app-edit-itineraire',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterComponent],
  templateUrl: './edit-itineraire.component.html',
  styleUrl: './edit-itineraire.component.scss'
})
export class EditItineraireComponent implements OnInit{

  state:ItinerairesState|null=null;
  formBuilt: boolean= false;
  itineraireID:number;
  itineraireFormGroup: FormGroup |null=null;
  readonly ItinerairesStateEnum= ItinerairesStateEnum;
  submitted: boolean=false;
  constructor(private activatedRoute: ActivatedRoute, private store:Store<any>, private router:Router,private fb:FormBuilder) {
    this.itineraireID=activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.store.dispatch(new EditItineraireAction(this.itineraireID));
    this.store.subscribe(state=>{
      this.state= state.itineraireState;
      if(this.state?.dataState==ItinerairesStateEnum.LOADED){
        if(this.state.currentItineraire!=null){
          this.itineraireFormGroup=this.fb.group({
            id:[this.state.currentItineraire.id],
            name:[this.state.currentItineraire.name,Validators.required],
          });
          this.formBuilt=true;
        }
      }

    });
  }

  onUpdateItineraire() {
    this.submitted=true;
    if(this.itineraireFormGroup?.invalid)return
    this.store.dispatch(new UpdateItineraireAction(this.itineraireFormGroup?.value));
  }
}
