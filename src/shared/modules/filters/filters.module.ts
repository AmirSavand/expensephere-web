import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModelDebounceModule } from '@shared/modules/model-debounce/model-debounce.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SelectModule } from '@shared/modules/select/select.module';
import { FiltersComponent } from './filters.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



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
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    FiltersComponent,
  ],
})
export class FiltersModule { }
