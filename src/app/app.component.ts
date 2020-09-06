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
  static readonly PRIMARY_COLOR = '#474787';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    /**
     * Load profile data
     */
    ProfileService.initiate();
    /**
     * Watch authentication and user data
     */
    AuthService.user.subscribe((): void => {
      if (AuthService.isAuth() && !ProfileService.profile.value) {
        this.router.navigateByUrl('/dash/profile/add');
      }
    });
  }
}
