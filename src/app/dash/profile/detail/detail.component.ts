import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Api } from '@shared/classes/api';
import { Profile } from '@shared/interfaces/profile';
import { Wallet } from '@shared/interfaces/wallet';
import { WalletFormModalComponent } from '@shared/modules/wallet-form-modal/wallet-form-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Transaction } from '@shared/interfaces/transaction';
import { ApiResponse } from '@shared/interfaces/api-response';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  readonly filterText = 'Filtered by last 30 days';

  profile: Profile;

  wallets: Wallet[];

  transactions: Transaction[];

  // Expense/income chart data.
  balanceChartResults: { name: string; value: number }[];

  // Balance chart colors.
  balanceChartColors: { name: string; value: string }[] = [];


  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params): void => {
      if (data.id === 'add') {
        this.router.navigate(['/dash', 'profile', 'list']);
      }
      Api.profile.retrieve(data.id).subscribe((profile: Profile): void => {
        this.profile = profile;
      });
      Api.wallet.list({ profile: data.id }).subscribe((wallets: Wallet[]): void => {
        this.wallets = wallets;
        if (!wallets.length) {
          this.modalService.show(WalletFormModalComponent);
        }
      });
      Api.transaction.list().subscribe((data: ApiResponse<Transaction>): void => {
        this.transactions = data.results;
      });
    });
  }
}
