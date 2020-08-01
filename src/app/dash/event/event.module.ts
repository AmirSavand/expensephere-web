import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';

@NgModule({
  declarations: [
    EventComponent,
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
  ],
  exports: [
    EventComponent,
  ],
})
export class EventModule {
}
