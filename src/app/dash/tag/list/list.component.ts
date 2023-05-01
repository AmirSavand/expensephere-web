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

  /**
   * Tag list
   */
  tags: Tag[];

  /**
   * Params to filter data.
   */
  params: GetParams;

  constructor() {
  }

  ngOnInit(): void {
    TagFormModalComponent.CHANGE.subscribe((): void => {
      this.load();
    });
  }

  /**
   * Load event with filters
   */
  load(): void {
    Api.tag.list(this.params).subscribe((data: Tag[]): void => {
      this.tags = data;
    });
  }
}
