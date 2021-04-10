import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { CategoryFormModalComponent } from '@shared/modules/category-form-modal/category-form-modal.component';
import { Api } from '@shared/classes/api';
import { ApiResponse } from 'src/shared/interfaces/api-response';

@Component({
  selector: 'app-component',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  readonly expenseKind = ExpenseKind;

  /**
   * Category data
   */
  category: Category;

  /**
   * Wallets for transactions
   */
  wallets: Wallet[];

  /**
   * Category transactions
   */
  transactions: Transaction[];

  /**
   * Category ID from param
   */
  categoryId: string;

  /**
   * Page error
   */
  error = false;

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
        /**
         * Get category ID from params
         */
        this.categoryId = params.get('id');
        /**
         * Load category data
         */
        this.load();
        /**
         * Load wallets for transactions
         */
        Api.wallet.list().subscribe((wallets: Wallet[]): void => {
          this.wallets = wallets;
          /**
           * Load transactions of this category
           */
          Api.transaction.list({ category: this.categoryId }).subscribe((data: ApiResponse<Transaction>): void => {
            this.transactions = data.results;
          });
        });
      }
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
