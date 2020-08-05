import { Injectable } from '@angular/core';
import { Profile } from '@shared/interfaces/profile';
import { ApiService } from '@shared/services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  static get profiles(): Profile[] {
    if (localStorage.getItem('profiles')) {
      return JSON.parse(localStorage.getItem('profiles'));
    }
    return [];
  }

  static set profiles(value: Profile[]) {
    localStorage.setItem('profiles', JSON.stringify(value));
  }

  static get profile(): Profile {
    if (ProfileService.profiles && localStorage.getItem('profile')) {
      return ProfileService.profiles.find(profile => profile.id === Number(localStorage.getItem('profile')));
    }
  }

  static set profile(value: Profile) {
    localStorage.setItem('profile', String(value.id));
  }

  static clear() {
    localStorage.removeItem('profile');
    localStorage.removeItem('profiles');
  }

  constructor(private api: ApiService) {
  }

  /**
   * Load and save profiles to localStorage.
   * If there's no selected profile, select the first one.
   */
  load(): Observable<Profile[]> {
    return this.api.profile.list().pipe(map((data: Profile[]): Profile[] => {
      if (data.length) {
        ProfileService.profiles = data;
        if (!ProfileService.profile) {
          ProfileService.profile = ProfileService.profiles[0];
        }
      } else {
        ProfileService.clear();
      }
      return data;
    }));
  }
}
