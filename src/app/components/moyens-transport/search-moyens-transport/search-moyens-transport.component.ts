import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, Observable, startWith, switchMap, tap} from "rxjs";
import {MoyenTransportService} from "../services/moyenTransport.service";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-search-moyens-transport',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './search-moyens-transport.component.html',
  styleUrl: './search-district.component.scss'
})
export class SearchMoyensTransportComponent {
  searchControl = new FormControl();
  searchResults: any[] = [];

  constructor(private moyenTransportService: MoyenTransportService) {
    /*this.searchControl.valueChanges
      .pipe(
        tap((keyword) => console.log('Search query:', keyword)),
        switchMap((keyword) => this.moyenTransportService.searchMoyensTransport(keyword))
      )
      .subscribe(
        (results) => {
          console.log('Received data:', results);
          this.searchResults = results;
        },
        (error) => {
          console.error('Error fetching items:', error);
        }
      );*/
  }
}
