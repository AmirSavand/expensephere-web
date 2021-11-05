import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '', component: PublicComponent,
    children: [
      {
        path: 'transaction/:id',
        loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule),
      },
      {
        path: 'invoice/:id',
        loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {
}
