import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { JoinRoutingModule } from './join-routing.module';
import { JoinComponent } from './join.component';

@NgModule({
  declarations: [
    JoinComponent,
  ],
  imports: [
    CommonModule,
    JoinRoutingModule,
    ReactiveFormsModule,
  ],
})
export class JoinModule {
}
