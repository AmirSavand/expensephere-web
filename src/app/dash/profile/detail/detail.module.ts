import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartSpentCategoryModule } from '@shared/modules/chart-spent-category/chart-spent-category.module';
import {NoDataModule} from "@shared/modules/no-data/no-data.module";

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { PieChartModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    LoadingModule,
    PieChartModule,
    NoDataModule,
    ChartSpentCategoryModule,
  ],
})
export class DetailModule {
}
