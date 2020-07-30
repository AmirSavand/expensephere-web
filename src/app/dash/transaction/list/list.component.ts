import { Component, OnInit } from '@angular/core';
import { Category } from '@shared/interfaces/category';
import { Event } from '@shared/interfaces/event';
import { GetParams } from '@shared/interfaces/get-params';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { ApiService } from '@shared/services/api.service';

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
      label: 'Wallet',
      key: 'wallet',
      value: '',
      values: [
        { label: 'Wallet', value: '' },
      ],
    },
    {
      type: FilterType.LIST,
      label: 'Category',
      key: 'category',
      value: '',
      values: [
        { label: 'Category', value: '' },
      ],
    },
    {
      type: FilterType.LIST,
      label: 'Event',
      key: 'event',
      value: '',
      values: [
        { label: 'Event', value: '' },
      ],
    },
    {
      type: FilterType.BOOLEAN,
      label: 'Archive',
      key: 'archive',
      value: false,
    },
  ];

  /**
   * Wallet list
   */
  wallets: Wallet[];

  /**
   * Transaction list
   */
  transactions: Transaction[];

  /**
   * Category list
   */
  categories: Category[];


  constructor(private api: ApiService) {
  }


  /**
   * Load transactions with filters
   */
  load(params: GetParams): void {
    this.api.transaction.list(params).subscribe((data: Transaction[]): void => {
      /**
       * Filter out transfer types
       */
      this.transactions = data;
    });
  }

  ngOnInit(): void {
    /**
     * Load wallets
     */
    this.api.wallet.list().subscribe((data: Wallet[]): void => {
      this.wallets = data;
      // Set transaction list to filter
      for (const wallet of data) {
        this.filters[1].values.push({
          label: wallet.name,
          value: wallet.id,
        });
      }
    });
    /**
     * Load categories
     */
    this.api.category.list().subscribe((data: Category[]): void => {
      this.categories = data;
      // Set category list to filter
      for (const category of data) {
        this.filters[2].values.push({
          label: category.name,
          value: category.id,
        });
      }
    });
    /**
     * Load events
     */
    this.api.event.list().subscribe((data: Event[]): void => {
      // Set event list to filter
      for (const event of data) {
        this.filters[3].values.push({
          label: event.name,
          value: event.id,
        });
      }
    });
  }
}
