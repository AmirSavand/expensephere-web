import { KeyValue } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { Color } from '@shared/classes/color';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { TransactionFormModalComponent } from '@shared/modules/transaction-form-modal/transaction-form-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit, OnChanges {

  readonly style = Color.style;
  readonly faEdit: IconDefinition = faPen;
  readonly expenseKind = ExpenseKind;

  readonly categoryDict: Record<number, Category> = {};
  readonly walletDict: Record<number, Wallet> = {};

  @Input() transactions: Transaction[];

  @Input() columnClass = 'col-xl-4';

  @Input() wallets: Wallet[];

  @Input() categories: Category[];

  /**
   * Transaction group list
   */
  transactionsGroups: Record<string, Transaction[]>;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.setupTransactionsGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.transactions.currentValue) {
      this.transactions = changes.transactions.currentValue;
      this.setupTransactionsGroup();
    }
  }

  /**
   * Group transactions by date
   */
  setupTransactionsGroup(): void {
    /**
     * Clear transactions groups
     */
    this.transactionsGroups = {};
    /**
     * Store category and wallet into dictionary for better access by transactions.
     */
    for (const wallet of this.wallets) {
      this.walletDict[wallet.id] = wallet;
    }
    for (const category of this.categories) {
      this.categoryDict[category.id] = category;
    }
    /**
     * Loop through transactions to add them to their groups and update them.
     */
    for (const transaction of this.transactions) {
      /**
       * Generate transaction title based on category name and its note.
       */
      transaction.title = this.categoryDict[transaction.category].name;
      if (transaction.note) {
        transaction.title = transaction.note.split('\n')[0];
        if (transaction.title.length > 21) {
          transaction.title = transaction.title.substring(0, 21) + '...';
        }
      }
      const created: Date = new Date(transaction.time);
      const date: string = new Date(created.getFullYear(), created.getMonth(), created.getDate()).toString();
      if (!this.transactionsGroups[date]) {
        this.transactionsGroups[date] = [];
      }
      this.transactionsGroups[date].push(transaction);
    }
  }

  /**
   * Order dict by date
   */
  orderByDate(a: KeyValue<string, Transaction[]>, b: KeyValue<string, Transaction[]>): number {
    const aDate: number = new Date(a.key).getTime();
    const bDate: number = new Date(b.key).getTime();
    if (aDate < bDate) {
      return 1;
    }
    if (aDate > bDate) {
      return -1;
    }
    return 0;
  }

  /**
   * Open transaction form modal for editing
   */
  editTransaction(transaction: Transaction): void {
    this.modalService.show(TransactionFormModalComponent, { initialState: { transaction } });
  }
}
