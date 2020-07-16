import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { EventFormModalComponent } from './event-form-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CollapseModule,
  ],
  declarations: [
    EventFormModalComponent,
  ],
  entryComponents: [
    EventFormModalComponent,
  ],
})
export class EventFormModalModule {
}
