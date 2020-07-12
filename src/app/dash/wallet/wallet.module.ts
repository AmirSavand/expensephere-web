import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WalletRoutingModule } from '@app/dash/wallet/wallet-routing.module';
import { WalletComponent } from '@app/dash/wallet/wallet.component';

@NgModule({
  declarations: [
    WalletComponent,
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
  ],
})
export class WalletModule {
}
