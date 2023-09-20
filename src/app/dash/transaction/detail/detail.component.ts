import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faClock, faMoneyBillAlt, faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { faArchive, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Api } from '@shared/classes/api';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Event } from '@shared/interfaces/event';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { TransactionFormModalComponent } from '@shared/modules/transaction-form-modal/transaction-form-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  readonly expenseKind = ExpenseKind;

  readonly faTime: IconDefinition = faClock;
  readonly faNote: IconDefinition = faStickyNote;
  readonly faWallet: IconDefinition = faWallet;
  readonly faAmount: IconDefinition = faMoneyBillAlt;
  readonly faEvent: IconDefinition = faCalendar;
  readonly faArchive: IconDefinition = faArchive;

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

  /**
   * Page error
   */
  error = false;

  constructor(private route: ActivatedRoute,
              private dialog : MatDialog) {
  }

  ngOnInit(): void {
    TransactionFormModalComponent.CHANGE.subscribe((): void => {
      this.load();
    });
    /**
     * Get transaction id from param.
     */
    this.route.paramMap.subscribe((params: ParamMap): void => {
      if (!params.has('id')) {
        return;
      }
      /**
       * If transaction ID changes.
       */
      if (this.id !== params.get('id')) {
        /**
         * Get transaction ID from params.
         */
        this.id = params.get('id');
        /**
         * Load transaction data.
         */
        this.load();
      }
    });
  }

  /**
   * Load transaction data.
   */
  load(): void {
    Api.transaction.retrieve(this.id).subscribe((transaction: Transaction): void => {
      this.transaction = transaction;
      /**
       * Load transaction wallet
       */
      Api.wallet.retrieve(transaction.wallet).subscribe((data: Wallet): void => {
        this.wallet = data;
      });
      /**
       * Load transaction wallet into
       */
      if (transaction.into) {
        Api.wallet.retrieve(transaction.into).subscribe((data: Wallet): void => {
          this.into = data;
        });
      }
      /**
       * Load transaction category
       */
      Api.category.retrieve(transaction.category).subscribe((data: Category): void => {
        this.category = data;
      });
      /**
       * Load transaction event
       */
      if (transaction.event) {
        Api.event.retrieve(transaction.event).subscribe((data: Event): void => {
          this.event = data;
        });
      }
    }, (): void => {
      delete this.category;
      this.error = true;
    });
  }

  /**
   * Open transaction form modal for editing
   */
  edit(): void {
    this.dialog.open(TransactionFormModalComponent, { data: { transaction: this.transaction } });
  }
}
