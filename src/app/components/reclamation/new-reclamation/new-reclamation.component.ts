import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
import {PhotoReclamationService} from "../service/photoReclamation.service";


@Component({
  selector: 'app-new-reclamation',
  standalone: true,
  imports: [CommonModule, ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterComponent, FormsModule, ReactiveFormsModule, CalloutComponent],
  templateUrl: './new-reclamation.component.html',
  styleUrl: './new-reclamation.component.scss'
})
export class NewReclamationComponent implements OnInit{
  @ViewChild('videoElement') videoElement: ElementRef | undefined;
  @ViewChild('canvasElement') canvasElement: ElementRef | undefined;
  photoTaken: boolean = false;
  photoUrls: string[] = [];
  reclamationFormGroup:  FormGroup|null=null;
  state:ReclamationsState|null=null;
  readonly ReclamationsStateEnum= ReclamationsStateEnum;
  submitted: boolean=false;
  @Input() latitude: number|undefined;
  @Input() longitude: number|undefined;
  reclamationId:number|undefined;

  constructor(private photoReclamationService:PhotoReclamationService,private modalService: NgbModal,private store:Store<any>, private fb:FormBuilder,private router:Router,private reclamationService:ReclamationService,private http: HttpClient) {
  }

  ngAfterViewInit() {
    this.initCamera();
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
    this.reclamationId=this.reclamationFormGroup.value.id;


    //console.log('photo reclamation url',this.photoUrl)
    this.router.navigateByUrl("/reclamation")

  }*/

  /*onSaveReclamation() {
    this.submitted = true;
    if (!this.reclamationFormGroup?.valid) return;

    this.reclamationService.saveReclamation(this.reclamationFormGroup?.value)
      .then(reclamationId => {
        console.log('ID de la réclamation sauvegardée :', reclamationId);
        console.log(this.photoUrls)
        this.reclamationId = reclamationId;
        // Maintenant que vous avez l'ID de la réclamation, vous pouvez enregistrer la photo
        if (this.photoUrl) {
          this.savePhotoWithReclamationId(reclamationId, this.photoUrl);
        }
        this.router.navigateByUrl("/reclamation");
      })
      .catch(error => {
        console.error('Erreur lors de la sauvegarde de la réclamation :', error);
      });
  }

  savePhotoWithReclamationId(reclamationId: number, photoUrl: string) {
    // Appel à votre service pour enregistrer la photo avec l'ID de la réclamation
    this.photoReclamationService.savePhoto(reclamationId, photoUrl)
      .subscribe(
        () => {
          console.log('Photo enregistrée avec succès avec l\'ID de la réclamation :', reclamationId);
        },
        error => {
          console.error('Erreur lors de l\'enregistrement de la photo :', error);
        }
      );
  }*/
  onSaveReclamation() {
    // @ts-ignore
    const video = this.videoElement.nativeElement;
    this.submitted = true;
    if (!this.reclamationFormGroup?.valid) return;

    this.reclamationService.saveReclamation(this.reclamationFormGroup?.value)
      .then(reclamationId => {
        console.log('ID de la réclamation sauvegardée :', reclamationId);
        console.log(this.photoUrls);
        this.reclamationId = reclamationId;
        // Maintenant que vous avez l'ID de la réclamation, vous pouvez enregistrer les photos
        if (this.photoUrls.length > 0) {
          this.savePhotosWithReclamationId(reclamationId, this.photoUrls);
        }
        video.srcObject.getVideoTracks().forEach((track: { stop: () => any; }) => track.stop());
        this.router.navigateByUrl("/reclamation");
      })
      .catch(error => {
        console.error('Erreur lors de la sauvegarde de la réclamation :', error);
      });
  }

  savePhotosWithReclamationId(reclamationId: number, photoUrls: string[]) {
    // Parcourez le tableau photoUrls et enregistrez chaque URL avec l'ID de la réclamation
    photoUrls.forEach(photoUrl => {
      this.photoReclamationService.savePhoto(reclamationId, photoUrl)
        .subscribe(
          () => {
            console.log('Photo enregistrée avec succès avec l\'ID de la réclamation :', reclamationId);
          },
          error => {
            console.error('Erreur lors de l\'enregistrement de la photo :', error);
          }
        );
    });
  }



  initCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        // @ts-ignore
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch(error => {
        console.error('Erreur lors de l\'initialisation de la caméra :', error);
      });
  }

  takePhoto() {
    // @ts-ignore
    const video = this.videoElement.nativeElement;
    // @ts-ignore
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.photoUrls.push( canvas.toDataURL('image/jpeg'));
    //console.log(this.photoUrls)
    this.photoTaken = true;

    // Arrête la vidéo pour économiser les ressources
    //video.srcObject.getVideoTracks().forEach((track: { stop: () => any; }) => track.stop());
  }

  deletePhoto(index: number) {
    this.photoUrls.splice(index, 1); // Supprime l'URL de la photo à l'indice spécifié
  }




}
