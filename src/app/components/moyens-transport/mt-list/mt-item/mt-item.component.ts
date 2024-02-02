import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MoyenTransport} from "../../../../model/moyenTransport.model";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {DeleteMTtAction} from "../../../../ngrx/moyensTransport.actions";

@Component({
  selector: 'app-mt-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mt-item.component.html',
  styleUrl: './mt-item.component.scss'
})
export class MtItemComponent implements  OnInit{
  @Input() moyenTransport: MoyenTransport|null=null;

  ngOnInit(): void {
  }
constructor(private store:Store, private router:Router) {
}
    onDelete(moyenTransport:MoyenTransport) {
      const isConfirmed = confirm("Êtes-vous sûr de vouloir supprimer ce moyen de transport ?");
      if (isConfirmed) {
        this.store.dispatch(new DeleteMTtAction(moyenTransport))
        console.log("moyen transport supprimé !");
      }
    }

  onEdit(moyenTransport: MoyenTransport) {
    this.router.navigateByUrl('/editMoyenTransport/'+moyenTransport.id)
  }

}
