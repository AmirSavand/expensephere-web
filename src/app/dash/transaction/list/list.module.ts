import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FiltersModule } from '@shared/modules/filters/filters.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { NoDataModule } from '@shared/modules/no-data/no-data.module';
import { TransactionListModule } from '@shared/modules/transaction-list/transaction-list.module';

import { ListRoutingModule } from '@app/dash/transaction/list/list-routing.module';
import { ListComponent } from '@app/dash/transaction/list/list.component';
import { ActionsModule } from '@shared/modules/actions/actions.module';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { PagerModule } from 'src/shared/modules/pager/pager.module';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    FiltersModule,
    TransactionListModule,
    NoDataModule,
    LoadingModule,
    FontAwesomeModule,
    ProfileCurrencyModule,
    FormsModule,
    ActionsModule,
    PagerModule,
  ],
})
export class ListModule { }
