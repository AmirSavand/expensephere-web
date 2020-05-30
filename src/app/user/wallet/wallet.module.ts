import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WalletRoutingModule } from 'src/app/user/wallet/wallet-routing.module';
import { WalletComponent } from 'src/app/user/wallet/wallet.component';

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
