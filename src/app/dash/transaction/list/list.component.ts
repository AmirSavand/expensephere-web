import { Component, OnInit } from '@angular/core';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { FilterListValue } from '@shared/modules/filters/shared/interfaces/filter-list-value';
import { ApiService } from '@shared/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  // readonly filters: Filter[] = [
  //   {
  //     type: FilterType.TEXT,
  //     label: 'Search',
  //     key: 'search',
  //     value: '',
  //   },
  //   {
  //     type: FilterType.LIST,
  //     label: 'Wallet',
  //     key: 'wallet',
  //     value: '',
  //     values: [
  //       { label: 'Any', value: '' },
  //       { label: 'Income', value: ExpenseKind.INCOME },
  //       { label: 'Expense', value: ExpenseKind.EXPENSE },
  //     ],
  //   },
  //   {
  //     type: FilterType.LIST,
  //     label: 'Wallet',
  //     key: 'wallet',
  //     value: '',
  //     values: [],
  //   },
  // ];

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

  ngOnInit(): void {
    /**
     * Load wallets
     */
    this.api.wallet.list().subscribe((data: Wallet[]): void => {
      this.wallets = data;
    });
    /**
     * Load transactions
     */
    this.api.transaction.list().subscribe((data: Transaction[]): void => {
      this.transactions = data;
    });
    /**
     * Load categories
     */
    this.api.category.list().subscribe((data: Category[]): void => {
      this.categories = data;
    });
  }
}
