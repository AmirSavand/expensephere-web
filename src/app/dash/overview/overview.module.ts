import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryFormModalModule } from '@shared/modules/category-form-modal/category-form-modal.module';
import { CategoryListModule } from '@shared/modules/category-list/category-list.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { MetricSpentCategoryModule } from '@shared/modules/metric-spent-category/metric-spent-category.module';
import { NoDataModule } from '@shared/modules/no-data/no-data.module';
import { PagerModule } from '@shared/modules/pager/pager.module';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { TransactionFormModalModule } from '@shared/modules/transaction-form-modal/transaction-form-modal.module';
import { TransactionListModule } from '@shared/modules/transaction-list/transaction-list.module';
import { WalletListModule } from '@shared/modules/wallet-list/wallet-list.module';
import { PieChartModule } from '@swimlane/ngx-charts';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ChartSpentCategoryModule } from 'src/shared/modules/chart-spent-category/chart-spent-category.module';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import {MatCardModule} from "@angular/material/card";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatBadgeModule} from "@angular/material/badge";


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
    MetricSpentCategoryModule,
    ChartSpentCategoryModule,
    ProgressbarModule.forRoot(),
    MatCardModule,
    MatProgressBarModule,
    MatBadgeModule,
  ],
})
export class OverviewModule {
}
