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
        path: 'bulk-add',
        loadChildren: () => import('./bulk-add/bulk-add.module').then(m => m.BulkAddModule),
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
export class TransactionRoutingModule {
}
