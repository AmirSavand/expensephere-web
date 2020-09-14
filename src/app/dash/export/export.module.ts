import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActionsModule } from 'src/shared/modules/actions/actions.module';
import { FiltersModule } from 'src/shared/modules/filters/filters.module';

import { ExportRoutingModule } from './export-routing.module';
import { ExportComponent } from './export.component';


@NgModule({
  declarations: [
    ExportComponent,
  ],
  imports: [
    CommonModule,
    ExportRoutingModule,
    FiltersModule,
    ActionsModule,
    FontAwesomeModule,
    FormsModule,
  ],
})
export class ExportModule {
}
