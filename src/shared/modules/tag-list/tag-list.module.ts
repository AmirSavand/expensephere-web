import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TagListComponent } from './tag-list.component';

@NgModule({
  declarations: [
    TagListComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLinkWithHref,
  ],
  exports: [
    TagListComponent,
  ],
})
export class TagListModule {
}
