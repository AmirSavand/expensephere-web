import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TagListComponent } from './tag-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    TagListComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLinkWithHref,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {}}
  ],
  exports: [
    TagListComponent,
  ],
})
export class TagListModule {
}
