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
import {MapsComponent} from "./components/maps/maps.component";
import {ReclamationComponent} from "./components/reclamation/reclamation.component";
import {NewReclamationComponent} from "./components/reclamation/new-reclamation/new-reclamation.component";
import {EditReclamationComponent} from "./components/reclamation/edit-reclamation/edit-reclamation.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {EditItineraireComponent} from "./components/itineraire/edit-itineraire/edit-itineraire.component";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {UserComponent} from "./components/user/user.component";
import {NewUserComponent} from "./components/user/new-user/new-user.component";
import {EditUserComponent} from "./components/user/edit-user/edit-user.component";
import {RoleComponent} from "./components/role/role.component";
import {NewRoleComponent} from "./components/role/new-role/new-role.component";
import {UserProfileComponent} from "./components/user/user-profile/user-profile.component";
import {ChartsComponent} from "./components/charts/charts.component";
import {Page403Component} from "./views/pages/page403/page403.component";


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'notAuthorized',
    component: Page403Component
  },
  {
    path: 'page500',
    component: Page500Component
  },{
    path: 'page404',
    component: Page404Component
  },
  {path:"login" , component:LoginComponent},
  {path:"" , redirectTo:"/login",pathMatch:"full"},
  /*{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },*/
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'dashboard',
        component: MapsComponent,
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'reclamation',
        component: ReclamationComponent,
      },
        //mt routings
      {
        path: 'gestionMT',
        component: MoyensTransportComponent
      },
      {
        path: 'newMoyenTransport',
        component: NewMoyenTransportComponent,canActivate: [AuthorizationGuard], data: {role: "ADMIN"}
      },
      {
        path: 'editMoyenTransport/:id',
        component: EditMoyenTransportComponent,canActivate: [AuthorizationGuard], data: {role: "ADMIN"}
      },
        //districts routings
      {
        path: 'gestionDistrict',
        component: DistrictComponent
      },
      {
        path: 'newDistrict',
        component: NewDistrictComponent,canActivate: [AuthorizationGuard], data: {role: "ADMIN"}
      },
      {
        path: 'editDistrict/:id',
        component: EditDistrictComponent,canActivate: [AuthorizationGuard], data: {role: "ADMIN"}
      },
      //lignes routings
      {
        path: 'gestionLigne',
        component: LigneComponent
      },
      {
        path: 'newLigne',
        component: NewLigneComponent,canActivate: [AuthorizationGuard], data: {role: "ADMIN"}
      },
      {
        path: 'editLigne/:id',
        component: EditLigneComponent,canActivate: [AuthorizationGuard], data: {role: "ADMIN"}
      },
      //stations routings
      {
        path: 'gestionStation',
        component: StationComponent
      },
      {
        path: 'newStation',
        component: NewStationComponent,canActivate: [AuthorizationGuard], data: {role: "ADMIN"}
      },
      {
        path: 'editStation/:id',
        component: EditStationComponent,canActivate: [AuthorizationGuard], data: {role: "ADMIN"}
      },
      //points routings
      {
        path: 'gestionPoint',
        component: PointComponent
      },
      {
        path: 'newPoint',
        component: NewPointComponent,canActivate: [AuthorizationGuard], data: {role: "ADMIN"}
      },
      {
        path: 'editPoint/:id',
        component: EditPointComponent,canActivate: [AuthorizationGuard], data: {role: "ADMIN"}
      },
      //itineraires routings
      {
        path: 'gestionItineraire',
        component: ItineraireComponent
      },
      {
        path: 'newItineraire',
        component: NewItineraireComponent,canActivate: [AuthorizationGuard], data: {role: "ADMIN"}
      },
      {
        path: 'editItineraire',
        component: EditItineraireComponent,canActivate: [AuthorizationGuard], data: {role: "ADMIN"}
      },
      //reclamations routings
      {
        path: 'newReclamation',
        component: NewReclamationComponent
      },
      {
        path: 'editReclamation/:id',
        component: EditReclamationComponent
      },
      //user routings
      {
        path: 'profile',
        component: UserProfileComponent
      },
      {
        path: 'gestionUser',
        component: UserComponent
      },
      {
        path: 'newUser',
        component: NewUserComponent,canActivate: [AuthorizationGuard], data: {role: "ADMIN"}
      },
      {
        path: 'editUser',
        component: EditUserComponent,canActivate: [AuthorizationGuard], data: {role: "ADMIN"}
      },
      //role routings
      {
        path: 'gestionRole',
        component: RoleComponent
      },
      {
        path: 'newUser',
        component: NewRoleComponent,canActivate: [AuthorizationGuard], data: {role: "ADMIN"}
      },
      {
        path: 'charts',
        component: ChartsComponent
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
    path: 'loginCoreUi',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'registerCoreUi',
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
