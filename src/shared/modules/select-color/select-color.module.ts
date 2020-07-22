import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SelectColorComponent } from './select-color.component';

@NgModule({
  declarations: [
    SelectColorComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SelectColorComponent,
  ],
})
export class SelectColorModule {
}
