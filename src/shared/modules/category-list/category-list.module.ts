import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryListComponent } from './category-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@NgModule({
  declarations: [CategoryListComponent],
  exports: [
    CategoryListComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {}}
  ],
})
export class CategoryListModule { }
