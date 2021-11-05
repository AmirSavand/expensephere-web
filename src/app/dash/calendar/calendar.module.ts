import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DateAdapter, CalendarModule as AngularCalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';

@NgModule({
  declarations: [
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FontAwesomeModule,
  ],
})
export class CalendarModule {
}
