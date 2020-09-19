import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectColorModule } from '@shared/modules/select-color/select-color.module';
import { SelectModule } from '@shared/modules/select/select.module';
import { WalletFormModalComponent } from '@shared/modules/wallet-form-modal/wallet-form-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SelectColorModule,
    SelectModule,
  ],
  declarations: [
    WalletFormModalComponent,
  ],
  entryComponents: [
    WalletFormModalComponent,
  ],
})
export class WalletFormModalModule { }
