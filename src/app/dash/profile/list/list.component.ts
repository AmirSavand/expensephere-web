import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { Profile } from '@shared/interfaces/profile';
import { ProfileFormModalComponent } from '@shared/modules/profile-form-modal/profile-form-modal.component';
import { ApiService } from '@shared/services/api.service';
import { ProfileService } from '@shared/services/profile.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  readonly faEdit: IconDefinition = faPen;

  profiles: Profile[];

  profileSelected = ProfileService.profile;

  constructor(private api: ApiService,
              private router: Router,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.api.profile.list().subscribe((data: Profile[]): void => {
      if (!data.length) {
        this.router.navigateByUrl('/dash/profile/add');
      }
      this.profiles = data;
    });
  }

  /**
   * Select a profile and go to dashboard
   */
  select(profile: Profile): void {
    ProfileService.profile = profile;
    this.router.navigateByUrl('/');
  }

  /**
   * Open up wallet form modal
   */
  addProfile(): void {
    this.modalService.show(ProfileFormModalComponent, { class: 'modal-sm' });
  }

  /**
   * Open wallet form modal for editing
   */
  editProfile(profile: Profile): void {
    this.modalService.show(ProfileFormModalComponent, {
      class: 'modal-sm',
      initialState: { profile },
    });
  }
}
