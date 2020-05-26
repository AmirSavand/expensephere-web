import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '@shared/interfaces/profile';
import { ApiService } from '@shared/services/api.service';
import { ProfileService } from '@shared/services/profile.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  profiles: Profile[];

  profileSelected = ProfileService.profile;

  constructor(private api: ApiService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.api.profile.list().subscribe((data: Profile[]): void => {
      if (!data.length) {
        this.router.navigateByUrl('/profile/add');
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
}
