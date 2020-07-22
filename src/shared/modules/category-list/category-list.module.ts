import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list.component';



@NgModule({
  declarations: [CategoryListComponent],
  exports: [
    CategoryListComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class CategoryListModule { }
