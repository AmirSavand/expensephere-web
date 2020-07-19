import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { CategoryFormModalComponent } from '@shared/modules/category-form-modal/category-form-modal.component';
import { ApiService } from '@shared/services/api.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  readonly faEdit: IconDefinition = faPen;

  readonly expenseKind = ExpenseKind;

  /**
   * category list
   */
  categories: Category[];

  constructor(private api: ApiService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    /**
     * Load categories
     */
    this.api.category.list().subscribe((data: Category[]): void => {
      this.categories = data;
    });
  }

  /**
   * Open up category form modal
   */
  addCategory(): void {
    this.modalService.show(CategoryFormModalComponent, { class: 'modal-sm' });
  }

  /**
   * Open category form modal for editing
   */
  editCategory(category: Category): void {
    /**
     * Prevent editing transfer categories
     */
    if (category.kind === this.expenseKind.TRANSFER) {
      alert('You can not edit this kind of category.');
      return;
    }
    this.modalService.show(CategoryFormModalComponent, {
      class: 'modal-sm',
      initialState: { category },
    });
  }
}
