import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarView } from '@app/dash/shared/enums/sidebar-view';
import { Navigation } from '@app/dash/shared/interfaces/navigation';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons/faCalendarAlt';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import { faMeteor } from '@fortawesome/free-solid-svg-icons/faMeteor';
import { faRetweet } from '@fortawesome/free-solid-svg-icons/faRetweet';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons/faTachometerAlt';
import { faTags } from '@fortawesome/free-solid-svg-icons/faTags';
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet';
import { Color } from '@shared/classes/color';
import { Profile } from '@shared/interfaces/profile';
import { User } from '@shared/interfaces/user';
import { Wallet } from '@shared/interfaces/wallet';
import { TransactionFormModalComponent } from '@shared/modules/transaction-form-modal/transaction-form-modal.component';
import { ApiService } from '@shared/services/api.service';
import { AuthService } from '@shared/services/auth.service';
import { ProfileService } from '@shared/services/profile.service';
import { WalletService } from '@shared/services/wallet.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
})
export class DashComponent implements OnInit {

  readonly sidebarView = SidebarView;
  readonly style = Color.style;
  readonly colorsReserved = Color.COLORS_RESERVED;
  readonly walletService = WalletService;
  readonly profileService = ProfileService;

  readonly faView: IconDefinition = faChevronDown;
  readonly faBack: IconDefinition = faChevronUp;
  readonly faSignOut: IconDefinition = faSignOutAlt;
  readonly faSettings: IconDefinition = faCog;
  readonly faDropdown: IconDefinition = faChevronDown;
  readonly faWallets: IconDefinition = faLayerGroup;

  readonly faDashboard: IconDefinition = faTachometerAlt;
  readonly faTransactions: IconDefinition = faRetweet;
  readonly faCategories: IconDefinition = faTags;
  readonly faEvents: IconDefinition = faCalendarAlt;

  /**
   * Authenticated user data
   */
  user: User;

  /**
   * List of profiles
   */
  profiles: Profile[] = ProfileService.profiles;

  /**
   * List of wallets
   */
  wallets: Wallet[];

  /**
   * What other view that sidebar is showing
   */
  sidebarViewSelected: SidebarView = SidebarView.MAIN;

  constructor(public auth: AuthService,
              private api: ApiService,
              private router: Router,
              private modalService: BsModalService) {
  }

  /**
   * @returns Selected wallet data
   */
  get walletSelected(): Wallet {
    return this.wallets.find((wallet: Wallet): boolean => wallet.id === WalletService.wallet);
  }

  ngOnInit(): void {
    /**
     * Watch authentication and user data
     */
    AuthService.user.subscribe((user: User): void => {
      this.user = user;
      /**
       * If user is authenticated
       */
      if (AuthService.isAuth()) {
        /**
         * If a profile is selected
         */
        if (ProfileService.profile) {
          /**
           * Get wallets
           */
          this.api.wallet.list().subscribe((data: Wallet[]): void => {
            this.wallets = data;
          });
        }
      }
    });
  }

  /**
   * Go to user sidebar view or get out of it
   */
  toggleUserView(): void {
    if (this.sidebarViewSelected === SidebarView.USER) {
      this.sidebarViewSelected = SidebarView.MAIN;
    } else {
      this.sidebarViewSelected = SidebarView.USER;
    }
  }

  /**
   * Open up transaction form modal
   */
  addTransaction(): void {
    this.modalService.show(TransactionFormModalComponent);
  }
}
