import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletComponent } from './wallet.component';

const routes: Routes = [
  {
    path: '',
    component: WalletComponent,
    children: [
      {
        path: 'list',
        loadChildren: () => import('./list/list.module').then(m => m.ListModule),
      },
      {
        path: ':id',
        loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule),
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
export class WalletRoutingModule {
}
