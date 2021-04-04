import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { NotFoundModule } from '@shared/modules/not-found/not-found.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';

@NgModule({
  declarations: [
    TransactionComponent,
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    LoadingModule,
    NotFoundModule,
    FontAwesomeModule,
    TooltipModule.forRoot(),
  ],
})
export class TransactionModule {
}
