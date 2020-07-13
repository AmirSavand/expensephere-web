import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListRoutingModule } from '@app/dash/wallet/list/list-routing.module';
import { ListComponent } from '@app/dash/wallet/list/list.component';
import { WalletFormModalModule } from '@shared/modules/wallet-form-modal/wallet-form-modal.module';
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
  ],
})
export class ListModule {
}
