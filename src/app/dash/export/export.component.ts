import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ExportOption } from '@app/dash/export/shared/interfaces/export-option';
import { Utils } from '@shared/classes/utils';
import { ExportFile } from '@shared/enums/export-file';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Event } from '@shared/interfaces/event';
import { GetParams } from '@shared/interfaces/get-params';
import { Transaction } from '@shared/interfaces/transaction';
import { TransactionsPage } from '@shared/interfaces/transactions-page';
import { Wallet } from '@shared/interfaces/wallet';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { ProfileCurrencyPipe } from '@shared/modules/profile-currency/profile-currency.pipe';
import { ProfileService } from '@shared/services/profile.service';
import { addDays, isValid } from 'date-fns';
import { Api } from '@shared/classes/api';
import { ApiResponse } from 'src/shared/interfaces/api-response';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
  providers: [DatePipe, ProfileCurrencyPipe],
})
export class ExportComponent implements OnInit {

  private static readonly TRANSACTIONS_LIMIT = 5000;

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
   *
   * Since the transactions list is paginated we need
   * to set a huge limit to it.
   */
  filtersSelected: GetParams = {
    limit: String(ExportComponent.TRANSACTIONS_LIMIT),
  };

  /**
   * Number of transactions with current filters.
   */
  count: number;

  /**
   * From date (date range).
   */
  from: string;

  /**
   * To date (date range).
   */
  to: string;

  /**
   * Disable action button
   */
  loading: boolean;

  constructor(private date: DatePipe,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private profileCurrency: ProfileCurrencyPipe) {
  }

  /**
   * @returns Selected filters combined with date range values.
   */
  private get filtersSelectedWithDates(): GetParams {
    /**
     * Add/remove start date.
     */
    if (isValid(new Date(this.from))) {
      this.filtersSelected.time_after = Utils.dateToUTCString(Utils.stringToLocalDate(this.from));
    } else {
      delete this.filtersSelected.time_after;
    }
    /**
     * Add/remove end date.
     * End date must be a day after the selected for BE support.
     */
    if (isValid(new Date(this.to))) {
      this.filtersSelected.time_before = Utils.dateToUTCString(addDays(Utils.stringToLocalDate(this.to), 1));
    } else {
      delete this.filtersSelected.time_before;
    }
    // Finally, return the selected filters.
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
    Api.transaction.list(this.filtersSelectedWithDates).subscribe((data: ApiResponse<Transaction>): void => {
      this.count = data.results.length;
      this.transactions = data.results;
    });
  }

  ngOnInit(): void {
    /**
     * Load wallets for filters
     */
    Api.wallet.list().subscribe((data: Wallet[]): void => {
      for (const wallet of data) {
        if (!this.filters[1].values) {
          this.filters[1].values = [];
        }
        this.filters[1].values.push({
          label: wallet.name,
          value: wallet.id,
        });
      }
    });
    /**
     * Load categories for filters and {@see categoryDict}
     */
    Api.category.list().subscribe((data: Category[]): void => {
      for (const category of data) {
        if (!this.filters[2].values) {
          this.filters[2].values = [];
        }
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
    Api.event.list().subscribe((data: Event[]): void => {
      for (const event of data) {
        if (!this.filters[3].values) {
          this.filters[3].values = [];
        }
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
        Api.transaction.download(option.value, file, this.filtersSelectedWithDates).subscribe((): void => {
          this.loading = false;
        });
        return;
      }
      case ExportFile.PAGE: {
        if (!this.transactions.length) {
          alert('No transactions are selected. Update your filters and try again 😉');
          return;
        }
        const transactions: number[] = [];
        for (const transaction of this.transactions) {
          transactions.push(transaction.id);
        }
        const note: string = prompt('Note for this public transactions page (optional):');
        Api.transactionsPage.create({
          transactions,
          note,
          profile: ProfileService.profile.value.id,
        }).subscribe((data: TransactionsPage): void => {
          this.router.navigate(['/public/transaction', data.id]);
        }, (): void => {
          alert('Failed to create public transactions page.');
        });
        return;
      }
    }
  }
}
