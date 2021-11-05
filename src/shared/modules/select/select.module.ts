import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AutoFocusModule } from '@shared/modules/auto-focus/auto-focus.module';
import { FilterModule } from '@shared/modules/filter/filter.module';
import { NoDataModule } from '@shared/modules/no-data/no-data.module';
import { OverlayModule } from '@angular/cdk/overlay';

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
    AutoFocusModule,
    NoDataModule,
    OverlayModule,
  ],
})
export class SelectModule {
}
