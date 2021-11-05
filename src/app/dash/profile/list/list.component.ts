import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { Api } from '@shared/classes/api';
import { Profile } from '@shared/interfaces/profile';
import { ProfileFormModalComponent } from '@shared/modules/profile-form-modal/profile-form-modal.component';
import { ProfileService } from '@shared/services/profile.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  readonly faEdit: IconDefinition = faPen;

  profile: Profile;

  profiles: Profile[];

  constructor(private router: Router,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    /**
     * Watch selected profile
     */
    this.subscription = ProfileService.profile.subscribe((data: Profile): void => {
      this.profile = data;
    });
    /**
     * Load profile list
     */
    Api.profile.list().subscribe((data: Profile[]): void => {
      if (!data.length) {
        this.add();
      }
      this.profiles = data;
    });
  }

  /**
   * Select a profile and go to dashboard
   */
  select(profile: Profile): void {
    ProfileService.profile.next(profile);
    this.router.navigateByUrl('/');
  }

  /**
   * Open up profile form modal for adding
   */
  add(): void {
    this.modalService.show(ProfileFormModalComponent, {
      class: 'modal-sm',
      initialState: {
        redirectToDetailsOnCreate: true,
      },
    });
  }

  /**
   * Open profile form modal for editing
   */
  edit(profile: Profile): void {
    this.modalService.show(ProfileFormModalComponent, {
      class: 'modal-sm',
      initialState: { profile },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
