import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { NotFoundModule } from '@shared/modules/not-found/not-found.module';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { TemplateSoftComponent } from './shared/components/template-soft/template-soft.component';

@NgModule({
  declarations: [
    InvoiceComponent,
    TemplateSoftComponent,
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    ProfileCurrencyModule,
    LoadingModule,
    NotFoundModule,
  ],
})
export class InvoiceModule {
}
