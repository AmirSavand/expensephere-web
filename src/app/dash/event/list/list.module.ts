import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventFormModalModule } from '@shared/modules/event-form-modal/event-form-modal.module';
import { EventListModule } from '@shared/modules/event-list/event-list.module';
import { FiltersModule } from '@shared/modules/filters/filters.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { NoDataModule } from '@shared/modules/no-data/no-data.module';
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
    FiltersModule,
    EventListModule,
    NoDataModule,
    LoadingModule,
  ],
})
export class ListModule {
}
