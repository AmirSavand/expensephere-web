import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionComponent } from './transaction.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionComponent,
    children: [
      {
        path: 'list',
        loadChildren: () => import('./list/list.module').then(m => m.ListModule),
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
export class TransactionRoutingModule {
}
