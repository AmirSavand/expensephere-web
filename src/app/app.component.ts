import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { ProfileService } from '@shared/services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  /**
   * Primary color of the app
   */
  static readonly PRIMARY_COLOR = getComputedStyle(document.body).getPropertyValue('--primary');

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    /**
     * Watch authentication and user data
     */
    AuthService.user.subscribe((): void => {
      if (AuthService.isAuth() && !ProfileService.profile) {
        if (ProfileService.profiles.length) {
          this.router.navigateByUrl('/dash/profile/list');
        } else {
          this.router.navigateByUrl('/dash/profile/add');
        }
      }
    });
  }
}
