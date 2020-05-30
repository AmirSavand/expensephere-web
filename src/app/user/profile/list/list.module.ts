import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListRoutingModule } from 'src/app/user/profile/list/list-routing.module';
import { ListComponent } from 'src/app/user/profile/list/list.component';

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
