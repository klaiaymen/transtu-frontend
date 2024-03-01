import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    CalloutComponent,
    ToastBodyComponent,
    ToastComponent,
    ToasterComponent,
    ToastHeaderComponent
} from "@coreui/angular";

import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {ReclamationsState, ReclamationsStateEnum} from "../ngrx/reclamation.reducers";
import {EditReclamationAction, UpdateReclamationAction} from "../ngrx/reclamation.actions";
import {Reclamation} from "../model/reclamation.model";
import {ReclamationService} from "../service/reclamation.service";

@Component({
  selector: 'app-edit-reclamation',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterComponent, CalloutComponent],
  templateUrl: './edit-reclamation.component.html',
  styleUrl: './edit-reclamation.component.scss'
})
export class EditReclamationComponent implements OnInit{
  state:ReclamationsState|null=null;
  formBuilt: boolean= false;
  reclamationID:number;
  reclamationFormGroup: FormGroup |null=null;
  readonly ReclamationsStateEnum= ReclamationsStateEnum;
  submitted: boolean=false;
  @Input() latitude: number|undefined;
  @Input() longitude: number|undefined;

  constructor(private reclamationService:ReclamationService,private activatedRoute: ActivatedRoute, private store:Store<any>, private router:Router,private fb:FormBuilder) {
    this.reclamationID=activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.store.dispatch(new EditReclamationAction(this.reclamationID));
    this.store.subscribe(state=>{
      this.state= state.reclamationState;
      if(this.state?.dataState==ReclamationsStateEnum.LOADED){
        if(this.state.currentReclamation!=null){
          this.reclamationFormGroup=this.fb.group({
            id:[this.state.currentReclamation.id],
            reportingSourceEtat:[this.state.currentReclamation.reportingSourceEtat,Validators.required],
            reportingSourceTel:[this.state.currentReclamation.reportingSourceTel,Validators.required],
            reportingSourceNomPrenom:[this.state.currentReclamation.reportingSourceNomPrenom,Validators.required],
            typeAccidentIncident:[this.state.currentReclamation.typeAccidentIncident,Validators.required],
            typeDegat:[this.state.currentReclamation.typeDegat,Validators.required],
            notes:[this.state.currentReclamation.notes,Validators.required],
            lieu:[this.state.currentReclamation.lieu,Validators.required],
            codeMt:['codeMt',Validators.required],
            ligne:['ligneAssocie',Validators.required],
            userId:['userId',Validators.required],
            userNomPrenom:['userNomPrenom',Validators.required],
            userTel:['userNomPrenom',Validators.required],
          });
          this.formBuilt=true;
        }
      }

    });
  }

  onUpdateReclamation() {
    this.submitted=true;
    if(this.reclamationFormGroup?.invalid)return
    this.store.dispatch(new UpdateReclamationAction(this.reclamationFormGroup?.value));
  }

}
