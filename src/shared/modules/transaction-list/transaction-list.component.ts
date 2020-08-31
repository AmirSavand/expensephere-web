import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
export class TransactionListComponent implements OnInit {

  readonly style = Color.style;
  readonly faEdit: IconDefinition = faPen;
  readonly expenseKind = ExpenseKind;

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

  /**
   * Group transactions by date
   */
  setupTransactionsGroup(): void {
    this.transactionsGroups = {};
    for (const transaction of this.transactions) {
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

  /**
   * @returns Wallet by ID
   */
  getWallet(id: number): Wallet {
    return this.wallets.find(item => item.id === id);
  }

  /**
   * @returns Category by ID
   */
  getCategory(id: number): Category {
    return this.categories.find(item => item.id === id);
  }
}
