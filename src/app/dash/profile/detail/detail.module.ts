import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { PieChartModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    LoadingModule,
    PieChartModule,
  ],
})
export class DetailModule {
}
