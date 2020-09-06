import { Component, OnInit } from '@angular/core';
import { GetParams } from '@shared/interfaces/get-params';
import { Wallet } from '@shared/interfaces/wallet';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { WalletFormModalComponent } from '@shared/modules/wallet-form-modal/wallet-form-modal.component';
import { ApiService } from '@shared/services/api.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ListSelectionComponent } from 'src/shared/modules/list-selection/list-selection.component';
import { ListSelection } from 'src/shared/modules/list-selection/shared/list-selection';

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
    {
      type: FilterType.BOOLEAN,
      label: 'Archive',
      key: 'archive',
      value: false,
    },
  ];

  /**
   * List to be selected
   */
  selection: ListSelection[] = [];

  /**
   * Wallet list
   */
  wallets: Wallet[];

  constructor(private api: ApiService,
              private modalService: BsModalService) {
  }

  /**
   * Load wallets with filters
   */
  load(params: GetParams): void {
    this.api.wallet.list(params).subscribe((data: Wallet[]): void => {
      this.wallets = data;
      this.selection = [];
      for (const wallet of this.wallets) {
        this.selection.push({
          id: wallet.id,
          name: wallet.name,
          select: false,
        });
      }
    });
  }

  /**
   * Selection event
   * @param selectedList Selected wallet
   */
  selectionEvent(selectedList: ListSelection[]): void {
    console.log(selectedList);
    for (const select of selectedList) {
      const find: Wallet = this.wallets.find((item: Wallet): boolean => item.id === select.id);
      if (find) {
        find.select = select.select;
      }
    }
  }

  /**
   * Open up wallet form modal
   */
  addWallet(): void {
    this.modalService.show(WalletFormModalComponent, { class: 'modal-sm' });
  }
}
