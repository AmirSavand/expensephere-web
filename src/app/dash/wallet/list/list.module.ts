import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListRoutingModule } from '@app/dash/wallet/list/list-routing.module';
import { ListComponent } from '@app/dash/wallet/list/list.component';

@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
  ],
})
export class ListModule {
}
