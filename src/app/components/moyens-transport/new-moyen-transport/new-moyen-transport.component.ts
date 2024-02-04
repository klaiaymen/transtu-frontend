import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MoyensTransportState, MoyensTransportStateEnum} from "../../../ngrx/moyensTransport.reducer";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {GetAllMTAction, NewMTAction, SaveMTAction} from "../../../ngrx/moyensTransport.actions";
import {
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalToggleDirective, ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent
} from "@coreui/angular";

@Component({
  selector: 'app-new-moyen-transport',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ModalToggleDirective, ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterComponent],
  templateUrl: './new-moyen-transport.component.html',
  styleUrl: './new-moyen-transport.component.scss'
})
export class NewMoyenTransportComponent implements OnInit{

    mtFormGroup:  FormGroup|null=null;
    state:MoyensTransportState|null=null;
    readonly MoyensTransportStateEnum= MoyensTransportStateEnum;
    submitted: boolean=false;
  constructor(private store:Store<any>, private fb:FormBuilder,private router:Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(new NewMTAction({}))
    this.store.subscribe(state=>{
      this.state=state.catalogState;
      if(this.state?.dataState==MoyensTransportStateEnum.NEW){
        this.mtFormGroup=this.fb.group({
          label:['',Validators.required],
          code:['',Validators.required],
          type:['',Validators.required],
        })
      }
    })
  }


  newMoyenTransport() {
    this.store.dispatch(new NewMTAction({}));
  }

  onSaveMt() {
    this.submitted=true;
    if(!this.mtFormGroup?.valid) return
    this.store.dispatch(new SaveMTAction(this.mtFormGroup?.value));
  }
}
