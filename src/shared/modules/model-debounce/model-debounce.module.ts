import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModelDebounceDirective } from './model-debounce.directive';

@NgModule({
  declarations: [
    ModelDebounceDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ModelDebounceDirective,
  ],
})
export class ModelDebounceModule {
}
