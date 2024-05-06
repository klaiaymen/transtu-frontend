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
import {PhotoReclamation, Reclamation} from "../../../model/reclamation.model";
import {DxTextAreaModule} from "devextreme-angular";
import {AppUser} from "../../../../user/model/user.model";
import {AuthService} from "../../../../authService/auth.service";
import {MoyenTransport} from "../../../../moyens-transport/model/moyenTransport.model";
import {District} from "../../../../district/model/district.model";

@Component({
  selector: 'app-reclamation-details',
  standalone: true,
  imports: [CommonModule, AccordionButtonDirective, AccordionComponent, AccordionItemComponent, CardBodyComponent, CardComponent, ColComponent, ReactiveFormsModule, TableDirective, TemplateIdDirective, DxTextAreaModule],
  templateUrl: './reclamation-details.component.html',
  styleUrl: './reclamation-details.component.scss'
})
export class ReclamationDetailsComponent {
  @Input() reclamationID: number;
  reclamation: Reclamation|null=null;
  reclamationPhotos:PhotoReclamation[] | undefined=[]
  username?: string;
  moyenTransportAsigned?: string;
  districtAsigned?: string;
  constructor(public authService:AuthService,public activeModal: NgbActiveModal,private activatedRoute: ActivatedRoute,private sanitizer: DomSanitizer,private modalService: NgbModal, private reclamationService: ReclamationService) {
    this.reclamationID=activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadReclamationDetails();
  }

  loadReclamationDetails(): void {
    this.reclamationService.getReclamationById(this.reclamationID).subscribe((reclamation: Reclamation) => {
      this.reclamation = reclamation;
      this.reclamationPhotos=reclamation.photos;
      this.username=this.authService.username;
      this.authService.loadUserByUsername(this.username).subscribe(
        (response:any)=>{
          this.moyenTransportAsigned=response.moyenTransport.code;
          this.districtAsigned=response.moyenTransport.district.label;
          //console.log('mt dist asigned', this.moyenTransportAsigned,this.districtAsigned)
        }
      )
    });
  }

}
