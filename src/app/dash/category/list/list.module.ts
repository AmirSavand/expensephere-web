import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryListModule } from '@shared/modules/category-list/category-list.module';
import { FiltersModule } from '@shared/modules/filters/filters.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { ModelDebounceModule } from '@shared/modules/model-debounce/model-debounce.module';
import { NoDataModule } from '@shared/modules/no-data/no-data.module';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';


@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    FontAwesomeModule,
    CategoryListModule,
    FormsModule,
    ModelDebounceModule,
    FiltersModule,
    NoDataModule,
    LoadingModule,
  ],
})
export class ListModule {
}
