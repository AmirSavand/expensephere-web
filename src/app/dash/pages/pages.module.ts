import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { NoDataModule } from '@shared/modules/no-data/no-data.module';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LoadingModule,
    NoDataModule,
    FontAwesomeModule,
  ],
})
export class PagesModule {
}
