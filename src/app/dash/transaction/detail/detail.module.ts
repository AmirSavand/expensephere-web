import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { LoadingModule } from '@/shared/modules/loading/loading.module';
import { NotFoundModule } from '@/shared/modules/not-found/not-found.module';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';


@NgModule({
  declarations: [
    DetailComponent,
  ],
  imports: [
    CommonModule,
    DetailRoutingModule,
    ProfileCurrencyModule,
    FontAwesomeModule,
    NotFoundModule,
    LoadingModule,
  ],
})
export class DetailModule {
}
