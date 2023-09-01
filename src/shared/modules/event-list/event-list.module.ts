import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { EventListComponent } from './event-list.component';
import { MatCardModule } from "@angular/material/card";


@NgModule({
  declarations: [
    EventListComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ProfileCurrencyModule,
    RouterModule,
    MatCardModule,
  ],
  exports: [
    EventListComponent,
  ],
})
export class EventListModule {
}
