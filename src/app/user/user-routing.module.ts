import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'join',
        loadChildren: () => import('./sign-up/join.module').then(m => m.JoinModule),
      },
      {
        path: 'sign-in',
        loadChildren: () => import('./sign-in/login.module').then(m => m.LoginModule),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'profile',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
}
