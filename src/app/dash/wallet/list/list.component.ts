import { Component, OnInit } from '@angular/core';
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
export class ListComponent implements OnInit {

  readonly filters: Filter[] = [
    {
      type: FilterType.TEXT,
      label: 'Search',
      key: 'search',
      value: '',
    },
    {
      type: FilterType.BOOLEAN,
      label: 'Archive',
      key: 'archive',
      value: false,
    },
  ];

  /**
   * Wallet list
   */
  wallets: Wallet[];

  /**
   * Params to filter data.
   */
  params: GetParams;

  constructor(private api: ApiService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    WalletFormModalComponent.CHANGE.subscribe((): void => {
      this.load();
    });
  }

  /**
   * Load wallets with filters
   */
  load(): void {
    this.api.wallet.list(this.params).subscribe((data: Wallet[]): void => {
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
