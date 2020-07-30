import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { TransactionListModule } from '@shared/modules/transaction-list/transaction-list.module';
import { WalletListModule } from '@shared/modules/wallet-list/wallet-list.module';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';


@NgModule({
  declarations: [
    DetailComponent,
  ],
  imports: [
    CommonModule,
    DetailRoutingModule,
    WalletListModule,
    ProfileCurrencyModule,
    TransactionListModule,
  ],
})
export class DetailModule {
}
