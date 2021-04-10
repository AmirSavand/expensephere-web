import { Component, OnInit } from '@angular/core';
import { Api } from '@shared/classes/api';
import { GetParams } from '@shared/interfaces/get-params';
import { Wallet } from '@shared/interfaces/wallet';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { WalletFormModalComponent } from '@shared/modules/wallet-form-modal/wallet-form-modal.component';

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

  ngOnInit(): void {
    WalletFormModalComponent.CHANGE.subscribe((): void => {
      this.load();
    });
  }

  /**
   * Load wallets with filters
   */
  load(): void {
    Api.wallet.list(this.params).subscribe((data: Wallet[]): void => {
      this.wallets = data;
    });
  }
}
