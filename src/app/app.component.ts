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

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    /**
     * Watch authentication and user data
     */
    AuthService.user.subscribe((): void => {
      if (AuthService.isAuth() && !ProfileService.profile) {
        if (ProfileService.profiles.length) {
          this.router.navigateByUrl('/user/profile/list');
        } else {
          this.router.navigateByUrl('/user/profile/add');
        }
      }
    });
  }
}
