import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { TransactionFormModalComponent } from './transaction-form-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CollapseModule,
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