import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModelDebounceModule } from '@shared/modules/model-debounce/model-debounce.module';
import { FiltersComponent } from './filters.component';



@NgModule({
  declarations: [FiltersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModelDebounceModule,
  ],
  exports: [
    FiltersComponent,
  ],
})
export class FiltersModule { }
