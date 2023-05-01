import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { Api } from '@shared/classes/api';
import { ApiResponse } from '@shared/interfaces/api-response';
import { Tag } from '@shared/interfaces/tag';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { CategoryFormModalComponent } from '@shared/modules/category-form-modal/category-form-modal.component';
import { GetParams } from '@shared/types/get-params';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input() tags: Tag[];

  readonly faNote: IconDefinition = faStickyNote;

  // Filters used for loading transactions.
  readonly transactionsFilter: GetParams = {};

  // Current tag data.
  tag: Tag;

  // tag ID from param
  tagId: string;

  // Wallets for transactions.
  wallets: Wallet[];

  // API response data for transactions.
  transactionsApiResponse: ApiResponse<Transaction>;

  // Category transactions list.
  transactions: Transaction[];

  // Page error flag.
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
      if (this.tagId !== params.get('id')) {
        // Get category ID from params
        this.tagId = params.get('id');
        // Load category data
        this.load();
        // Update transaction filters.
        this.transactionsFilter.category = this.tagId;
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
    Api.tag.retrieve(this.tagId).subscribe((data: Tag): void => {
      this.tag = data;
    }, (): void => {
      delete this.tag;
      this.error = true;
    });
  }
}
