import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { Color } from '@shared/classes/color';
import { Wallet } from '@shared/interfaces/wallet';
import { WalletFormModalComponent } from '@shared/modules/wallet-form-modal/wallet-form-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.scss'],
})
export class WalletListComponent {

  readonly style = Color.style;

  readonly faEdit: IconDefinition = faPen;

  @Input() wallets: Wallet[];

  @Input() columnClass = 'col-xl-4';

  constructor(private modalService: BsModalService) {
  }

  /**
   * Open wallet form modal for editing
   */
  editWallet(wallet: Wallet): void {
    const modalRef: BsModalRef = this.modalService.show(WalletFormModalComponent, {
      class: 'modal-sm',
      initialState: { wallet },
    });
    (modalRef.content as WalletFormModalComponent).updateWallet.subscribe((data: Wallet): void => {
      /**
       * Delete wallet, instantly in list
       */
      if (!data) {
        this.wallets.splice(this.wallets.indexOf(wallet), 1);
        return;
      }
      /**
       * Find the updated wallet
       */
      const find: Wallet = this.wallets.find((item: Wallet): boolean => item.id === data.id);
      if (!find) {
        return;
      }
      /**
       * Update wallet data instantly in list
       */
      Object.keys(data).forEach((key: string): void => {
        find[key] = data[key];
      });
    });
  }

  getWalletLink(wallet: Wallet): (string | number)[] {
    const output: (string | number)[] = ['/dash', 'wallet'];
    if (wallet.id) {
      output.push(wallet.id);
    }
    return output;
  }
}
