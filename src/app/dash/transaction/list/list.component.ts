import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons/faCalendar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faThLarge } from '@fortawesome/free-solid-svg-icons/faThLarge';
import { Selection } from '@shared/classes/selection';
import { Utils } from '@shared/classes/utils';
import { ExportFile } from '@shared/enums/export-file';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Event } from '@shared/interfaces/event';
import { GetParams } from '@shared/interfaces/get-params';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { Action } from '@shared/modules/actions/shared/interfaces/action';
import { ActionData } from '@shared/modules/actions/shared/interfaces/action-data';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { ProfileCurrencyPipe } from '@shared/modules/profile-currency/profile-currency.pipe';
import { TransactionFormModalComponent } from '@shared/modules/transaction-form-modal/transaction-form-modal.component';
import { TransactionListComponent } from '@shared/modules/transaction-list/transaction-list.component';
import { ApiService } from '@shared/services/api.service';
import { isValid, addDays } from 'date-fns';
import { Observable, forkJoin } from 'rxjs';

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
  readonly now = new Date();

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
    },
    {
      type: FilterType.LIST,
      label: 'Category',
      key: 'category',
      value: '',
    },
    {
      type: FilterType.LIST,
      label: 'Event',
      key: 'event',
      value: '',
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
        { label: 'Public Page', value: ExportFile.PAGE },
        { label: 'PDF File', value: ExportFile.PDF },
        { label: 'EXCEL File', value: ExportFile.XLSX },
        { label: 'CSV File', value: ExportFile.CSV },
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
   * If day filter is set in query params.
   * Can be set by calendar page on day click.
   */
  viewingDay?: Date;

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
  loadingAction = false;

  constructor(private api: ApiService,
              private date: DatePipe,
              private route: ActivatedRoute,
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

  ngOnInit(): void {
    TransactionFormModalComponent.CHANGE.subscribe((): void => {
      this.load();
    });
    /**
     * Get and watch query params.
     */
    this.route.queryParams.subscribe((data: Params): void => {
      const isFirstTime: boolean = !Boolean(this.viewingDay);
      /**
       * Check for day filter in query params.
       * Day is set when user clicks on a day in calendar page.
       *
       * Note that viewing date is the beginning of the day in
       * local time so we need to send it as UTC to the API. We
       * use {@see Utils.stringToLocalDate} to load this as a
       * local date and we'll use {@see Utils.dateToUTCString}
       * to send it as a UTC date.
       */
      this.viewingDay = Utils.stringToLocalDate(data.day);
      if (!isValid(this.viewingDay)) {
        delete this.viewingDay;
      }
      if (!isFirstTime) {
        this.load();
      }
    });
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
        if (!this.filters[2].values) {
          this.filters[2].values = [];
        }
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
        if (!this.filters[3].values) {
          this.filters[3].values = [];
        }
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
        if (!this.filters[4].values) {
          this.filters[4].values = [];
        }
        this.filters[4].values.push({
          label: event.name,
          value: event.id,
        });
      }
    });
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
     * Add time filter (range).
     *
     * If viewing date is set (from calendar page) then
     * set min and max to that day.
     *
     * If there's a selected month, then update the filters
     * and update storage about "All Time" being selected.
     *
     * If there's no selected month, then remove the filters
     * and update storage about "All Time" being selected.
     */
    if (isValid(this.viewingDay)) {
      this.filtersSelected.time_after = Utils.dateToUTCString(this.viewingDay);
      this.filtersSelected.time_before = Utils.dateToUTCString(addDays(this.viewingDay, 1));
    } else if (this.monthSelected !== null) {
      this.filtersSelected.time_after = Utils.dateToUTCString(this.months[this.monthSelected]);
      this.filtersSelected.time_before = Utils.dateToUTCString(this.getEndOfSelectedMonth());
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
        switch (data.value as ExportFile) {
          case ExportFile.PDF: {
            Utils.exportTransactionsToPDF(
              this.selection.selectedItems,
              file,
              this.categoryDict,
              this.date,
              this.profileCurrency,
            );
            return;
          }
          case ExportFile.XLSX:
          case ExportFile.CSV: {
            this.loadingAction = true;
            this.api.transaction.download(data.value as ExportFile, file, params).subscribe((): void => {
              this.loadingAction = false;
            });
            return;
          }
          case ExportFile.PAGE: {
            alert('This feature is coming soon 💖');
          }
        }
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
