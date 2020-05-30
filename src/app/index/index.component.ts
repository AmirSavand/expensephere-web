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
    if (AuthService.isAuth()) {
      if (ProfileService.profiles.length) {
        if (ProfileService.profile) {
          this.router.navigateByUrl('/dash');
        } else {
          this.router.navigateByUrl('/user/profile/list');
        }
      } else {
        this.router.navigateByUrl('/user/profile/add');
      }
    } else {
      this.router.navigateByUrl('/user/join');
    }
  }
}
