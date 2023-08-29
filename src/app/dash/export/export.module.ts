import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FiltersModule } from '@shared/modules/filters/filters.module';

import { ExportRoutingModule } from './export-routing.module';
import { ExportComponent } from './export.component';
import {MatInputModule} from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';


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
    MatInputModule,
    MatButtonModule,
  ],
})
export class ExportModule {
}
