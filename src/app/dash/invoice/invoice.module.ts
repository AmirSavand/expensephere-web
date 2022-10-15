import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { InvoiceService } from './invoice.service';

@NgModule({
  declarations: [
    InvoiceComponent,
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
  ],
  providers: [
    InvoiceService,
  ],
})
export class InvoiceModule {
}
