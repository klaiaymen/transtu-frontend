import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonCloseDirective,
  ButtonDirective,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
  ProgressBarComponent,
  ProgressComponent,
  ToastBodyComponent, ToastCloseDirective,
  ToastComponent, ToasterComponent,
  ToastHeaderComponent
} from "@coreui/angular";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MoyensTransportState, MoyensTransportStateEnum} from "../../../ngrx/moyensTransport.reducer";
import {MtItemComponent} from "../mt-list/mt-item/mt-item.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {EditMTAction, UpdateMTAction} from "../../../ngrx/moyensTransport.actions";
import {DocsComponentsModule} from "@docs-components/docs-components.module";

@Component({
  selector: 'app-edit-moyen-transport',
  standalone: true,
  imports: [CommonModule, ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ModalToggleDirective, ButtonCloseDirective, ButtonDirective, ModalTitleDirective, FormControlDirective, FormDirective, FormLabelDirective, ReactiveFormsModule, MtItemComponent, DocsComponentsModule, ToastComponent, ToastBodyComponent, ToastHeaderComponent, ProgressBarComponent, ProgressComponent, ToastCloseDirective, ToasterComponent],
  templateUrl: './edit-moyen-transport.component.html',
  styleUrl: './edit-moyen-transport.component.scss'
})
export class EditMoyenTransportComponent implements  OnInit{

  state:MoyensTransportState|null=null;
  formBuilt: boolean= false;
  moyenTransportID:number;
  mtFormGroup: FormGroup |null=null;
  readonly MoyensTransportStateEnum= MoyensTransportStateEnum;





  constructor(private activatedRoute: ActivatedRoute, private store:Store<any>, private router:Router,private fb:FormBuilder) {
    this.moyenTransportID=activatedRoute.snapshot.params['id'];

  }


  ngOnInit(): void {
          this.store.dispatch(new EditMTAction(this.moyenTransportID));
            this.store.subscribe(state=>{
                this.state= state.catalogState;
                if(this.state?.dataState==MoyensTransportStateEnum.LOADED){
                    if(this.state.currentMt!=null){
                        this.mtFormGroup=this.fb.group({
                            id:[this.state.currentMt.id],
                            label:[this.state.currentMt.label,Validators.required],
                            code:[this.state.currentMt.code,Validators.required],
                            type:[this.state.currentMt.type,Validators.required],
                        });
                        this.formBuilt=true;
                    }
                }

            });
  }

  onUpdateMoyenTransport() {
    if(this.mtFormGroup?.invalid)return
    this.store.dispatch(new UpdateMTAction(this.mtFormGroup?.value));
  }

}
