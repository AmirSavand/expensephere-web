import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModelDebounceModule } from '@shared/modules/model-debounce/model-debounce.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SelectModule } from '@shared/modules/select/select.module';
import { FiltersComponent } from './filters.component';



@NgModule({
  declarations: [FiltersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModelDebounceModule,
    SelectModule,
    FontAwesomeModule,
    CollapseModule,
  ],
  exports: [
    FiltersComponent,
  ],
})
export class FiltersModule { }
