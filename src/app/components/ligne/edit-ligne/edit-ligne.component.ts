import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent} from "@coreui/angular";
import {LignesState, LignesStateEnum} from "../ngrx/ligne.reducers";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {EditLigneAction, UpdateLigneAction} from "../ngrx/ligne.actions";

@Component({
  selector: 'app-edit-ligne',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterComponent],
  templateUrl: './edit-ligne.component.html',
  styleUrl: './edit-ligne.component.scss'
})
export class EditLigneComponent implements OnInit{

  state:LignesState|null=null;
  formBuilt: boolean= false;
  ligneID:number;
  ligneFormGroup: FormGroup |null=null;
  readonly LignesStateEnum= LignesStateEnum;
submitted: boolean=false;

  constructor(private activatedRoute: ActivatedRoute, private store:Store<any>, private router:Router,private fb:FormBuilder) {
    this.ligneID=activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.store.dispatch(new EditLigneAction(this.ligneID));
    this.store.subscribe(state=>{
      this.state= state.lineState;
      if(this.state?.dataState==LignesStateEnum.LOADED){
        if(this.state.currentLigne!=null){
          this.ligneFormGroup=this.fb.group({
            id:[this.state.currentLigne.id],
            code:[this.state.currentLigne.code,Validators.required],
            type:[this.state.currentLigne.type,Validators.required],
          });
          this.formBuilt=true;
        }
      }

    });
  }

  onUpdateLigne() {
    this.submitted=true;
    if(this.ligneFormGroup?.invalid)return
    this.store.dispatch(new UpdateLigneAction(this.ligneFormGroup?.value));
  }
}
