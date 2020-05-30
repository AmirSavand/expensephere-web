import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Wallet } from '@shared/interfaces/wallet';
import { ApiService } from '@shared/services/api.service';
import { ProfileService } from '@shared/services/profile.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  wallets: Wallet[];

  profileSelected = ProfileService.profile;

  constructor(private api: ApiService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.api.wallet.list().subscribe((data: Wallet[]): void => {
      if (!data.length) {
        this.router.navigateByUrl('/user/wallet/add');
      }
      this.wallets = data;
    });
  }
}
