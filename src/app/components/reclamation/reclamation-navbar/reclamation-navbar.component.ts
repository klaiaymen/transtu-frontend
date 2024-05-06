import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {
  NgbCalendar,
  NgbDate,
  NgbDatepicker,
  NgbDateStruct,
  NgbInputDatepicker,
  NgbModal
} from "@ng-bootstrap/ng-bootstrap";
import {NewReclamationComponent} from "../new-reclamation/new-reclamation.component";
import {
  GetAllReclamationAction, GetReclamationByUserAction,
  SearchReclamationAction, SearchReclamations, SearchReclamationsGlobal,
} from "../ngrx/reclamation.actions";
import {ReclamationService} from "../service/reclamation.service";
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {
  ButtonDirective,
  ColComponent,
  DropdownCloseDirective,
  DropdownComponent,
  DropdownDividerDirective, DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective, DropdownToggleDirective,
  FormCheckComponent,
  FormDirective,
  FormFeedbackComponent,
  GutterDirective,
  RowComponent
} from "@coreui/angular";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Reclamation} from "../model/reclamation.model";
import {AuthService} from "../../authService/auth.service";
import {UserService} from "../../user/services/user.service";

@Component({
  selector: 'app-reclamation-navbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ColComponent, FormFeedbackComponent, FormCheckComponent, GutterDirective, FormDirective, RowComponent, DropdownCloseDirective, NgbInputDatepicker, NgbDatepicker, DropdownComponent, ButtonDirective, DropdownDividerDirective, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, DropdownHeaderDirective],
  templateUrl: './reclamation-navbar.component.html',
  styleUrl: './reclamation-navbar.component.scss'
})
export class ReclamationNavbarComponent {
  searchQuery: string='';
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  selectedTypeAccidentIncident: string = '';
  selectedTypeDegat: string = '';
  reclamations: Reclamation[]=[]
  constructor(private userService:UserService,private authService:AuthService,private calendar: NgbCalendar,private reclamationService: ReclamationService,private store:Store<any>,private modalService: NgbModal) {
    this.fromDate = null;
    this.toDate =null;
  }


  onGetAllReclamations() {
    this.userService.getUserByUsername(this.authService.username).subscribe(
      (response:any)=>{
        if(this.authService.roles.includes('ADMIN')){
          this.store.dispatch(new GetAllReclamationAction({}))
        }else{
          this.store.dispatch(new GetReclamationByUserAction(response.userId))
        }
      }
    )
  }


  searchReclamationsGlobal() {
    if (this.fromDate && this.toDate) {
      this.store.dispatch(new SearchReclamationsGlobal({
        query: this.searchQuery,
        fromDate: this.fromDate,
        toDate: this.toDate,
        typeAccidentIncident: this.selectedTypeAccidentIncident,
        typeDegat: this.selectedTypeDegat
      }));
    } else {
      //recherche les reclamations par types et search input
      this.store.dispatch(new SearchReclamations({
        query: this.searchQuery,
        typeAccidentIncident: this.selectedTypeAccidentIncident,
        typeDegat: this.selectedTypeDegat
      }))
      //console.error('Veuillez saisir toutes les informations nécessaires.');

    }
  }


  generateReport(format: string): void {
    if(this.fromDate != null && this.toDate != null){

      this.reclamationService.generateReport(format, this.searchQuery,this.fromDate,this.toDate,this.selectedTypeAccidentIncident,this.selectedTypeDegat).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error('An error occurred:', error);
        }
      );

    }else{
      this.reclamationService.generateReportWithoutDate(format, this.searchQuery,this.selectedTypeAccidentIncident,this.selectedTypeDegat).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
    }

  }


  // Fonction pour obtenir la date minimale autorisée pour la date de début
  minFromDate(): NgbDateStruct  {
    const currentDate = new Date('01-01-1970');
    if (this.fromDate === null) {
      // Si aucune date de début n'a été sélectionnée, retourne la date actuelle
      return { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() };
    } else {
      // Sinon, retourne la date de début sélectionnée
      return { year: this.fromDate.year, month: this.fromDate.month, day: this.fromDate.day };
    }
  }
}
