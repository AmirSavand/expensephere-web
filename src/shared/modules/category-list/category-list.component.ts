import { Component, Input } from '@angular/core';
import { Color } from '@shared/classes/color';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { CategoryFormModalComponent } from '@shared/modules/category-form-modal/category-form-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {

  readonly style = Color.style;

  @Input() categories: Category[];

  @Input() columnClass = 'col-xl-4';

  @Input() hideWithoutTransactions: boolean;

  constructor(private modalService: BsModalService) {
  }

  /**
   * Open category form modal for editing
   */
  editCategory(category: Category): void {
    /**
     * Prevent editing transfer categories
     */
    if (category.kind === ExpenseKind.TRANSFER) {
      alert('You can not edit this kind of category.');
      return;
    }
    this.modalService.show(CategoryFormModalComponent, {
      class: 'modal-sm',
      initialState: { category },
    });
  }
}
