import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {District} from "../../../model/district.model";
import {MoyenTransport} from "../../../../moyens-transport/model/moyenTransport.model";
import {DistrictService} from "../../../service/district.services";
import {MoyenTransportService} from "../../../../moyens-transport/services/moyenTransport.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {MtListComponent} from "../../../../moyens-transport/mt-list/mt-list.component";
import {MoyensTransportComponent} from "../../../../moyens-transport/moyens-transport.component";
import {
  AccordionButtonDirective,
  AccordionComponent,
  AccordionItemComponent,
  BgColorDirective, ButtonDirective, CardBodyComponent, CardComponent, ColComponent, TableDirective,
  TemplateIdDirective
} from "@coreui/angular";
import {DomSanitizer} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {DistrictItemComponent} from "../district-item.component";

@Component({
  selector: 'app-district-details',
  standalone: true,
  imports: [CommonModule, MtListComponent, MoyensTransportComponent, AccordionItemComponent, AccordionButtonDirective, AccordionComponent, BgColorDirective, TemplateIdDirective, FormsModule, ButtonDirective, CardBodyComponent, CardComponent, ColComponent, DistrictItemComponent, TableDirective],
  templateUrl: './district-details.component.html',
  styleUrl: './district-details.component.scss'
})
export class DistrictDetailsComponent implements OnInit{
  @Input() districtID: number;
  district: District|null=null;
  moyensTransport: MoyenTransport[]=[];
  allMoyensTransports: MoyenTransport[]=[]


  constructor(public activeModal: NgbActiveModal,private activatedRoute: ActivatedRoute,private sanitizer: DomSanitizer,
              private districtService: DistrictService, private moyenTransportService: MoyenTransportService) { this.districtID=activatedRoute.snapshot.params['id'];}

  ngOnInit(): void {
    this.loadDistrictDetails();
    this.loadAllMoyensTransports()
  }
  loadDistrictDetails(): void {
    this.districtService.getDistrictById(this.districtID).subscribe((district: District) => {
      this.district = district;
      this.moyensTransport = district.moyensTransport; // Supposant que votre district a une propriété moyensTransport
    });
  }

  loadAllMoyensTransports() {
    this.moyenTransportService.getMoyensTransport().subscribe(moyensTransports => {
      this.allMoyensTransports = moyensTransports.map(mt => ({
        ...mt,
        assignedToDistrict: this.isMoyenTransportAssignedToDistrict(mt, this.district)
      }));
    });
  }

  isMoyenTransportAssignedToDistrict(moyenTransport: MoyenTransport, district: District | null): boolean {
    // @ts-ignore
    return district.moyensTransport.some(mt => mt.id === moyenTransport.id);
  }

  toggleMoyenTransportAssignment(moyenTransport: MoyenTransport, district: District) {
    if (moyenTransport.assignedToDistrict) {
      // Ajouter le moyen de transport au district
      this.districtService.assignMTToDistrict(moyenTransport.id, district.id).subscribe(() => {
        moyenTransport.assignedToDistrict = true;
        district.moyensTransport.push(moyenTransport);
      });
    } else {
      // Supprimer le moyen de transport du district
      const index = district.moyensTransport.findIndex(mt => mt.id === moyenTransport.id);
      if (index !== -1) {
        this.districtService.removeMTFromDistrict(moyenTransport.id, district.id).subscribe(() => {
          moyenTransport.assignedToDistrict = false;
          district.moyensTransport.splice(index, 1);
        });
      }
    }
  }

}
