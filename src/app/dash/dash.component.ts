import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarView } from '@app/dash/shared/enums/sidebar-view';
import { environment } from '@environments/environment';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons/faCalendarAlt';
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons/faCloudDownloadAlt';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons/faFileInvoice';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faRetweet } from '@fortawesome/free-solid-svg-icons/faRetweet';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons/faTachometerAlt';
import { faTags } from '@fortawesome/free-solid-svg-icons/faTags';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle';
import { Api } from '@shared/classes/api';
import { Color } from '@shared/classes/color';
import { Profile } from '@shared/interfaces/profile';
import { User } from '@shared/interfaces/user';
import { CategoryFormModalComponent } from '@shared/modules/category-form-modal/category-form-modal.component';
import { EventFormModalComponent } from '@shared/modules/event-form-modal/event-form-modal.component';
import { ProfileFormModalComponent } from '@shared/modules/profile-form-modal/profile-form-modal.component';
import { TransactionFormModalComponent } from '@shared/modules/transaction-form-modal/transaction-form-modal.component';
import { WalletFormModalComponent } from '@shared/modules/wallet-form-modal/wallet-form-modal.component';
import { AuthService } from '@shared/services/auth.service';
import { ProfileService } from '@shared/services/profile.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
})
export class DashComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  readonly sidebarView = SidebarView;
  readonly style = Color.style;
  readonly home = environment.home;

  readonly faAdd: IconDefinition = faPlus;
  readonly faView: IconDefinition = faChevronDown;
  readonly faSidebarToggle: IconDefinition = faBars;
  readonly faBack: IconDefinition = faChevronUp;
  readonly faSignOut: IconDefinition = faSignOutAlt;
  readonly faSettings: IconDefinition = faCog;
  readonly faWallets: IconDefinition = faLayerGroup;
  readonly faExport: IconDefinition = faCloudDownloadAlt;
  readonly faInvoice: IconDefinition = faFileInvoice;
  readonly faMore: IconDefinition = faEllipsisV;
  readonly faPhoto: IconDefinition = faUserCircle;

  readonly faDashboard: IconDefinition = faTachometerAlt;
  readonly faTransactions: IconDefinition = faRetweet;
  readonly faCategories: IconDefinition = faTags;
  readonly faCalendar: IconDefinition = faCalendarDay;
  readonly faEvents: IconDefinition = faCalendarAlt;
  readonly faProfile: IconDefinition = faUser;
  readonly faSelected: IconDefinition = faCheckCircle;
  readonly faNotSelected: IconDefinition = faCircle;

  /**
   * Authenticated user data
   */
  user: User;

  /**
   * Selected profile data
   */
  profile: Profile;

  /**
   * Profile list
   */
  profiles: Profile[];

  /**
   * What other view that sidebar is showing
   */
  sidebarViewSelected: SidebarView = SidebarView.MAIN;

  /**
   * Sidebar toggle status (used for mobile only)
   */
  sidebarClose = true;

  constructor(public auth: AuthService,
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
    /**
     * Watch selected profile data
     */
    this.subscription = ProfileService.profile.subscribe((data: Profile): void => {
      this.profile = data;
    });
    /**
     * Watch route changes to close sidebar
     */
    this.router.events.subscribe((): void => {
      this.sidebarClose = true;
    });
  }

  /**
   * Select a profile
   */
  select(profile: Profile): void {
    if (this.profile.id !== profile.id) {
      ProfileService.profile.next(profile);
      this.router.navigate(['/']);
    }
  }

  /**
   * Go to user sidebar view or get out of it
   */
  toggleUserView(): void {
    if (this.sidebarViewSelected === SidebarView.USER) {
      this.sidebarViewSelected = SidebarView.MAIN;
    } else {
      this.sidebarViewSelected = SidebarView.USER;
      Api.profile.list().subscribe((profiles: Profile[]): void => {
        this.profiles = profiles;
      });
    }
  }

  /**
   * Open up profile form modal for adding
   */
  addProfile(): void {
    this.toggleUserView();
    this.modalService.show(ProfileFormModalComponent, { class: 'modal-sm' });
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
