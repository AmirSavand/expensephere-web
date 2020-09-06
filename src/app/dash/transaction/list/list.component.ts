import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons/faCalendar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Event } from '@shared/interfaces/event';
import { GetParams } from '@shared/interfaces/get-params';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { ApiService } from '@shared/services/api.service';
import { Utils } from 'src/shared/classes/utils';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe],
})
export class ListComponent implements OnInit {

  /**
   * Storage key for "All Time" state.
   *
   * If this item exists and set to "true", that means
   * user was viewing transactions by "All Time" and
   * we want to remember this for user.
   *
   * If this item doesn't exist, it means user was
   * viewing transactions by "This Month", or other
   * months. In this case, we just set it to "This Month"
   * instead.
   */
  private static readonly STORAGE_KEY_ALL_TIME = 'all-time';

  readonly faTimeSelector: IconDefinition = faCalendar;
  readonly faPrev: IconDefinition = faArrowLeft;
  readonly faNext: IconDefinition = faArrowRight;

  /**
   * Current time which is used for generating dates
   * and template for comparing the selected date to
   * show "This Month" and "Last Month".
   */
  readonly now: Date = new Date();

  /**
   * List of available filters for user. We feed this
   * to the app-filters component.
   */
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
   * Selected filter values to fetch from the API.
   */
  filtersSelected: GetParams = {};

  /**
   * List of available months for user to switch through.
   * It starts with the current month, last month and so
   * on till the first month of the year. User can not
   * switch to future months.
   */
  months: Date[] = [];

  /**
   * Index of selected month from list of months.
   *
   * We set this to `null` to ignore the selected
   * month filtering and show user the transactions
   * without any time range.
   *
   * The state of selected month and "All Time" is
   * stored in storage {@see STORAGE_KEY_ALL_TIME}.
   */
  monthSelected: number;

  /**
   * Wallet list use
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

  constructor(private api: ApiService,
              private date: DatePipe) {
  }

  /**
   * @returns Date of last day of selected date
   */
  private getEndOfSelectedMonth(): Date {
    const date = this.months[this.monthSelected];
    return new Date(date.getFullYear(), date.getMonth() + 1);
  }

  /**
   * Load transactions with filters
   */
  load(): void {
    /**
     * Update the available category filter values based on the
     * selected kind value to show categories of selected kind.
     */
    const kindSelected = Number(this.filtersSelected.category__kind);
    const categoryFilter = this.filters[3];
    if (kindSelected >= 0 && this.categories) {
      // Clear out the category filter values
      categoryFilter.values = [
        { label: 'Category', value: '' },
      ];
      // Clear the selected category filter
      categoryFilter.value = '';
      for (const category of this.categories) {
        // Filter category filter values by kind (selected kind filter)
        if (category.kind === kindSelected) {
          categoryFilter.values.push({
            label: category.name,
            value: category.id,
          });
        }
      }
    }
    /**
     * Add time filter (range) based on month selector.
     *
     * If there's a selected month, then update the filters
     * and update storage about "All Time" being selected.
     *
     * If there's no selected month, then remove the filters
     * and update storage about "All Time" being selected.
     */
    if (this.monthSelected !== null) {
      this.filtersSelected.time_after = this.date.transform(this.months[this.monthSelected], Utils.API_DATE_FORMAT);
      this.filtersSelected.time_before = this.date.transform(this.getEndOfSelectedMonth(), Utils.API_DATE_FORMAT);
      localStorage.removeItem(ListComponent.STORAGE_KEY_ALL_TIME);
    } else {
      delete this.filtersSelected.time_after;
      delete this.filtersSelected.time_before;
      localStorage.setItem(ListComponent.STORAGE_KEY_ALL_TIME, String(true));
    }
    /**
     * Finally, get list of transactions based on filters and selected month.
     */
    this.api.transaction.list(this.filtersSelected).subscribe((data: Transaction[]): void => {
      this.transactions = data;
    });
  }

  ngOnInit(): void {
    /**
     * Generate months
     */
    for (let month = 0; month < 12; month++) {
      // Generate only current and older months
      if (month <= this.now.getMonth()) {
        // Set the date to current year and this month
        const date = new Date(this.now.getFullYear(), month);
        // Push this month to the list
        this.months.push(date);
      }
    }
    /**
     * Set selected date to looping month only if it's current month.
     *
     * Check for storage, if user chose "All Time" last time, then
     * don't set date selector to "This Month", leave it as "All Time".
     */
    if (localStorage.getItem(ListComponent.STORAGE_KEY_ALL_TIME)) {
      this.monthSelected = null;
    } else {
      this.monthSelected = this.months.length - 1;
    }
    /**
     * Load wallets
     */
    this.api.wallet.list().subscribe((data: Wallet[]): void => {
      this.wallets = data;
      // Set transaction list to filter
      for (const wallet of data) {
        this.filters[2].values.push({
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
        this.filters[3].values.push({
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
        this.filters[4].values.push({
          label: event.name,
          value: event.id,
        });
      }
    });
  }
}
