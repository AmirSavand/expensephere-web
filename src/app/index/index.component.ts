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
     * Is authenticated?
     */
    if (AuthService.isAuth()) {
      /**
       * Has selected profile.
       * Go to dashboard.
       */
      if (ProfileService.profile.value) {
        this.router.navigateByUrl('/dash');
      }
      /**
       * Has no profiles.
       * Go to profile form to add one.
       */
      else {
        this.router.navigateByUrl('/dash/profile/add');
      }
    }
    /**
     * Is not authenticated.
     * Go to sign up.
     */
    else {
      this.router.navigateByUrl('/user/sign-up');
    }
  }
}
