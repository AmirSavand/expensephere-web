import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';

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
