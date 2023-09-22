import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FiltersModule } from '@shared/modules/filters/filters.module';

import { ExportRoutingModule } from './export-routing.module';
import { ExportComponent } from './export.component';
import {MatCardModule} from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ExportComponent,
  ],
  imports: [
    CommonModule,
    ExportRoutingModule,
    FiltersModule,
    FontAwesomeModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ExportModule {
}
