import { Injectable } from '@angular/core';
import { Profile } from '@shared/interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  static get profiles(): Profile[] {
    if (localStorage.getItem('profiles')) {
      return JSON.parse(localStorage.getItem('profiles'));
    }
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
}
