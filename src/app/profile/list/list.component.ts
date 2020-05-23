import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '@shared/interfaces/profile';
import { ApiService } from '@shared/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  profiles: Profile[];

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
}
