import { Component, OnInit } from '@angular/core';
import { Api } from '@shared/classes/api';
import { GetParams } from '@shared/interfaces/get-params';
import { Tag } from '@shared/interfaces/tag';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { TagFormModalComponent } from '@shared/modules/tag-form-modal/tag-form-modal.component';

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
      type: FilterType.BOOLEAN,
      label: 'Archive',
      key: 'archive',
      value: false,
    },
  ];

  /** Selected filter values to fetch from the API. */
  filtersSelected: GetParams = {};

  /** Tag list */
  tags: Tag[];

  constructor() {
  }

  ngOnInit(): void {
    TagFormModalComponent.CHANGE.subscribe({
      next: (): void => {
        this.load();
      },
    });
  }

  /** Load event with filters */
  load(): void {
    Api.tag.list(this.filtersSelected).subscribe({
      next: (data: Tag[]): void => {
        this.tags = data;
      },
    });
  }
}
