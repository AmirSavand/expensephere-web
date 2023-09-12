import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { TagFormModalModule } from '@shared/modules/tag-form-modal/tag-form-modal.module';
import { TransactionFormModalModule } from '@shared/modules/transaction-form-modal/transaction-form-modal.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DashRoutingModule } from './dash-routing.module';
import { DashComponent } from './dash.component';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    DashComponent,
  ],
  imports: [
    CommonModule,
    DashRoutingModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    TransactionFormModalModule,
    ProfileCurrencyModule,
    BsDropdownModule.forRoot(),
    LoadingModule,
    OverlayModule,
    TagFormModalModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class DashModule {
}
