import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
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

  readonly faEdit: IconDefinition = faPen;

  /**
   * Wallet list
   */
  wallets: Wallet[];

  constructor(private api: ApiService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    /**
     * Load wallets
     */
    this.api.wallet.list().subscribe((data: Wallet[]): void => {
      this.wallets = data;
    });
  }

  /**
   * Open up wallet form modal
   */
  addWallet(): void {
    this.modalService.show(WalletFormModalComponent, { class: 'modal-sm' });
  }

  /**
   * Open wallet form modal for editing
   */
  editWallet(wallet: Wallet): void {
    this.modalService.show(WalletFormModalComponent, {
      class: 'modal-sm',
      initialState: { wallet },
    });
  }
}
