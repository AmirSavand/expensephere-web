import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventFormModalModule } from '@shared/modules/event-form-modal/event-form-modal.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';


@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    ModalModule.forRoot(),
    EventFormModalModule,
    FontAwesomeModule,
  ],
})
export class ListModule {
}
