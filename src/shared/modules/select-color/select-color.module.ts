import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SelectColorComponent } from './select-color.component';

@NgModule({
  declarations: [
    SelectColorComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    SelectColorComponent,
  ],
})
export class SelectColorModule {
}
