import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { Color } from '@shared/classes/color';
import { Category } from '@shared/interfaces/category';
import { Profile } from '@shared/interfaces/profile';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
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
              private router: Router) {
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
      /**
       * Add total as a wallet
       */
      this.wallets.unshift({
        id: null,
        profile: null,
        archive: false,
        balance: ProfileService.profile.balance,
        color: Color.COLORS_RESERVED.total,
        icon: 'money3',
        name: 'Total',
      });
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
}
