import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { Api } from '@shared/classes/api';
import { Color } from '@shared/classes/color';
import { ExpenseKind } from '@shared/enums/kind';
import { ApiResponse } from '@shared/interfaces/api-response';
import { Category } from '@shared/interfaces/category';
import { Profile } from '@shared/interfaces/profile';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { CategoryFormModalComponent } from '@shared/modules/category-form-modal/category-form-modal.component';
import { EventFormModalComponent } from '@shared/modules/event-form-modal/event-form-modal.component';
import { TransactionFormModalComponent } from '@shared/modules/transaction-form-modal/transaction-form-modal.component';
import { WalletFormModalComponent } from '@shared/modules/wallet-form-modal/wallet-form-modal.component';
import { ProfileService } from '@shared/services/profile.service';
import { GetParams } from '@shared/types/get-params';
import { addDays } from 'date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Utils } from 'src/shared/classes/utils';
import { MetricSpent } from 'src/shared/interfaces/metric-spent';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {

  /** On init subscription. */
  private subscription = new Subscription();

  /** On load subscriptions. */
  private subscriptions = new Subscription();

  readonly faLink: IconDefinition = faArrowRight;

  readonly filterText = 'Filtered by last 30 days';

  // Filters used for loading transactions.
  readonly transactionsFilter: GetParams = {};

  // Current profile..
  profile: Profile;

  // Wallet list.
  wallets: Wallet[];

  // Category list.
  categories: Category[];

  // Category list to show to user.
  categoriesToShow: Category[];

  // Transaction list.
  transactions: Transaction[];

  // Expense/income chart data.
  balanceChartResults: { name: string; value: number }[];

  // Balance chart colors.
  balanceChartColors: { name: string; value: string }[] = [];

  // Metrics spent for categories used for category chart and overview.
  categorySpentMetrics: MetricSpent[];

  // API response data for transactions.
  transactionsApiResponse: ApiResponse<Transaction>;

  // Show block of information for karma info (status).
  showKarmaInfo = false;

  constructor(private router: Router,
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
    this.subscription.add(ProfileService.profile.subscribe((profile: Profile): void => {
      this.profile = profile;
      this.loadData();
    }));
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
    this.categorySpentMetrics = null;
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
    /**
     * If there's a selected profile
     */
    if (this.profile) {
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
      this.subscriptions.add(Api.wallet.list().subscribe((wallets: Wallet[]): void => {
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
        this.subscriptions.add(Api.category.list().subscribe((data: Category[]): void => {
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
        }));
        /** Load transactions list. */
        this.subscriptions.add(this.loadTransactions());
      }));
      /** Load spent metrics for categories. */
      this.subscriptions.add(Api.category.action<MetricSpent[]>('metric-spent', {
        time_after: Utils.dateToUTCString(addDays(new Date(), -30)),
      }).subscribe({
        next: (data: MetricSpent[]): void => {
          this.categorySpentMetrics = data;
        },
      }));
    }
  }

  /**
   * Load transactions of this category.
   */
  loadTransactions(): Subscription {
    return Api.transaction.list(this.transactionsFilter).subscribe((data: ApiResponse<Transaction>): void => {
      this.transactions = data.results;
      this.transactionsApiResponse = data;
    });
  }
}
