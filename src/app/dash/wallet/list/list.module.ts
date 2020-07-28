import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListRoutingModule } from '@app/dash/wallet/list/list-routing.module';
import { ListComponent } from '@app/dash/wallet/list/list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FiltersModule } from '@shared/modules/filters/filters.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { NoDataModule } from '@shared/modules/no-data/no-data.module';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { WalletFormModalModule } from '@shared/modules/wallet-form-modal/wallet-form-modal.module';
import { WalletListModule } from '@shared/modules/wallet-list/wallet-list.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    ModalModule.forRoot(),
    WalletFormModalModule,
    FontAwesomeModule,
    ProfileCurrencyModule,
    WalletListModule,
    NoDataModule,
    LoadingModule,
    FiltersModule,
  ],
})
export class ListModule {
}
