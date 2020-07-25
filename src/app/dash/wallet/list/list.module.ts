import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListRoutingModule } from '@app/dash/wallet/list/list-routing.module';
import { ListComponent } from '@app/dash/wallet/list/list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
  ],
})
export class ListModule {
}
