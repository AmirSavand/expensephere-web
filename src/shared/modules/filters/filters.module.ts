import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModelDebounceModule } from '@shared/modules/model-debounce/model-debounce.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SelectModule } from '@shared/modules/select/select.module';
import { FiltersComponent } from './filters.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



@NgModule({
  declarations: [FiltersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModelDebounceModule,
    SelectModule,
    FontAwesomeModule,
    CollapseModule,
    MatSlideToggleModule,
  ],
  exports: [
    FiltersComponent,
  ],
})
export class FiltersModule { }
