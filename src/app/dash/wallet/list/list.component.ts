import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Wallet } from '@shared/interfaces/wallet';
import { WalletFormModalComponent } from '@shared/modules/wallet-form-modal/wallet-form-modal.component';
import { ApiService } from '@shared/services/api.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  wallets: Wallet[];

  constructor(private api: ApiService,
              private router: Router,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.api.wallet.list().subscribe((data: Wallet[]): void => {
      if (!data.length) {
        this.addWallet();
      }
      this.wallets = data;
    });
  }

  /**
   * Open up wallet form modal
   */
  addWallet(): void {
    this.modalService.show(WalletFormModalComponent);
  }

  /**
   * Open wallet form modal for editing
   */
  editWallet(wallet: Wallet): void {
    this.modalService.show(WalletFormModalComponent, { initialState: { wallet } });
  }
}
