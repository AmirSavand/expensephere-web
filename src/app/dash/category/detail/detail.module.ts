import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryListModule } from '@shared/modules/category-list/category-list.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { NoDataModule } from '@shared/modules/no-data/no-data.module';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { TransactionListModule } from '@shared/modules/transaction-list/transaction-list.module';
import { NotFoundModule } from '@shared/modules/not-found/not-found.module';
import { PagerModule } from '@shared/modules/pager/pager.module';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';


@NgModule({
  declarations: [
    DetailComponent,
  ],
  imports: [
    CommonModule,
    DetailRoutingModule,
    FontAwesomeModule,
    TransactionListModule,
    CategoryListModule,
    ProfileCurrencyModule,
    LoadingModule,
    NoDataModule,
    NotFoundModule,
    PagerModule,
  ],
})
export class DetailModule {
}
