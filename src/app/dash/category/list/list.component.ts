import { Component, OnInit } from '@angular/core';
import { Api } from '@shared/classes/api';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { GetParams } from '@shared/interfaces/get-params';
import { CategoryFormModalComponent } from '@shared/modules/category-form-modal/category-form-modal.component';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

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

  /**
   * Params to filter data.
   */
  params: GetParams;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
    CategoryFormModalComponent.CHANGE.subscribe((): void => {
      this.load();
    });
  }

  /**
   * Load categories with filters
   */
  load(): void {
    Api.category.list(this.params).subscribe((data: Category[]): void => {
      this.categories = data;
    });
  }

  /**
   * Open up category form modal
   */
  create(): void {
    this.modalService.show(CategoryFormModalComponent);
  }
}
