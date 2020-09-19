import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExportOption } from '@app/dash/export/shared/interfaces/export-option';
import { Utils } from '@shared/classes/utils';
import { ExportFile } from '@shared/enums/export-file';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Event } from '@shared/interfaces/event';
import { GetParams } from '@shared/interfaces/get-params';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { ProfileCurrencyPipe } from '@shared/modules/profile-currency/profile-currency.pipe';
import { ApiService } from '@shared/services/api.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
  providers: [DatePipe, ProfileCurrencyPipe],
})
export class ExportComponent implements OnInit {

  /**
   * Last transaction list pulled for counting.
   *
   * It will be used for exporting PDF so we don't
   * have to fetch it from the back-end again.
   */
  private transactions: Transaction[];

  /**
   * Category dict used for exporting PDF
   * via exportTransactionsToPDF.
   */
  private categoryDict: Record<number, Category> = {};

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
   * List of available export options.
   */
  readonly options: ExportOption[] = [
    { label: 'Public Page', value: ExportFile.PAGE },
    { label: 'PDF File', value: ExportFile.PDF },
    { label: 'EXCEL File', value: ExportFile.XLSX },
    { label: 'CSV File', value: ExportFile.CSV },
  ];

  /**
   * Selected filter values to fetch from the API.
   */
  filtersSelected: GetParams = {};

  /**
   * Number of transactions with current filters.
   */
  count: number;

  /**
   * From date (date range).
   */
  from: Date;

  /**
   * To date (date range).
   */
  to: Date;

  /**
   * Disable action button
   */
  loading: boolean;

  constructor(private api: ApiService,
              private date: DatePipe,
              private profileCurrency: ProfileCurrencyPipe) {
  }

  /**
   * @returns Selected filters combined with date range values.
   */
  private get filtersSelectedWithDates(): GetParams {
    /**
     * Add/remove start date.
     */
    if (this.from) {
      this.filtersSelected.time_after = this.date.transform(this.from, Utils.API_DATE_FORMAT);
    } else {
      delete this.filtersSelected.time_after;
    }
    /**
     * Add/remove end date.
     * End date must be a day after the selected for BE support.
     */
    if (this.to) {
      const to = new Date(this.to);
      to.setDate(to.getDate() + 1);
      this.filtersSelected.time_before = this.date.transform(to, Utils.API_DATE_FORMAT);
    } else {
      delete this.filtersSelected.time_before;
    }
    return this.filtersSelected;
  }

  /**
   * Load transactions with filters
   */
  load(): void {
    /**
     * Get list of transactions based on filters for count.
     *
     * Also store it for PDF export.
     * @see transactions
     */
    this.api.transaction.list(this.filtersSelectedWithDates).subscribe((data: Transaction[]): void => {
      this.count = data.length;
      this.transactions = data;
    });
  }

  ngOnInit(): void {
    /**
     * Load wallets for filters
     */
    this.api.wallet.list().subscribe((data: Wallet[]): void => {
      for (const wallet of data) {
        this.filters[1].values.push({
          label: wallet.name,
          value: wallet.id,
        });
      }
    });
    /**
     * Load categories for filters and {@see categoryDict}
     */
    this.api.category.list().subscribe((data: Category[]): void => {
      for (const category of data) {
        this.filters[2].values.push({
          label: category.name,
          value: category.id,
        });
        this.categoryDict[category.id] = category;
      }
    });
    /**
     * Load events for filters
     */
    this.api.event.list().subscribe((data: Event[]): void => {
      for (const event of data) {
        this.filters[3].values.push({
          label: event.name,
          value: event.id,
        });
      }
    });
    /**
     * Initial count
     */
    this.load();
  }

  /**
   * Export the transactions with the selected filters and options.
   */
  submit(option: ExportOption): void {
    const file = `Expensephere_Transactions_${this.date.transform(new Date(), 'yyyy-MM-dd')}`;
    switch (option.value) {
      case ExportFile.PDF: {
        Utils.exportTransactionsToPDF(this.transactions, file, this.categoryDict, this.date, this.profileCurrency);
        return;
      }
      case ExportFile.XLSX:
      case ExportFile.CSV: {
        this.loading = true;
        this.api.transaction.download(option.value, file, this.filtersSelectedWithDates).subscribe((): void => {
          this.loading = false;
        });
        return;
      }
      case ExportFile.PAGE: {
        alert('This feature is coming soon 💖');
        return;
      }
    }
  }
}
