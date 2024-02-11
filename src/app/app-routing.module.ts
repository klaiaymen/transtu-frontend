import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import {MoyensTransportComponent} from "./components/moyens-transport/moyens-transport.component";
import {
  NewMoyenTransportComponent
} from "./components/moyens-transport/new-moyen-transport/new-moyen-transport.component";
import {
  EditMoyenTransportComponent
} from "./components/moyens-transport/edit-moyen-transport/edit-moyen-transport.component";
import {DistrictComponent} from "./components/district/district.component";
import {NewDistrictComponent} from "./components/district/new-district/new-district.component";
import {EditDistrictComponent} from "./components/district/edit-district/edit-district.component";
import {LigneComponent} from "./components/ligne/ligne.component";
import {NewLigneComponent} from "./components/ligne/new-ligne/new-ligne.component";
import {EditLigneComponent} from "./components/ligne/edit-ligne/edit-ligne.component";
import {StationComponent} from "./components/station/station.component";
import {NewStationComponent} from "./components/station/new-station/new-station.component";
import {EditStationComponent} from "./components/station/edit-station/edit-station.component";
import {ItineraireComponent} from "./components/itineraire/itineraire.component";
import {NewItineraireComponent} from "./components/itineraire/new-itineraire/new-itineraire.component";
import {PointComponent} from "./components/point/point.component";
import {NewPointComponent} from "./components/point/new-point/new-point.component";
import {EditPointComponent} from "./components/point/edit-point/edit-point.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
        //mt routings
      {
        path: 'gestionMT',
        component: MoyensTransportComponent
      },
      {
        path: 'newMoyenTransport',
        component: NewMoyenTransportComponent
      },
      {
        path: 'editMoyenTransport/:id',
        component: EditMoyenTransportComponent
      },
        //districts routings
      {
        path: 'gestionDistrict',
        component: DistrictComponent
      },
      {
        path: 'newDistrict',
        component: NewDistrictComponent
      },
      {
        path: 'editDistrict/:id',
        component: EditDistrictComponent
      },
      //lignes routings
      {
        path: 'gestionLigne',
        component: LigneComponent
      },
      {
        path: 'newLigne',
        component: NewLigneComponent
      },
      {
        path: 'editLigne/:id',
        component: EditLigneComponent
      },
      //stations routings
      {
        path: 'gestionStation',
        component: StationComponent
      },
      {
        path: 'newStation',
        component: NewStationComponent
      },
      {
        path: 'editStation/:id',
        component: EditStationComponent
      },
      //points routings
      {
        path: 'gestionPoint',
        component: PointComponent
      },
      {
        path: 'newPoint',
        component: NewPointComponent
      },
      {
        path: 'editPoint/:id',
        component: EditPointComponent
      },
      //itineraires routings
      {
        path: 'gestionItineraire',
        component: ItineraireComponent
      },
      {
        path: 'newItineraire',
        component: NewItineraireComponent
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
