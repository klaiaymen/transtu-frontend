import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LignesState, LignesStateEnum} from "../../ligne/ngrx/ligne.reducers";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent} from "@coreui/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {EditLigneAction, UpdateLigneAction} from "../../ligne/ngrx/ligne.actions";
import {StationsState, StationsStateEnum} from "../ngrx/station.reducers";
import {DeleteStationAction, EditStationAction, UpdateStationAction} from "../ngrx/station.actions";
import {StationService} from "../service/station.service";
import {ModalConfirmationComponent} from "../../modal-confirmation/modal-confirmation.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Station} from "../model/station.model";

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
submitted: boolean=false;
  constructor(private modalService: NgbModal,private stationService:StationService,private activatedRoute: ActivatedRoute, private store:Store<any>, private router:Router,private fb:FormBuilder) {
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
            latitude:[this.state.currentStation.latitude,Validators.required],
          });
          this.formBuilt=true;
        }
      }

    });
  }

  onUpdateStation() {
    this.submitted=true;
    if(this.stationFormGroup?.invalid)return
    this.store.dispatch(new UpdateStationAction(this.stationFormGroup?.value));
  }

  onDelete(stationID: number) {
    this.stationService.getStationById(stationID).subscribe(
      (station: Station) => {
        const modalRef = this.modalService.open(ModalConfirmationComponent);
        modalRef.componentInstance.confirmationMessage = "Êtes-vous sûr de vouloir supprimer cette station ?";
        modalRef.result.then(
          (result) => {
            if (result === 'confirm') {
              this.store.dispatch(new DeleteStationAction(station));
              console.log("station supprimé !");
            } else {
              console.log("Suppression annulée !");
            }
            this.modalService.dismissAll();
          },
          () => {
            console.log("Modal fermé sans confirmation");
          }
        );
      },
      (error) => {
        // Gérer les erreurs de récupération de la station
        console.error(`Erreur lors de la récupération de la station avec l'ID ${stationID} :`, error);
      }
    );

  }
}
