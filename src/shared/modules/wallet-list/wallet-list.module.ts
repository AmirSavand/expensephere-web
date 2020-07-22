import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { WalletListComponent } from './wallet-list.component';



@NgModule({
  declarations: [WalletListComponent],
  imports: [
    CommonModule,
    ProfileCurrencyModule,
  ],
  exports: [
    WalletListComponent,
  ],
})
export class WalletListModule { }
