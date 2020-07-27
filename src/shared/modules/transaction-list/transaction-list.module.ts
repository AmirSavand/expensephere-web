import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { TransactionListComponent } from './transaction-list.component';


@NgModule({
  declarations: [TransactionListComponent],
  imports: [
    CommonModule,
    ProfileCurrencyModule,
    FontAwesomeModule,
    RouterModule,
  ],
  exports: [
    TransactionListComponent,
  ],
})
export class TransactionListModule {
}
