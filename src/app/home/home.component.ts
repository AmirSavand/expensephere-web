import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import { Color } from '@shared/classes/color';
import { Category } from '@shared/interfaces/category';
import { Profile } from '@shared/interfaces/profile';
import { Wallet } from '@shared/interfaces/wallet';
import { ApiService } from '@shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  readonly style = Color.style;
  readonly colorsReserved = Color.COLORS_RESERVED;

  readonly faWallets: IconDefinition = faLayerGroup;

  profiles: Profile[];

  wallets: Wallet[];

  categories: Category[];

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.profile.list().subscribe((data: Profile[]): void => {
      this.profiles = data;
    });
    this.api.wallet.list().subscribe((data: Wallet[]): void => {
      this.wallets = data;
    });
    this.api.category.list().subscribe((data: Category[]): void => {
      this.categories = data;
    });
  }
}
