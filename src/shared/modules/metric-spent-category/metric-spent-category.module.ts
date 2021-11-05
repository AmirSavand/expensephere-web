import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { LoadingModule } from 'src/shared/modules/loading/loading.module';

import { MetricSpentCategoryComponent } from './metric-spent-category.component';

@NgModule({
  declarations: [
    MetricSpentCategoryComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    ProfileCurrencyModule,
    LoadingModule,
  ],
  exports: [
    MetricSpentCategoryComponent,
  ],
})
export class MetricSpentCategoryModule {
}
