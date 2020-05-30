import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from 'src/app/user/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'list',
        loadChildren: () => import('src/app/user/profile/list/list.module').then(m => m.ListModule),
      },
      {
        path: 'add',
        loadChildren: () => import('src/app/user/profile/add/add.module').then(m => m.AddModule),
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
