import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletComponent } from 'src/app/user/wallet/wallet.component';

const routes: Routes = [
  {
    path: '',
    component: WalletComponent,
    children: [
      {
        path: 'list',
        loadChildren: () => import('src/app/user/wallet/list/list.module').then(m => m.ListModule),
      },
      {
        path: 'add',
        loadChildren: () => import('src/app/user/wallet/add/add.module').then(m => m.AddModule),
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
