import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BulkAddRoutingModule } from './bulk-add-routing.module';
import { BulkAddComponent } from './bulk-add.component';

@NgModule({
  declarations: [
    BulkAddComponent,
  ],
  imports: [
    CommonModule,
    BulkAddRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class BulkAddModule {
}
