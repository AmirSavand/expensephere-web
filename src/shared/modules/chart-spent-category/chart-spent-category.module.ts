import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { PieChartModule } from '@swimlane/ngx-charts';
import { LoadingModule } from 'src/shared/modules/loading/loading.module';

import { ChartSpentCategoryComponent } from './chart-spent-category.component';

@NgModule({
  declarations: [
    ChartSpentCategoryComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    ProfileCurrencyModule,
    LoadingModule,
    PieChartModule,
  ],
  exports: [
    ChartSpentCategoryComponent,
  ],
})
export class ChartSpentCategoryModule {
}
