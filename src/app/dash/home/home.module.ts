import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionFormModalModule } from '@shared/modules/transaction-form-modal/transaction-form-modal.module';
import { PieChartModule } from '@swimlane/ngx-charts';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    PieChartModule,
  ],
})
export class HomeModule {
}
