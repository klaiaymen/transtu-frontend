import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AccordionButtonDirective,
  AccordionComponent,
  AccordionItemComponent,
  CardBodyComponent,
  CardComponent, ColComponent, TableDirective, TemplateIdDirective
} from "@coreui/angular";
import {FormsModule} from "@angular/forms";
import {MoyenTransport} from "../../../../moyens-transport/model/moyenTransport.model";
import {Ligne} from "../../../model/ligne.model";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {MoyenTransportService} from "../../../../moyens-transport/services/moyenTransport.service";
import {LigneService} from "../../../service/ligne.service";

@Component({
  selector: 'app-ligne-details',
  standalone: true,
  imports: [CommonModule, AccordionButtonDirective, AccordionComponent, AccordionItemComponent, CardBodyComponent, CardComponent, ColComponent, FormsModule, TableDirective, TemplateIdDirective],
  templateUrl: './ligne-details.component.html',
  styleUrl: './ligne-details.component.scss'
})
export class LigneDetailsComponent implements OnInit{
  @Input() ligneID: number;
  ligne: Ligne|null=null;
  moyenTransport: MoyenTransport|null=null;
  allMoyensTransports: MoyenTransport[]=[]

  constructor(public activeModal: NgbActiveModal,private activatedRoute: ActivatedRoute,private sanitizer: DomSanitizer,
    private modalService: NgbModal, private ligneService: LigneService, private moyenTransportService: MoyenTransportService) {
      this.ligneID=activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadLigneDetails();
    this.loadAllMoyensTransports();
  }

  loadLigneDetails(): void {
    this.ligneService.getLigneById(this.ligneID).subscribe((ligne: Ligne) => {
      this.ligne = ligne;
      this.moyenTransport = ligne.moyenTransport; // Supposant que votre ligne a une propriété moyensTransport
    });
  }

  loadAllMoyensTransports() {
    this.moyenTransportService.getMoyensTransport().subscribe(moyensTransports => {
      this.allMoyensTransports = moyensTransports.map(mt => ({
        ...mt,
        assignedToLigne: this.isMoyenTransportAssignedToLigne(mt, this.ligne),
        disabled: (this.ligne && this.ligne.moyenTransport && this.ligne.moyenTransport.id !== mt.id) || false
      }));
    });
  }

  isMoyenTransportAssignedToLigne(moyenTransport: MoyenTransport, ligne: Ligne | null): boolean {
    return ligne?.moyenTransport?.id === moyenTransport.id;
  }

  toggleMoyenTransportAssignment(moyenTransport: MoyenTransport, ligne: Ligne) {
    this.allMoyensTransports.forEach(mt => {
      if (mt.id !== moyenTransport.id) {
        mt.disabled = true;
      }
    });

    if (moyenTransport.assignedToLigne) {
      this.ligneService.assignMTToLigne(moyenTransport.id, ligne.id).subscribe(() => {
        moyenTransport.assignedToLigne = true;
        ligne.moyenTransport = moyenTransport;
      });
    } else {
      // Activer tous les autres moyens de transport
      this.allMoyensTransports.forEach(mt => {
        mt.disabled = false;
      });
      const index = ligne.moyenTransport ? 0 : -1;
      if (index !== -1) {
        // @ts-ignore
        this.ligneService.removeMTFromLigne(ligne.moyenTransport.id, ligne.id).subscribe(() => {
          ligne.moyenTransport = null;
        });
      }
    }
  }


}

