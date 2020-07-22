import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { TransactionListComponent } from './transaction-list.component';



@NgModule({
  declarations: [TransactionListComponent],
  imports: [
    CommonModule,
    ProfileCurrencyModule,
  ],
  exports: [
    TransactionListComponent,
  ],
})
export class TransactionListModule { }
