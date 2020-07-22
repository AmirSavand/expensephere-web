import { Component, Input } from '@angular/core';
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
export class TransactionListComponent {

  readonly style = Color.style;
  readonly expenseKind = ExpenseKind;

  @Input() transactions: Transaction[];

  @Input() columnClass = 'col-xl-4';

  @Input() wallets: Wallet[];

  @Input() categories: Category[];

  constructor(private modalService: BsModalService) {
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
