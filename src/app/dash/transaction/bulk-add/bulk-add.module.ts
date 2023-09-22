import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BulkAddRoutingModule } from './bulk-add-routing.module';
import { BulkAddComponent } from './bulk-add.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    BulkAddComponent,
  ],
  imports: [
    CommonModule,
    BulkAddRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class BulkAddModule {
}
