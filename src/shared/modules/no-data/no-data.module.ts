import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NoDataComponent } from './no-data.component';

@NgModule({
  declarations: [
    NoDataComponent,
  ],
  exports: [
    NoDataComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class NoDataModule {
}
