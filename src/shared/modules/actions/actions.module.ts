import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ActionsComponent } from './actions.component';

@NgModule({
  declarations: [
    ActionsComponent,
  ],
  imports: [
    CommonModule,
    BsDropdownModule,
  ],
  exports: [
    ActionsComponent,
  ],
})
export class ActionsModule {
}
