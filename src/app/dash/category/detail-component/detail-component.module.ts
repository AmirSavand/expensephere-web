import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DetailComponentRoutingModule } from './detail-component-routing.module';
import { DetailComponentComponent } from './detail-component.component';


@NgModule({
  declarations: [
    DetailComponentComponent,
  ],
  imports: [
    CommonModule,
    DetailComponentRoutingModule,
    FontAwesomeModule,
  ],
})
export class DetailComponentModule {
}
