import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';


@NgModule({
  declarations: [
    TransactionComponent,
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
  ],
})
export class TransactionModule {
}
