import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { Api } from '@shared/classes/api';
import { ApiResponse } from '@shared/interfaces/api-response';
import { Category } from '@shared/interfaces/category';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { TransactionFormModalComponent } from '@shared/modules/transaction-form-modal/transaction-form-modal.component';
import { WalletFormModalComponent } from '@shared/modules/wallet-form-modal/wallet-form-modal.component';
import { GetParams } from '@shared/types/get-params';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  readonly faEdit: IconDefinition = faPen;

  // Filters used for loading transactions.
  readonly transactionsFilter: GetParams = {};

  // Wallet data
  wallet: Wallet;

  // Wallet list
  wallets: Wallet[];

  // Categories for transaction
  categories: Category[];

  // Wallet transactions
  transactions: Transaction[];

  // Wallet ID from param
  walletId: string;

  // Page error flag.
  error = false;

  // API response data for transactions.
  transactionsApiResponse: ApiResponse<Transaction>;

  constructor(private route: ActivatedRoute,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    /**
     * Watch for modal changes.
     */
    WalletFormModalComponent.CHANGE.subscribe((): void => {
      this.loadWallet();
    });
    /**
     * Get wallet id from param
     */
    this.route.paramMap.subscribe((params: ParamMap): void => {
      if (!params.has('id')) {
        return;
      }
      /**
       * If wallet ID changes
       */
      if (this.walletId !== params.get('id')) {
        // Get wallet ID from params
        this.walletId = params.get('id');
        // Update transaction filters.
        this.transactionsFilter.wallet = this.walletId;
        // Load wallet data
        this.loadWallet();
        /**
         * Load wallet list
         */
        Api.wallet.list().subscribe((data: Wallet[]): void => {
          this.wallets = data;
        });
        /**
         * Load categories for transaction
         */
        Api.category.list().subscribe((data: Category[]): void => {
          this.categories = data;
          this.loadTransactions();
        });
      }
    });
  }

  /**
   * Load wallet data
   */
  loadWallet(): void {
    Api.wallet.retrieve(this.walletId).subscribe((data: Wallet): void => {
      this.wallet = data;
    }, (): void => {
      delete this.wallet;
      this.error = true;
    });
  }

  /**
   * Load transactions of this wallet.
   */
  loadTransactions(): void {
    Api.transaction.list(this.transactionsFilter).subscribe((data: ApiResponse<Transaction>): void => {
      this.transactions = data.results;
      this.transactionsApiResponse = data;
    });
  }

  /**
   * Open transaction form modal for editing
   */
  editTransaction(transaction: Transaction): void {
    this.modalService.show(TransactionFormModalComponent, { initialState: { transaction } });
  }
}
