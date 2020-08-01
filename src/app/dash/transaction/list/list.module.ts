import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersModule } from '@shared/modules/filters/filters.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { NoDataModule } from '@shared/modules/no-data/no-data.module';
import { TransactionListModule } from '@shared/modules/transaction-list/transaction-list.module';

import { ListRoutingModule } from 'src/app/dash/transaction/list/list-routing.module';
import { ListComponent } from 'src/app/dash/transaction/list/list.component';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    FiltersModule,
    TransactionListModule,
    NoDataModule,
    LoadingModule,
  ],
})
export class ListModule { }
