import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AccordionButtonDirective,
    AccordionComponent,
    AccordionItemComponent,
    CardBodyComponent,
    CardComponent, ColComponent, TableDirective, TemplateIdDirective
} from "@coreui/angular";
import {ReactiveFormsModule} from "@angular/forms";

import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

import {ReclamationService} from "../../../service/reclamation.service";
import {Reclamation} from "../../../model/reclamation.model";

@Component({
  selector: 'app-reclamation-details',
  standalone: true,
    imports: [CommonModule, AccordionButtonDirective, AccordionComponent, AccordionItemComponent, CardBodyComponent, CardComponent, ColComponent, ReactiveFormsModule, TableDirective, TemplateIdDirective],
  templateUrl: './reclamation-details.component.html',
  styleUrl: './reclamation-details.component.scss'
})
export class ReclamationDetailsComponent {
  @Input() reclamationID: number;
  reclamation: Reclamation|null=null;

  constructor(public activeModal: NgbActiveModal,private activatedRoute: ActivatedRoute,private sanitizer: DomSanitizer,private modalService: NgbModal, private reclamationService: ReclamationService) {
    this.reclamationID=activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadReclamationDetails();
  }

  loadReclamationDetails(): void {
    this.reclamationService.getReclamationById(this.reclamationID).subscribe((reclamation: Reclamation) => {
      this.reclamation = reclamation;
    });
  }

}
