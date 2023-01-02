import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faChevronRight, faPen } from '@fortawesome/free-solid-svg-icons';
import { Api } from '@shared/classes/api';
import { Utils } from '@shared/classes/utils';
import { PRIMARY_COLOR } from '@shared/constants/primary-color';
import { ApiResponse } from '@shared/interfaces/api-response';
import { Category } from '@shared/interfaces/category';
import { MetricSpent } from '@shared/interfaces/metric-spent';
import { Profile } from '@shared/interfaces/profile';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { ProfileService } from '@shared/services/profile.service';
import { addDays } from 'date-fns';
import { Subscription } from 'rxjs';
import { ProfileFormModalComponent } from '@shared/modules/profile-form-modal/profile-form-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {

  readonly faBreadcrumbArrow: IconDefinition = faChevronRight;
  readonly filterText = 'Filtered by last 30 days';
  
  /** Selected profile ID. */
  profileSelected: Profile;

  /** Viewing profile details. */
  profile: Profile;

  /** Viewing profile wallet list. */
  wallets: Wallet[];

  /** Page error flag */
  error = false;

  /** Viewing profile category list. */
  categories: Category[];

  /** Viewing profile transaction list. */
  transactions: Transaction[];

  /** Viewing profile metrics spent for categories. */
  categorySpentMetrics: MetricSpent[];

  /** Viewing profile expense and income chart data. */
  balanceChartResults: { name: string; value: number }[];

  /** Viewing profile balance chart colors. */
  balanceChartColors: { name: string; value: string }[] = [];

  readonly faEdit: IconDefinition = faPen;

  readonly faVisit = faArrowRight;

  private readonly subscriptions = new Subscription();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    /** Get selected profile data. */
    this.subscriptions.add(ProfileService.profile.subscribe({
      next: (data: Profile): void => {
        this.profileSelected = data;
      },
    }));
    /** Watch query param to get ID of profile. */
    this.subscriptions.add(this.route.params.subscribe((data: Params): void => {
      /** Reset variables. */
      this.error = false;
      delete this.profile;
      delete this.categories;
      delete this.transactions;
      delete this.categorySpentMetrics;
      delete this.balanceChartResults;
      this.balanceChartColors = [];
      /** Load profile details. */
      Api.profile.retrieve(data.id).subscribe({
        next: (profile: Profile): void => {
          /** Store profile details. */
          this.profile = profile;
          /** Setup chart results. */
          this.balanceChartResults = [
            {
              name: 'Income',
              value: this.profile.balance.income,
            },
            {
              name: 'Expense',
              value: this.profile.balance.expense,
            },
          ];
          /** Setup chart colors. */
          this.balanceChartColors = [
            {
              name: 'Income',
              value: PRIMARY_COLOR,
            },
            {
              name: 'Expense',
              value: PRIMARY_COLOR + '44',
            },
          ];
          console.log(data.id);
          /** Load viewing profile wallets. */
          Api.wallet.list({
            profile: data.id,
            no_intercept: null,
          }).subscribe({
            next: (wallets: Wallet[]): void => {
              this.wallets = wallets;
            },
          });
          /** Load viewing profile transactions. */
          Api.transaction.list({
            wallet__profile: data.id,
            no_intercept: null,
          }).subscribe({
            next: (data: ApiResponse<Transaction>): void => {
              this.transactions = data.results;
            },
          });
          /** Load viewing profile categories. */
          Api.category.list({
            profile: data.id,
            no_intercept: null,
          }).subscribe({
            next: (data: Category[]): void => {
              this.categories = data;
            },
          });
          /** Load viewing profile category spent metrics. */
          Api.category.action<MetricSpent[]>('metric-spent', {
            profile: data.id,
            no_intercept: null,
            time_after: Utils.dateToUTCString(addDays(new Date(), -30)),
          }).subscribe({
            next: (data: MetricSpent[]): void => {
              this.categorySpentMetrics = data;
            },
          });
        },
        error: (): void => {
          this.error = true;
        },
      });
    }));
  }

  /**
   * Select a profile and go to dashboard
   */
  select(): void {
    ProfileService.profile.next(this.profile);
    this.router.navigateByUrl('/');
  }

  /**
   * Open profile form modal for editing
   */
  edit(): void {
    this.modalService.show(ProfileFormModalComponent, {
      class: 'modal-sm',
      initialState: { profile: this.profile },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
