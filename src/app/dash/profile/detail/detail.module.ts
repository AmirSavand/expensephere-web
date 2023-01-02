import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartSpentCategoryModule } from '@shared/modules/chart-spent-category/chart-spent-category.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { NoDataModule } from '@shared/modules/no-data/no-data.module';
import { NotFoundModule } from '@shared/modules/not-found/not-found.module';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { PieChartModule } from '@swimlane/ngx-charts';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';


@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    LoadingModule,
    PieChartModule,
    NoDataModule,
    ChartSpentCategoryModule,
    ProfileCurrencyModule,
    NotFoundModule,
    FontAwesomeModule,
  ],
})
export class DetailModule {
}
