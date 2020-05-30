import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from 'src/app/user/wallet/list/list.component';

const routes: Routes = [{ path: '', component: ListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRoutingModule {
}
