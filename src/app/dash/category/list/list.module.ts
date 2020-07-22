import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryListModule } from '@shared/modules/category-list/category-list.module';
import { ModelDebounceModule } from '@shared/modules/model-debounce/model-debounce.module';

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
  ],
})
export class ListModule {
}
