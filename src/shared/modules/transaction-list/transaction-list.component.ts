import { KeyValue } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { Color } from '@shared/classes/color';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { TransactionFormModalComponent } from '@shared/modules/transaction-form-modal/transaction-form-modal.component';
import { startOfDay, parseISO, formatISO, getTime } from 'date-fns';
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

  @Output() categoryDictSet = new EventEmitter<TransactionListComponent['categoryDict']>();
  @Output() walletDictSet = new EventEmitter<TransactionListComponent['walletDict']>();

  @Input() transactions: Transaction[];

  @Input() columnClass = 'col-xl-4';

  @Input() wallets: Wallet[];

  @Input() categories: Category[];

  /**
   * Transaction groups transaction list
   */
  transactionsGroups: Record<string, Transaction[]>;

  /**
   * Transaction groups total value
   */
  transactionsGroupsTotal: Record<string, number> = {};

  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.setupTransactionsGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.transactions && changes.transactions.currentValue) {
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
     * Trigger category and wallet dict update
     */
    this.categoryDictSet.emit(this.categoryDict);
    this.walletDictSet.emit(this.walletDict);
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
      const date: string = formatISO(startOfDay(parseISO(transaction.time)), { representation: 'date' });
      if (!this.transactionsGroups[date]) {
        this.transactionsGroups[date] = [];
      }
      this.transactionsGroups[date].push(transaction);
    }
    /**
     * Generate total value for each transactions group
     */
    for (const key of Object.keys(this.transactionsGroups)) {
      this.transactionsGroupsTotal[key] = 0;
      for (const transaction of this.transactionsGroups[key]) {
        let factor: number;
        switch (transaction.kind) {
          case ExpenseKind.INCOME:
            factor = 1;
            break;
          case ExpenseKind.EXPENSE:
            factor = -1;
            break;
          case ExpenseKind.TRANSFER:
            factor = 0;
            break;
        }
        this.transactionsGroupsTotal[key] += (transaction.amount * factor);
      }
    }
  }

  /**
   * Order dict by date
   */
  orderByDate(a: KeyValue<string, Transaction[]>, b: KeyValue<string, Transaction[]>): number {
    const aDate: number = getTime(parseISO(a.key));
    const bDate: number = getTime(parseISO(b.key));
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
