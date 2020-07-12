import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { ProfileService } from '@shared/services/profile.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    /**
     * Is authenticated
     */
    if (AuthService.isAuth()) {
      /**
       * Has profiles
       */
      if (ProfileService.profiles.length) {
        /**
         * Has selected profile
         * Go to dashboard
         */
        if (ProfileService.profile) {
          this.router.navigateByUrl('/dash');
        }
        /**
         * Has no selected profile
         * Go to profile list to select one
         */
        else {
          this.router.navigateByUrl('/dash/profile/list');
        }
      }
      /**
       * Has no profiles
       * Go to profile form to add one
       */
      else {
        this.router.navigateByUrl('/dash/profile/add');
      }
    }
    /**
     * Is not authenticated
     * Go to sign up
     */
    else {
      this.router.navigateByUrl('/user/sign-up');
    }
  }
}
