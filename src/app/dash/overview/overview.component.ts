import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import { Color } from '@shared/classes/color';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Profile } from '@shared/interfaces/profile';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { CategoryFormModalComponent } from '@shared/modules/category-form-modal/category-form-modal.component';
import { TransactionFormModalComponent } from '@shared/modules/transaction-form-modal/transaction-form-modal.component';
import { ApiService } from '@shared/services/api.service';
import { ProfileService } from '@shared/services/profile.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {

  readonly style = Color.style;
  readonly colorsReserved = Color.COLORS_RESERVED;
  readonly expenseKind = ExpenseKind;

  readonly faWallets: IconDefinition = faLayerGroup;

  profiles: Profile[];

  wallets: Wallet[];

  categories: Category[];

  transactions: Transaction[];

  transactionsGroups: Record<string, Transaction[]>;

  balanceChartResults: { name: string; value: number }[];
  categoryChartResults: { name: string; value: number }[];
  balanceChartColors: { name: string; value: string }[] = [];
  categoryChartColors: { name: string; value: string }[] = [];

  constructor(private api: ApiService,
              private router: Router,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.api.profile.list().subscribe((data: Profile[]): void => {
      if (!data.length) {
        ProfileService.clear();
        return;
      }
      this.profiles = data;
      this.balanceChartResults = [{
        name: 'Income',
        value: data[0].balance.income,
      }, {
        name: 'Expense',
        value: data[0].balance.expense,
      }];
      this.balanceChartColors = [{
        name: 'Income',
        value: AppComponent.PRIMARY_COLOR,
      }, {
        name: 'Expense',
        value: AppComponent.PRIMARY_COLOR + '44',
      }];
    });
    this.api.wallet.list().subscribe((wallets: Wallet[]): void => {
      if (!wallets.length) {
        this.router.navigateByUrl('/dash/wallet/add');
        return;
      }
      this.wallets = wallets;
      this.api.category.list().subscribe((data: Category[]): void => {
        this.categories = data;
        this.categoryChartResults = [];
        for (const category of data) {
          this.categoryChartResults.push({
            name: category.name,
            value: category.transactions_total || 0,
          });
          this.categoryChartColors.push({
            name: category.name,
            value: category.color,
          });
        }
      });
      this.api.transaction.list().subscribe((data: Transaction[]): void => {
        this.transactions = data;
        this.setupTransactionsGroup();
      });
    });
  }

  /**
   * Group transactions by date
   */
  setupTransactionsGroup() {
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
   * Open up category form modal
   */
  addCategory(): void {
    this.modalService.show(CategoryFormModalComponent, { class: 'modal-sm' });
  }

  /**
   * Open category form modal for editing
   */
  editCategory(category: Category): void {
    /**
     * Prevent editing transfer categories
     */
    if (category.kind === this.expenseKind.TRANSFER){
      alert('You can not edit this kind of category.');
      return;
    }
    this.modalService.show(CategoryFormModalComponent, {
      class: 'modal-sm',
      initialState: { category }
    });
  }
}
