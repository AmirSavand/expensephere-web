import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GeneralErrorComponent } from './general-error.component';

@NgModule({
  declarations: [
    GeneralErrorComponent,
  ],
  exports: [
    GeneralErrorComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class GeneralErrorModule {
}
