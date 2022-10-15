import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectColorModule } from '@shared/modules/select-color/select-color.module';
import { SelectModule } from '@shared/modules/select/select.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CategoryFormModalComponent } from './category-form-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SelectColorModule,
    ButtonsModule,
    SelectModule,
  ],
  declarations: [
    CategoryFormModalComponent,
  ],
})
export class CategoryFormModalModule {
}
