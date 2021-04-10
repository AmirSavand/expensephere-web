import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryFormModalModule } from '@shared/modules/category-form-modal/category-form-modal.module';
import { CategoryListModule } from '@shared/modules/category-list/category-list.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { NoDataModule } from '@shared/modules/no-data/no-data.module';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { TransactionFormModalModule } from '@shared/modules/transaction-form-modal/transaction-form-modal.module';
import { TransactionListModule } from '@shared/modules/transaction-list/transaction-list.module';
import { WalletListModule } from '@shared/modules/wallet-list/wallet-list.module';
import { PieChartModule } from '@swimlane/ngx-charts';
import { PagerModule } from 'src/shared/modules/pager/pager.module';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';


@NgModule({
  declarations: [
    OverviewComponent,
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    FontAwesomeModule,
    PieChartModule,
    TransactionFormModalModule,
    CategoryFormModalModule,
    ProfileCurrencyModule,
    CategoryListModule,
    TransactionListModule,
    WalletListModule,
    LoadingModule,
    NoDataModule,
    PagerModule,
  ],
})
export class OverviewModule {
}
