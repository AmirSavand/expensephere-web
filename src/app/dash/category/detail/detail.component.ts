import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Api } from '@shared/classes/api';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { CategoryFormModalComponent } from '@shared/modules/category-form-modal/category-form-modal.component';
import { ApiResponse } from 'src/shared/interfaces/api-response';
import { GetParams } from 'src/shared/types/get-params';

@Component({
  selector: 'app-component',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  readonly expenseKind = ExpenseKind;

  // Filters used for loading transactions.
  readonly transactionsFilter: GetParams = {};

  // Current category data.
  category: Category;

  // Wallets for transactions.
  wallets: Wallet[];

  // Category transactions list.
  transactions: Transaction[];

  // Category ID from param
  categoryId: string;

  // Page error flag.
  error = false;

  // API response data for transactions.
  transactionsApiResponse: ApiResponse<Transaction>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    /**
     * Watch for modal changes.
     */
    CategoryFormModalComponent.CHANGE.subscribe((): void => {
      this.load();
    });
    /**
     * Get category id from param
     */
    this.route.paramMap.subscribe((params: ParamMap): void => {
      if (!params.has('id')) {
        return;
      }
      /**
       * If category ID changes
       */
      if (this.categoryId !== params.get('id')) {
        // Get category ID from params
        this.categoryId = params.get('id');
        // Load category data
        this.load();
        // Update transaction filters.
        this.transactionsFilter.category = this.categoryId;
        /**
         * Load wallets for transactions
         */
        Api.wallet.list().subscribe((wallets: Wallet[]): void => {
          this.wallets = wallets;
          this.loadTransactions();
        });
      }
    });
  }

  /**
   * Load transactions of this category.
   */
  loadTransactions(): void {
    Api.transaction.list(this.transactionsFilter).subscribe((data: ApiResponse<Transaction>): void => {
      this.transactions = data.results;
      this.transactionsApiResponse = data;
    });
  }

  /**
   * Load category data.
   */
  load(): void {
    Api.category.retrieve(this.categoryId).subscribe((data: Category): void => {
      this.category = data;
    }, (): void => {
      delete this.category;
      this.error = true;
    });
  }
}
