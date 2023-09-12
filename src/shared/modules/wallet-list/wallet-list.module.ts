import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';

import { WalletListComponent } from './wallet-list.component';
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [
    WalletListComponent,
  ],
  imports: [
    CommonModule,
    ProfileCurrencyModule,
    FontAwesomeModule,
    RouterModule,
    MatCardModule,
  ],
  exports: [
    WalletListComponent,
  ],
})
export class WalletListModule {
}
