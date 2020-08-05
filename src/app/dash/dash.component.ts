import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarView } from '@app/dash/shared/enums/sidebar-view';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons/faCalendarAlt';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import { faRetweet } from '@fortawesome/free-solid-svg-icons/faRetweet';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons/faTachometerAlt';
import { faTags } from '@fortawesome/free-solid-svg-icons/faTags';
import { Color } from '@shared/classes/color';
import { Profile } from '@shared/interfaces/profile';
import { User } from '@shared/interfaces/user';
import { Wallet } from '@shared/interfaces/wallet';
import { CategoryFormModalComponent } from '@shared/modules/category-form-modal/category-form-modal.component';
import { EventFormModalComponent } from '@shared/modules/event-form-modal/event-form-modal.component';
import { TransactionFormModalComponent } from '@shared/modules/transaction-form-modal/transaction-form-modal.component';
import { WalletFormModalComponent } from '@shared/modules/wallet-form-modal/wallet-form-modal.component';
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
  readonly profileService = ProfileService;

  readonly faView: IconDefinition = faChevronDown;
  readonly faSidebarToggle: IconDefinition = faBars;
  readonly faBack: IconDefinition = faChevronUp;
  readonly faSignOut: IconDefinition = faSignOutAlt;
  readonly faSettings: IconDefinition = faCog;
  readonly faWallets: IconDefinition = faLayerGroup;

  readonly faDashboard: IconDefinition = faTachometerAlt;
  readonly faTransactions: IconDefinition = faRetweet;
  readonly faCategories: IconDefinition = faTags;
  readonly faEvents: IconDefinition = faCalendarAlt;

  /**
   * Total balance as wallet
   */
  readonly total: Wallet = {
    id: null,
    profile: null,
    archive: false,
    balance: ProfileService.profile.balance,
    color: Color.COLORS_RESERVED.total,
    icon: 'money3',
    name: 'Total',
  };

  /**
   * Authenticated user data
   */
  user: User;

  /**
   * List of profiles
   */
  profiles: Profile[] = ProfileService.profiles;

  /**
   * What other view that sidebar is showing
   */
  sidebarViewSelected: SidebarView = SidebarView.MAIN;

  /**
   * Sidebar toggle status (used for mobile only)
   */
  sidebarClose = true;

  constructor(public auth: AuthService,
              private api: ApiService,
              private router: Router,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    /**
     * Watch authentication and user data
     */
    AuthService.user.subscribe((user: User): void => {
      this.user = user;
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

  /**
   * Open up wallet form modal
   */
  addWallet(): void {
    this.modalService.show(WalletFormModalComponent);
  }

  /**
   * Open up category form modal
   */
  addCategory(): void {
    this.modalService.show(CategoryFormModalComponent);
  }

  /**
   * Open up event form modal
   */
  addEvent(): void {
    this.modalService.show(EventFormModalComponent);
  }
}
