import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { EventListComponent } from './event-list.component';
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


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
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {}}
  ],
})
export class EventListModule {
}
