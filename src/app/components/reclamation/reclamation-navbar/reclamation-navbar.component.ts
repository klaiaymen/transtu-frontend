import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {NgbCalendar, NgbDate, NgbDatepicker, NgbInputDatepicker, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NewReclamationComponent} from "../new-reclamation/new-reclamation.component";
import {
  GetAllReclamationAction,
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
  constructor(private calendar: NgbCalendar,private reclamationService: ReclamationService,private store:Store<any>,private modalService: NgbModal) {
    this.fromDate = null;
    this.toDate =null;
  }


  onGetAllReclamations() {
    this.store.dispatch(new GetAllReclamationAction({}))
  }

 /* onNewReclamation() {
    const modalRef = this.modalService.open(NewReclamationComponent);
  }*/

  /*searchReclamations(query: string) {
    if (query.trim() !== '') {
      this.store.dispatch(new SearchReclamationAction(query));
    } else {
      this.onGetAllReclamations()
    }
  }*/
  /*searchByDateRange(): void {
    if (this.fromDate && this.toDate) {
      // Recherche par plage de dates
      this.reclamationService.searchReclamationsByDateRange(this.fromDate, this.toDate)
        .subscribe(reclamations => {
          this.reclamations=reclamations
          console.log(this.reclamations)
        });
    }
  }*/
  /*searchByDateRange(): void {
    if (this.fromDate && this.toDate) {
      // Convertir NgbDate en Date
      //const fromDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
      //const toDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
      const fromDate=this.fromDate
      const toDate=this.toDate

      this.store.dispatch(new SearchReclamationsByDateRange({ fromDate, toDate }));
    }
  }*/
  /*searchReclamationByfilters(): void {
    let searchTerms: string[] = [];

    // Vérifier si une plage de dates est sélectionnée
    /!*if (this.fromDate && this.toDate) {
      // Ajouter la plage de dates à la recherche
      const fromDateStr = `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`;
      const toDateStr = `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`;
      searchTerms.push(fromDateStr,toDateStr);
    }*!/

    // Vérifier si un type d'accident/incident est sélectionné
    if (this.selectedTypeAccidentIncident) {
      // Ajouter le type d'accident/incident à la recherche
      searchTerms.push(this.selectedTypeAccidentIncident);
    }

    // Vérifier si un type de dégât est sélectionné
    if (this.selectedTypeDegat) {
      // Ajouter le type de dégât à la recherche
      searchTerms.push(this.selectedTypeDegat);
    }

    // Construire la chaîne de recherche en concaténant les termes avec des '&'
    this.searchQuery = searchTerms.join('');

    // Exécuter la recherche
    this.searchReclamations(this.searchQuery);
  }
*/

  /*searchReclamationsGlobal() {
    if (this.fromDate && this.toDate) {
      this.reclamationService.searchReclamationsGlobal(this.searchQuery,this.fromDate, this.toDate, this.selectedTypeAccidentIncident, this.selectedTypeDegat).subscribe(
        (reclamations) => {
          console.log(reclamations)
        },
        (error) => {
          console.error('Erreur lors de la récupération des réclamations :', error);
        }
      );
    } else {
      console.error('Veuillez saisir toutes les informations nécessaires.');
    }
  }*/
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
}
