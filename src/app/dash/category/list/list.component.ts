import { Component, OnInit } from '@angular/core';
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

  /**
   * Kind filter fields
   */
  readonly kindFilterFields: { name: string, value: string }[] = [
    {
      name: 'All Types',
      value: '',
    },
    {
      name: 'Incomes',
      value: String(ExpenseKind.INCOME),
    },
    {
      name: 'Expenses',
      value: String(ExpenseKind.EXPENSE),
    },
  ];

  /**
   * Selected kind filter field
   */
  kindFilterField = this.kindFilterFields[0];

  /**
   * Selected archive filter field
   */
  archiveFilterField = false;

  /**
   * Search field query
   */
  searchField = '';

  /**
   * category list
   */
  categories: Category[];


  constructor(private api: ApiService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    /**
     * Load categories
     */
    this.api.category.list({
      search: this.searchField,
      ordering: 'name',
      kind: String(this.kindFilterField.value),
      archive: String(this.archiveFilterField),
    }).subscribe((data: Category[]): void => {
      /**
       * Filter out transfer types
       */
      this.categories = data.filter((item: Category): boolean => item.kind !== ExpenseKind.TRANSFER);
    });
  }

  /**
   * Open up category form modal
   */
  create(): void {
    this.modalService.show(CategoryFormModalComponent, { class: 'modal-sm' });
  }
}
