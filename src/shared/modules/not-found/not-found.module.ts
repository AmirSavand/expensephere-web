import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NotFoundComponent } from './not-found.component';


@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  exports: [
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
})
export class NotFoundModule {
}
