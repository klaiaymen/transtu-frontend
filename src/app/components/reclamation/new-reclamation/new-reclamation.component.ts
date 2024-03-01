import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CalloutComponent,
  ToastBodyComponent,
  ToastComponent,
  ToasterComponent,
  ToastHeaderComponent
} from "@coreui/angular";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {ReclamationsState, ReclamationsStateEnum} from "../ngrx/reclamation.reducers";
import {NewReclamationAction, SaveReclamationAction} from "../ngrx/reclamation.actions";
import {ReclamationService} from "../service/reclamation.service";
import {HttpClient} from "@angular/common/http";
import {Reclamation} from "../model/reclamation.model";
import {EditReclamationComponent} from "../edit-reclamation/edit-reclamation.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-new-reclamation',
  standalone: true,
  imports: [CommonModule, ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterComponent, FormsModule, ReactiveFormsModule, CalloutComponent],
  templateUrl: './new-reclamation.component.html',
  styleUrl: './new-reclamation.component.scss'
})
export class NewReclamationComponent implements OnInit{
  savedReclamationId:number|undefined;
  isDraftMode: boolean = false;
  reclamationFormGroup:  FormGroup|null=null;
  state:ReclamationsState|null=null;
  readonly ReclamationsStateEnum= ReclamationsStateEnum;
  submitted: boolean=false;
  @Input() latitude: number|undefined;
  @Input() longitude: number|undefined;
  photos: File[] = [];
  constructor(private modalService: NgbModal,private store:Store<any>, private fb:FormBuilder,private router:Router,private reclamationService:ReclamationService,private http: HttpClient) {
  }

  ngOnInit(): void {
    this.store.dispatch(new NewReclamationAction({}))
    this.store.subscribe(state=>{
      this.state=state.reclamationState;
      if(this.state?.dataState==ReclamationsStateEnum.NEW){
        const currentDate = new Date();
        this.reclamationFormGroup=this.fb.group({
          reportingSourceNomPrenom:['',Validators.required],
          reportingSourceTel:['',Validators.required],
          reportingSourceEtat:['',Validators.required],
          lieu: `${this.latitude}~${this.longitude}`,
          //heure:[currentDate,Validators.required],
          codeMt:['codeMt',Validators.required],
          ligne:['ligneAssocie',Validators.required],
          userId:['userId',Validators.required],
          userNomPrenom:['userNomPrenom',Validators.required],
          userTel:['userNomPrenom',Validators.required],
          typeAccidentIncident:['',Validators.required],
          typeDegat:['',Validators.required],
          notes:['',Validators.required],
        })
      }
    })
  }


  /*onSaveReclamation() {
    this.submitted=true;
    if(!this.reclamationFormGroup?.valid) return;
    this.store.dispatch(new SaveReclamationAction(this.reclamationFormGroup?.value));

  }*/
  onSaveReclamation() {
    this.isDraftMode = true;
    this.submitted = true;
    if (!this.reclamationFormGroup?.valid) return;
    this.reclamationService.save(this.reclamationFormGroup.value)
      .subscribe(
        response => {
          const reclamationId = response.id;
          if (reclamationId) {
            this.isDraftMode = true;
            this.savedReclamationId = reclamationId;
              const modalRef = this.modalService.open(EditReclamationComponent);
              modalRef.componentInstance.reclamationID = reclamationId;
          }
          console.log('Réclamation sauvegardée avec succès:', response);
        },
        error => {
          console.error('Erreur lors de la sauvegarde de la réclamation:', error);
        }
      );
  }

  /*onFileChange(event: any) {
    this.photos = event.target.files;
  }

  onSaveReclamation() {
    const formData = new FormData();
    // @ts-ignore
    //const reclamationValue = this.reclamationFormGroup.value;
    //reclamationValue.heure = reclamationValue.heure.toString();

    // @ts-ignore
    formData.append('reclamation', JSON.stringify(this.reclamationFormGroup.value));
    for (let i = 0; i < this.photos.length; i++) {
      formData.append('photos', this.photos[i]);
    }
    this.reclamationService.createReclamation(formData).subscribe(
      (response) => {
        console.log('Réclamation créée avec succès');
        // Réinitialisez le formulaire ou effectuez toute autre action nécessaire
      },
      (error) => {
        console.error('Erreur lors de la création de la réclamation', error);
        // Gérez les erreurs, par exemple, affichez un message à l'utilisateur
      }
    );
  }*/



}
