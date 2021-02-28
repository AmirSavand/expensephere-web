import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BulkAddComponent } from './bulk-add.component';

const routes: Routes = [
  {
    path: '',
    component: BulkAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BulkAddRoutingModule {
}
