import { Injectable } from '@angular/core';
import { Profile } from '@shared/interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  /**
   * Current profile data
   */
  public static PROFILE: Profile;
}
