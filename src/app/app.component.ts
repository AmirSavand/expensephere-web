import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Crud } from '@shared/classes/crud';
import { AuthService } from '@shared/services/auth.service';
import { ProfileService } from '@shared/services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    // Setup crud class.
    Crud.initiate(this.http, environment.api);
    // Initiate profile service.
    ProfileService.initiate();
    /**
     * Watch authentication and user data.
     * If there's no profile, redirect to profile creation.
     */
    AuthService.user.subscribe((): void => {
      if (AuthService.isAuth() && !ProfileService.profile.value) {
        this.router.navigateByUrl('/dash/profile/add');
      }
    });
  }
}
