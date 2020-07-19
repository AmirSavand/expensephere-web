import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectModule } from '@shared/modules/select/select.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { TransactionFormModalComponent } from './transaction-form-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CollapseModule,
    SelectModule,
  ],
  declarations: [
    TransactionFormModalComponent,
  ],
  entryComponents: [
    TransactionFormModalComponent,
  ],
})
export class TransactionFormModalModule {
}
