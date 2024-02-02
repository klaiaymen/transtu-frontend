import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalToggleDirective
} from "@coreui/angular";

@Component({
  selector: 'app-edit-moyen-transport',
  standalone: true,
  imports: [CommonModule, ModalComponent, ModalHeaderComponent, ModalToggleDirective, ModalBodyComponent, ModalFooterComponent],
  templateUrl: './edit-moyen-transport.component.html',
  styleUrl: './edit-moyen-transport.component.scss'
})
export class EditMoyenTransportComponent {

}
