import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FiltersModule } from '@shared/modules/filters/filters.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { NoDataModule } from '@shared/modules/no-data/no-data.module';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { TruncateModule } from '@shared/modules/truncate/truncate.module';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    FiltersModule,
    LoadingModule,
    NoDataModule,
    ProfileCurrencyModule,
    FontAwesomeModule,
    TruncateModule,
    MatButtonModule,
  ],
})
export class ListModule {
}
