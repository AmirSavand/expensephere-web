import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BulkAddRoutingModule } from './bulk-add-routing.module';
import { BulkAddComponent } from './bulk-add.component';
import {MatButtonModule} from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    BulkAddComponent,
  ],
  imports: [
    CommonModule,
    BulkAddRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
  ],
})
export class BulkAddModule {
}
