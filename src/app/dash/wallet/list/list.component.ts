import { Component } from '@angular/core';
import { ExpenseKind } from '@shared/enums/kind';
import { GetParams } from '@shared/interfaces/get-params';
import { Wallet } from '@shared/interfaces/wallet';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { WalletFormModalComponent } from '@shared/modules/wallet-form-modal/wallet-form-modal.component';
import { ApiService } from '@shared/services/api.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {

  readonly filters: Filter[] = [
    {
      type: FilterType.TEXT,
      label: 'Search',
      key: 'search',
      value: '',
    },
  ];

  /**
   * Wallet list
   */
  wallets: Wallet[];

  constructor(private api: ApiService,
              private modalService: BsModalService) {
  }

  /**
   * Load categories with filters
   */
  load(params: GetParams): void {
    this.api.wallet.list(params).subscribe((data: Wallet[]): void => {
      this.wallets = data;
    });
  }

  /**
   * Open up wallet form modal
   */
  addWallet(): void {
    this.modalService.show(WalletFormModalComponent, { class: 'modal-sm' });
  }
}
