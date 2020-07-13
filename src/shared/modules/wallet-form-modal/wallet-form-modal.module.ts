import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WalletFormModalComponent } from 'src/shared/modules/wallet-form-modal/wallet-form-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  declarations: [
    WalletFormModalComponent,
  ],
  entryComponents: [
    WalletFormModalComponent,
  ],
})
export class WalletFormModalModule { }
