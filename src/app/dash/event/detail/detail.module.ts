import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';


@NgModule({
  declarations: [
    DetailComponent,
  ],
  imports: [
    CommonModule,
    DetailRoutingModule,
  ],
})
export class DetailModule {
}
