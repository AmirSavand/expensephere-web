import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons/faCalendar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faThLarge } from '@fortawesome/free-solid-svg-icons/faThLarge';
import { Selection } from '@shared/classes/selection';
import { Utils } from '@shared/classes/utils';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Event } from '@shared/interfaces/event';
import { GetParams } from '@shared/interfaces/get-params';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { Action } from '@shared/modules/actions/shared/interfaces/action';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { TransactionListComponent } from '@shared/modules/transaction-list/transaction-list.component';
import { ApiService } from '@shared/services/api.service';
import { Observable, forkJoin } from 'rxjs';
import { ActionData } from 'src/shared/modules/actions/shared/interfaces/action-data';
import { ProfileCurrencyPipe } from 'src/shared/modules/profile-currency/profile-currency.pipe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DatePipe, ProfileCurrencyPipe],
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

  readonly expenseKind = ExpenseKind;

  readonly faTimeSelector: IconDefinition = faCalendar;
  readonly faPrev: IconDefinition = faArrowLeft;
  readonly faNext: IconDefinition = faArrowRight;
  readonly faListView: IconDefinition = faBars;
  readonly faGridView: IconDefinition = faThLarge;

  /**
   * Current time which is used for generating dates
   * and template for comparing the selected date to
   * show "This Month" and "Last Month".
   */
  readonly now: Date = new Date();

  /**
   * List of available filters for user. We feed this
   * to the <app-filters>.
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
   * List of available actions for multi-select. We
   * feed this to the <app-actions>.
   */
  readonly actions: Action[] = [
    {
      label: 'Archive',
      values: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    {
      label: 'Exclude',
      values: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    {
      label: 'Export',
      values: [
        { label: 'EXCEL File', value: 'xlxs' },
        { label: 'CSV File', value: 'csv' },
        { label: 'PDF File', value: 'pdf' },
        { label: 'Public Page', value: 'page' },
      ],
    },
    { label: 'Delete' },
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

  /**
   * List view instead of grid view?
   */
  listView = false;

  /**
   * Selection for multi-select
   */
  selection: Selection<Transaction>;

  /**
   * Dict of transactions categories
   * {@see TransactionListComponent.categoryDictSet
   */
  categoryDict: TransactionListComponent['categoryDict'];

  /**
   * Dict of wallet categories.
   * @see TransactionListComponent.walletDictSet
   */
  walletDict: TransactionListComponent['walletDict'];

  /**
   * API loading indicator for actions
   */
  loadingAction: boolean;

  constructor(private api: ApiService,
              private date: DatePipe,
              private profileCurrency: ProfileCurrencyPipe,
              private changeDetectorRef: ChangeDetectorRef) {
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
      /**
       * Setup selection instance
       */
      this.selection = new Selection(this.transactions);
      /**
       * Detect changes for transaction.title that is set in <app-transaction-list>
       */
      this.changeDetectorRef.detectChanges();
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

  /**
   * Triggered via <app-actions> when user clicks on an action
   * for multi-select.
   */
  onAction(data: ActionData): void {
    /**
     * Function to call for each kind of action with special API and payload.
     * Used for all actions except "Export".
     *
     * @param method Method to call for this action.
     */
    const call = (method: (transaction: Transaction) => Observable<any>): void => {
      const observables: Observable<Transaction>[] = [];
      for (const transaction of this.selection.selectedItems) {
        observables.push(method(transaction));
      }
      forkJoin(observables).subscribe((): void => {
        this.loadingAction = false;
        this.load();
      });
    };
    /**
     * Each action (based on label) does something else.
     */
    switch (data.action.label) {
      case 'Exclude': {
        call((transaction: Transaction): Observable<Transaction> => {
          return this.api.transaction.update(transaction.id, { exclude: data.value });
        });
        break;
      }
      case 'Archive': {
        call((transaction: Transaction): Observable<Transaction> => {
          return this.api.transaction.update(transaction.id, { archive: data.value });
        });
        break;
      }
      case 'Export': {
        const file = `Expensephere_Transactions_${this.date.transform(new Date(), 'yyyy-MM-dd')}`;
        const params: GetParams = {
          ids: Object.keys(this.selection.selection).filter((id: string): boolean => (
            this.selection.selection[id]
          )).join(),
        };
        switch (data.value) {
          case 'xlxs': {
            this.api.transaction.download('xlsx', file, params);
            return;
          }
          case 'csv': {
            this.api.transaction.download('csv', file, params);
            return;
          }
        }
        alert('This feature is coming soon 💖');
        break;
      }
      case 'Delete': {
        if (!confirm(`Are you sure you want to delete ${this.selection.selected} transactions?`)) {
          return;
        }
        call((transaction: Transaction): Observable<void> => {
          return this.api.transaction.delete(transaction.id);
        });
        break;
      }
    }
  }
}
