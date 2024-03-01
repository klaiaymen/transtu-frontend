import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {BrowserModule, Title} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';

import {
  AlertModule,
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import {MoyensTransportComponent} from "./components/moyens-transport/moyens-transport.component";
import {EffectsModule} from "@ngrx/effects";
import {MoyensTransportEffects} from "./components/moyens-transport/ngrx/moyensTransport.effects";
import {StoreModule} from "@ngrx/store";
import {moyensTransportReducer} from "./components/moyens-transport/ngrx/moyensTransport.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  EditMoyenTransportComponent
} from "./components/moyens-transport/edit-moyen-transport/edit-moyen-transport.component";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {districtReducers} from "./components/district/ngrx/district.reducers";
import {DistrictEffects} from "./components/district/ngrx/district.effects";
import {ligneReducers} from "./components/ligne/ngrx/ligne.reducers";
import {LigneEffects} from "./components/ligne/ngrx/ligne.effects";
import {StationReducers} from "./components/station/ngrx/station.reducers";
import {StationEffects} from "./components/station/ngrx/station.effects";
import {itineraireReducers} from "./components/itineraire/ngrx/itineraire.reducers";
import {ItineraireEffects} from "./components/itineraire/ngrx/itineraire.effects";
import {PointReducers} from "./components/point/ngrx/point.reducers";
import {PointEffects} from "./components/point/ngrx/point.effects";
import {DxMapModule, DxSelectBoxModule} from "devextreme-angular";
import {MapsComponent} from "./components/maps/maps.component";
import {reclamationReducers} from "./components/reclamation/ngrx/reclamation.reducers";
import {ReclamationEffects} from "./components/reclamation/ngrx/reclamation.effects";

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
    DxMapModule,
    DxSelectBoxModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    MoyensTransportComponent,
    EffectsModule.forRoot([MoyensTransportEffects,DistrictEffects,LigneEffects,StationEffects,ItineraireEffects,PointEffects,ReclamationEffects]),
    StoreModule.forRoot({catalogState: moyensTransportReducer,districtState: districtReducers,lineState:ligneReducers,stationState: StationReducers,itineraireState: itineraireReducers, pointState:PointReducers, reclamationState:reclamationReducers}),
    StoreDevtoolsModule.instrument(),
    HttpClientModule,
    AlertModule,
    NgbModule,
    MatAutocompleteModule,
    MatInputModule,
    EditMoyenTransportComponent,
    //BrowserTransferStateModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
