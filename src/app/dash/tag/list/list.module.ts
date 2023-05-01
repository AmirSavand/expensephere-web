import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EventListModule } from '@shared/modules/event-list/event-list.module';
import { FiltersModule } from '@shared/modules/filters/filters.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { NoDataModule } from '@shared/modules/no-data/no-data.module';
import { TagListModule } from '@shared/modules/tag-list/tag-list.module';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';


@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    EventListModule,
    FiltersModule,
    NoDataModule,
    LoadingModule,
    TagListModule,
  ],
})
export class ListModule {
}
