import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletComponent } from '@app/dash/wallet/wallet.component';

const routes: Routes = [
  {
    path: '',
    component: WalletComponent,
    children: [
      {
        path: 'list',
        loadChildren: () => import('@app/dash/wallet/list/list.module').then(m => m.ListModule),
      },
      {
        path: 'add',
        loadChildren: () => import('@app/dash/wallet/add/add.module').then(m => m.AddModule),
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
