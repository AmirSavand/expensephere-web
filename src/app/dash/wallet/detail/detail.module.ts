import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { NoDataModule } from '@shared/modules/no-data/no-data.module';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { TransactionListModule } from '@shared/modules/transaction-list/transaction-list.module';
import { WalletListModule } from '@shared/modules/wallet-list/wallet-list.module';
import { NotFoundModule } from '@/shared/modules/not-found/not-found.module';

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
    NoDataModule,
    LoadingModule,
    NotFoundModule,
  ],
})
export class DetailModule {
}
