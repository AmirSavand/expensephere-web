import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { PagerComponent } from './pager.component';

@NgModule({
  declarations: [
    PagerComponent,
  ],
  exports: [
    PagerComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    FormsModule,
  ],
})
export class PagerModule {
}
