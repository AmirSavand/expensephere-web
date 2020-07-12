import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from '@app/dash/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'list',
        loadChildren: () => import('@app/dash/profile/list/list.module').then(m => m.ListModule),
      },
      {
        path: 'add',
        loadChildren: () => import('@app/dash/profile/add/add.module').then(m => m.AddModule),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {
}
