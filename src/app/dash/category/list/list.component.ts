import { Component } from '@angular/core';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { GetParams } from '@shared/interfaces/get-params';
import { CategoryFormModalComponent } from '@shared/modules/category-form-modal/category-form-modal.component';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { ApiService } from '@shared/services/api.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {

  readonly filters: Filter[] = [
    {
      type: FilterType.TEXT,
      label: 'Search',
      key: 'search',
      value: '',
    },
    {
      type: FilterType.LIST,
      label: 'Type',
      key: 'kind',
      value: '',
      values: [
        { label: 'Type', value: '' },
        { label: 'Income', value: ExpenseKind.INCOME },
        { label: 'Expense', value: ExpenseKind.EXPENSE },
        { label: 'Transfer', value: ExpenseKind.TRANSFER },
      ],
    },
    {
      type: FilterType.BOOLEAN,
      label: 'Archive',
      key: 'archive',
      value: false,
    },
  ];

  categories: Category[];

  constructor(private api: ApiService,
              private modalService: BsModalService) {
  }

  /**
   * Load categories with filters
   */
  load(params: GetParams): void {
    this.api.category.list(params).subscribe((data: Category[]): void => {
      this.categories = data;
    });
  }

  /**
   * Open up category form modal
   */
  create(): void {
    this.modalService.show(CategoryFormModalComponent, { class: 'modal-sm' });
  }
}
