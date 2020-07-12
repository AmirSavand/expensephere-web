import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AddRoutingModule } from '@app/dash/profile/add/add-routing.module';
import { AddComponent } from '@app/dash/profile/add/add.component';

@NgModule({
  declarations: [
    AddComponent,
  ],
  imports: [
    CommonModule,
    AddRoutingModule,
    ReactiveFormsModule,
  ],
})
export class AddModule {
}
