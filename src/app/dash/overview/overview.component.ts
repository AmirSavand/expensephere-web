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
import { CategoryFormModalComponent } from '@shared/modules/category-form-modal/category-form-modal.component';
import { EventFormModalComponent } from '@shared/modules/event-form-modal/event-form-modal.component';
import { TransactionFormModalComponent } from '@shared/modules/transaction-form-modal/transaction-form-modal.component';

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
  private subscriptions: Subscription[] = [];

  readonly faLink: IconDefinition = faArrowRight;

  /**
   * Current profile.
   */
  private profile: Profile;

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
     * Load all overview data on transaction changes.
     */
    TransactionFormModalComponent.CHANGE.subscribe((): void => {
      this.loadData();
    });
    /**
     * Load all overview data on wallet changes.
     */
    WalletFormModalComponent.CHANGE.subscribe((): void => {
      this.loadData();
    });
    /**
     * Load all overview data on category changes.
     */
    CategoryFormModalComponent.CHANGE.subscribe((): void => {
      this.loadData();
    });
    /**
     * Load all overview data on event changes.
     */
    EventFormModalComponent.CHANGE.subscribe((): void => {
      this.loadData();
    });
    /**
     * Watch selected profile data
     */
    this.subscription = ProfileService.profile.subscribe((profile: Profile): void => {
      this.profile = profile;
      this.loadData();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Load all overview data(charts, wallets, categories, etc).
   */
  loadData(): void {
    /**
     * Reset data and stop all API calls
     */
    this.wallets = null;
    this.categories = null;
    this.categoriesToShow = null;
    this.transactions = null;
    this.subscriptions.forEach((subscription: Subscription): void => subscription.unsubscribe());
    /**
     * If there's a selected profile
     */
    if (this.profile) {
      /**
       * We use this to push to subscriptions list
       */
      let subscription: Subscription;
      /**
       * Setup income/expense chart data
       */
      this.balanceChartResults = [{
        name: 'Income',
        value: this.profile.balance.income,
      }, {
        name: 'Expense',
        value: this.profile.balance.expense,
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
      subscription = this.api.wallet.list().subscribe((wallets: Wallet[]): void => {
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
          balance: this.profile.balance,
          color: Color.COLORS_RESERVED.total,
          icon: 'money3',
          name: 'Total',
        });
        /**
         * Load category list
         * We need all categories for transactions list and for creating the chart.
         */
        subscription = this.api.category.list().subscribe((data: Category[]): void => {
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
        this.subscriptions.push(subscription);
        /**
         * Load transactions list
         */
        subscription = this.api.transaction.list().subscribe((data: Transaction[]): void => {
          this.transactions = data;
        });
        this.subscriptions.push(subscription);
      });
      this.subscriptions.push(subscription);
    }
  }
}
