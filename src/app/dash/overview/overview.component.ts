import { KeyValue } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { Color } from '@shared/classes/color';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Profile } from '@shared/interfaces/profile';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { WalletFormModalComponent } from '@shared/modules/wallet-form-modal/wallet-form-modal.component';
import { ApiService } from '@shared/services/api.service';
import { ProfileService } from '@shared/services/profile.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {

  /**
   * Maximum number of categories to show in category chart
   */
  private static MAX_CATEGORIES_IN_CHART = 7;

  private subscription: Subscription;

  readonly faLink: IconDefinition = faArrowRight;

  /**
   * Wallet list
   */
  wallets: Wallet[];

  /**
   * Category list
   */
  categories: Category[];

  /**
   * Category list to show to user
   */
  categoriesToShow: Category[];

  /**
   * Transaction list
   */
  transactions: Transaction[];

  /**
   * Transaction group list
   */
  transactionsGroups: Record<string, Transaction[]>;

  /**
   * Expense/income chart data
   */
  balanceChartResults: { name: string; value: number }[];

  /**
   * Top expense categories chart data
   */
  categoryChartResults: { name: string; value: number }[];

  /**
   * Balance chart colors
   */
  balanceChartColors: { name: string; value: string }[] = [];

  /**
   * Category chart colors
   */
  categoryChartColors: { name: string; value: string }[] = [];

  constructor(private api: ApiService,
              private router: Router,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    /**
     * Watch selected profile data
     */
    this.subscription = ProfileService.profile.subscribe((profile: Profile): void => {
      /**
       * If there's a selected profile
       */
      if (profile) {
        /**
         * Setup income/expense chart data
         */
        this.balanceChartResults = [{
          name: 'Income',
          value: profile.balance.income,
        }, {
          name: 'Expense',
          value: profile.balance.expense,
        }];
        this.balanceChartColors = [{
          name: 'Income',
          value: AppComponent.PRIMARY_COLOR,
        }, {
          name: 'Expense',
          value: AppComponent.PRIMARY_COLOR + '44',
        }];
        /**
         * Load wallet list
         */
        this.api.wallet.list().subscribe((wallets: Wallet[]): void => {
          /**
           * There are no wallets for this profile,
           * open the wallet form modal so user creates one.
           */
          if (!wallets.length) {
            this.modalService.show(WalletFormModalComponent);
            return;
          }
          /**
           * There are wallets, store them
           */
          this.wallets = wallets;
          /**
           * Add total as a wallet so it shows up on the UI
           */
          this.wallets.unshift({
            id: null,
            profile: null,
            archive: false,
            balance: profile.balance,
            color: Color.COLORS_RESERVED.total,
            icon: 'money3',
            name: 'Total',
          });
          /**
           * Load category list
           * We need all categories for transactions list and for creating the chart.
           */
          this.api.category.list().subscribe((data: Category[]): void => {
            /**
             * Store categories and sort them by transactions count
             */
            this.categories = data.sort((a: Category, b: Category): number => (
              b.transactions_count - a.transactions_count
            ));
            /**
             * User must see categories with transaction, sorted by total transactions and expense type only
             */
            this.categoriesToShow = data.filter((item: Category): boolean => (
              item.kind === ExpenseKind.EXPENSE && Boolean(item.transactions_total)
            ));
            /**
             * Setup top category chart.
             * We only need top X expense categories with values.
             */
            let chartCategories: Category[] = data.filter((item: Category): boolean => (
              item.kind === ExpenseKind.EXPENSE && Boolean(item.transactions_total)
            ));
            chartCategories = chartCategories.splice(0, OverviewComponent.MAX_CATEGORIES_IN_CHART);
            this.categoryChartResults = [];
            for (const category of chartCategories) {
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
          /**
           * Load transactions list
           */
          this.api.transaction.list().subscribe((data: Transaction[]): void => {
            this.transactions = data;
            this.setupTransactionsGroup();
          });
        });
      }
    });
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
