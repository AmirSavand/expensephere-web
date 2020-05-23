import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddRoutingModule } from './add-routing.module';
import { AddComponent } from './add.component';

@NgModule({
  declarations: [
    AddComponent,
  ],
  imports: [
    CommonModule,
    AddRoutingModule,
  ],
})
export class AddModule {
}
