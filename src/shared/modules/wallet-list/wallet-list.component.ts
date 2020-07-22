import { Component, Input } from '@angular/core';
import { Color } from '@shared/classes/color';
import { Wallet } from '@shared/interfaces/wallet';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.scss'],
})
export class WalletListComponent {

  readonly style = Color.style;

  @Input() wallets: Wallet[];

  @Input() columnClass = 'col-xl-4';
}
