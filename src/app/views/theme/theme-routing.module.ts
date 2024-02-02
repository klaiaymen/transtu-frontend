import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'gestionParams',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'gestionMT',
      },{
        path: 'gestionMT',
        //component: ,
        data: {
          title: 'Gestion des moyens de transport',
        },
      },

      {
        path: 'districts',
        component: ColorsComponent,
        data: {
          title: 'Districts',
        },
      },
      /*{
        path: 'typography',
        component: TypographyComponent,
        data: {
          title: 'Typography',
        },
      },*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeRoutingModule {}
