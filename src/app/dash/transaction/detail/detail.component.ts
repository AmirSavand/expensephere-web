import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons/faStickyNote';
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Event } from '@shared/interfaces/event';
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

  readonly expenseKind = ExpenseKind;

  readonly faTime = faClock;
  readonly faNote = faStickyNote;
  readonly faWallet = faWallet;

  /**
   * Transaction ID from param
   */
  id: string;

  /**
   * Transaction data
   */
  transaction: Transaction;

  /**
   * Transaction wallet
   */
  wallet: Wallet;

  /**
   * Transaction wallet into
   */
  into: Wallet;

  /**
   * Transaction category
   */
  category: Category;

  /**
   * Transaction event
   */
  event: Event;

  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    /**
     * Get transaction id from param
     */
    this.route.paramMap.subscribe((params: ParamMap): void => {
      if (!params.has('id')) {
        return;
      }
      /**
       * If transaction ID changes
       */
      if (this.id !== params.get('id')) {
        /**
         * Get transaction ID from params
         */
        this.id = params.get('id');
        /**
         * Load transaction data
         */
        this.api.transaction.retrieve(this.id).subscribe((transaction: Transaction): void => {
          this.transaction = transaction;
          /**
           * Load transaction wallet
           */
          this.api.wallet.retrieve(transaction.wallet).subscribe((data: Wallet): void => {
            this.wallet = data;
          });
          /**
           * Load transaction wallet into
           */
          if (transaction.into) {
            this.api.wallet.retrieve(transaction.into).subscribe((data: Wallet): void => {
              this.into = data;
            });
          }
          /**
           * Load transaction category
           */
          this.api.category.retrieve(transaction.category).subscribe((data: Category): void => {
            this.category = data;
          });
          /**
           * Load transaction event
           */
          if (transaction.event) {
            this.api.event.retrieve(transaction.event).subscribe((data: Event): void => {
              this.event = data;
            });
          }
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
