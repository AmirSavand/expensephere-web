import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryListComponent } from './category-list.component';



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
})
export class CategoryListModule { }
