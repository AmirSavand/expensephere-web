import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { Category } from '@shared/interfaces/category';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { TransactionFormModalComponent } from '@shared/modules/transaction-form-modal/transaction-form-modal.component';
import { ApiService } from '@shared/services/api.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  readonly faEdit: IconDefinition = faPen;

  /**
   * Wallet data
   */
  wallet: Wallet;

  /**
   * Categories for transaction
   */
  categories: Category[];

  /**
   * Wallet transactions
   */
  transactions: Transaction[];

  /**
   * Wallet ID from param
   */
  walletId: string;

  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
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
        /**
         * Get wallet ID from params
         */
        this.walletId = params.get('id');
        /**
         * Load wallet data
         */
        this.api.wallet.retrieve(this.walletId).subscribe((data: Wallet): void => {
          this.wallet = data;
        });
        /**
         * Load categories for transaction
         */
        this.api.category.list().subscribe((data: Category[]): void => {
          this.categories = data;
          /**
           * Load transactions of this wallet
           */
          this.api.transaction.list({ wallet: this.walletId }).subscribe((data: Transaction[]): void => {
            this.transactions = data;
          });
        });
      }
    });
  }

  /**
   * Open transaction form modal for editing
   */
  editTransaction(transaction: Transaction): void {
    this.modalService.show(TransactionFormModalComponent, { initialState: { transaction } });
  }
}
