import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryFormModalComponent } from 'src/shared/modules/category-form-modal/category-form-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CategoryFormModalComponent,
  ],
  entryComponents: [
    CategoryFormModalComponent,
  ],
})
export class CategoryFormModalModule { }
