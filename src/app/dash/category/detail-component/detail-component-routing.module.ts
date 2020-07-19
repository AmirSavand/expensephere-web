import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailComponentComponent } from './detail-component.component';

const routes: Routes = [
  {
    path: '',
    component: DetailComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailComponentRoutingModule {
}
