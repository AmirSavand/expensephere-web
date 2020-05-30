import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashComponent } from './dash.component';

const routes: Routes = [
  {
    path: '',
    component: DashComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashRoutingModule {
}
