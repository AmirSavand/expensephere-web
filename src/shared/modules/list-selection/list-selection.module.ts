import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListSelectionComponent } from './list-selection.component';


@NgModule({
  declarations: [ListSelectionComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ListSelectionComponent,
  ],
})
export class ListSelectionModule {
}
