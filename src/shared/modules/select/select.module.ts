import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterModule } from '@shared/modules/filter/filter.module';

import { SelectComponent } from './select.component';

@NgModule({
  declarations: [
    SelectComponent,
  ],
  exports: [
    SelectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FilterModule,
    FontAwesomeModule,
  ],
})
export class SelectModule {
}
