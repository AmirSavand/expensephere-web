import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionFormModalModule } from '@shared/modules/transaction-form-modal/transaction-form-modal.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { DashRoutingModule } from './dash-routing.module';
import { DashComponent } from './dash.component';


@NgModule({
  declarations: [
    DashComponent,
  ],
  imports: [
    CommonModule,
    DashRoutingModule,
    FontAwesomeModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    TransactionFormModalModule,
  ],
})
export class DashModule {
}
