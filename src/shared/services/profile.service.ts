import { Injectable } from '@angular/core';
import { Api } from '@shared/classes/api';
import { Profile } from '@shared/interfaces/profile';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  /**
   * Storage key for selected profile
   */
  private static readonly STORAGE_KEY_PROFILE = 'profile';

  /**
   * Selected profile
   */
  static readonly profile: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);

  /**
   * @returns Profile list data
   */
  static get profiles(): Profile[] {
    if (localStorage.getItem('profiles')) {
      return JSON.parse(localStorage.getItem('profiles'));
    }
    return [];
  }

  /**
   * Must be called 1 time to load data from storage
   */
  static initiate() {
    /**
     * Load current profile data from storage for profile subject.
     */
    const profile: string = localStorage.getItem(ProfileService.STORAGE_KEY_PROFILE);
    if (profile) {
      ProfileService.profile.next(JSON.parse(profile));
    }
    /**
     * Watch profile updates and save it to storage
     */
    ProfileService.profile.subscribe((data: Profile): void => {
      if (data) {
        localStorage.setItem(ProfileService.STORAGE_KEY_PROFILE, JSON.stringify(data));
      } else {
        localStorage.removeItem(ProfileService.STORAGE_KEY_PROFILE);
      }
    });
  }

  /**
   * Refresh selected profile data from API
   */
  refresh(): void {
    Api.profile.retrieve(ProfileService.profile.value.id).subscribe((profile: Profile): void => {
      ProfileService.profile.next(profile);
    });
  }
}
