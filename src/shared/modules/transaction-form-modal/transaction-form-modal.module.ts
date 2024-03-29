import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryFormModalModule } from '@shared/modules/category-form-modal/category-form-modal.module';
import { SelectModule } from '@shared/modules/select/select.module';
import { TagFormModalModule } from '@shared/modules/tag-form-modal/tag-form-modal.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TransactionFormModalComponent } from './transaction-form-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CollapseModule,
    SelectModule,
    CategoryFormModalModule,
    TagFormModalModule,
  ],
  declarations: [
    TransactionFormModalComponent,
  ],
})
export class TransactionFormModalModule {
}
