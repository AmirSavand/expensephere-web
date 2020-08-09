import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '@shared/interfaces/profile';
import { User } from '@shared/interfaces/user';
import { ApiService } from '@shared/services/api.service';
import { AuthService } from '@shared/services/auth.service';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss'],
})
export class RefreshComponent implements OnInit {

  private subscription: Subscription;

  constructor(private api: ApiService,
              private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (!AuthService.isAuth()) {
      this.router.navigateByUrl('/user/sign-in');
      return;
    }
    this.subscription = AuthService.user.subscribe((user: User): void => {
      if (user) {
        forkJoin([
          this.api.user.retrieve(user.username),
          this.api.profile.list(),
        ]).subscribe((data: [User, Profile[]]): void => {
          this.auth.saveUserAndProfile(data[0], data[1]);
          this.subscription.unsubscribe();
        });
      }
    });
  }
}
