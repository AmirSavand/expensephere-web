import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';
import { Utils } from 'src/shared/classes/utils';
import { ExpenseKind } from 'src/shared/enums/kind';
import { Category } from 'src/shared/interfaces/category';
import { Event } from 'src/shared/interfaces/event';
import { GetParams } from 'src/shared/interfaces/get-params';
import { Transaction } from 'src/shared/interfaces/transaction';
import { Wallet } from 'src/shared/interfaces/wallet';
import { Action } from 'src/shared/modules/actions/shared/interfaces/action';
import { ActionData } from 'src/shared/modules/actions/shared/interfaces/action-data';
import { FilterType } from 'src/shared/modules/filters/shared/enums/filter-type';
import { Filter } from 'src/shared/modules/filters/shared/interfaces/filter';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
  providers: [DatePipe],
})
export class ExportComponent implements OnInit {

  /**
   * List of available filters for user. We feed this
   * to the <app-filters>.
   */
  readonly filters: Filter[] = [
    {
      type: FilterType.LIST,
      label: 'Type',
      key: 'category__kind',
      value: '',
      values: [
        { label: 'Type', value: '' },
        { label: 'Income', value: ExpenseKind.INCOME },
        { label: 'Expense', value: ExpenseKind.EXPENSE },
        { label: 'Transfer', value: ExpenseKind.TRANSFER },
      ],
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
    {
      type: FilterType.BOOLEAN,
      label: 'Exclude',
      key: 'exclude',
      value: false,
    },
  ];

  /**
   * List of available actions for multi-select. We
   * feed this to the <app-actions>.
   */
  readonly actions: Action[] = [
    {
      label: 'Export',
      values: [
        { label: 'EXCEL File', value: 'xlxs' },
        { label: 'CSV File', value: 'csv' },
        { label: 'PDF File', value: 'pdf' },
        { label: 'Public Page', value: 'page' },
      ],
    },
  ];

  /**
   * Selected filter values to fetch from the API.
   */
  filtersSelected: GetParams = {};

  /**
   * Transaction list
   */
  transactions: Transaction[];

  /**
   * Start date
   */
  startDate: Date;

  /**
   * End date
   */
  endDate: Date;

  /**
   * Disable action button
   */
  disableAction: boolean;

  /**
   * API loading indicator for actions
   */
  loadingAction: boolean;

  constructor(private api: ApiService,
              private date: DatePipe) {
  }

  /**
   * Load transactions with filters
   */
  load(): void {
    /**
     * We shouldn't let user to export transactions, while both of datepicker are not empty or not filled yet.
     */
    this.disableAction = !!(this.startDate && this.endDate || !this.startDate && !this.endDate);
    /**
     * Filter with time
     */
    if (this.startDate && this.endDate) {
      /**
       * We're increasing the date of selected end date here,
       * because BE doesn't responding the real selected end date.
       * (BE responding due the day before selected end date).
       */
      const endDate = new Date(this.endDate);
      endDate.setDate(endDate.getDate() + 1);
      /**
       * Setting the selected dates
       */
      this.filtersSelected.time_after = this.date.transform(this.startDate, Utils.API_DATE_FORMAT);
      this.filtersSelected.time_before = this.date.transform(endDate, Utils.API_DATE_FORMAT);
    } else {
      delete this.filtersSelected.time_after;
      delete this.filtersSelected.time_before;
    }
    /**
     * Get list of transactions based on filters
     */
    this.api.transaction.list(this.filtersSelected).subscribe((data: Transaction[]): void => {
      this.transactions = data;
    });
  }

  ngOnInit(): void {
    /**
     * Load wallets
     */
    this.api.wallet.list().subscribe((data: Wallet[]): void => {
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

  /**
   * Triggered via <app-actions> when user clicks on an action
   * for multi-select.
   */
  onAction(data: ActionData): void {
    switch (data.action.label) {
      case 'Export': {
        const file = `Expensephere_Transactions_${this.date.transform(new Date(), 'yyyy-MM-dd')}`;
        switch (data.value) {
          case 'xlxs': {
            this.api.transaction.download('xlsx', file, this.filtersSelected);
            return;
          }
          case 'csv': {
            this.api.transaction.download('csv', file, this.filtersSelected);
            return;
          }
        }
        alert('This feature is coming soon 💖');
        break;
      }
    }
  }

}
