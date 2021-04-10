import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from '@shared/classes/api';
import { AuthResponse } from '@shared/interfaces/auth-response';
import { AuthToken } from '@shared/interfaces/auth-token';
import { Profile } from '@shared/interfaces/profile';
import { User } from '@shared/interfaces/user';
import { ProfileService } from '@shared/services/profile.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) {
    /**
     * Is user authenticated?
     * And is user authentication data old?
     * Refresh it then (by redirecting user to refresh page).
     */
    if (AuthService.isAuth() &&
      AuthService.STORAGE_VERSION !== Number(localStorage.getItem(AuthService.STORAGE_VERSION_KEY))) {
      this.router.navigateByUrl(AuthService.OLD_AUTHENTICATION_REDIRECT);
    }
  }

  /**
   * Storage version to use to force to reload authentication data in storage
   */
  private static readonly STORAGE_VERSION = 3;

  /**
   * Storage key for storage version
   */
  private static readonly STORAGE_VERSION_KEY = 'version';

  /**
   * Storage key for authentication token
   */
  private static readonly STORAGE_TOKEN_KEY = 'token';

  /**
   * Where to redirect after sign out
   */
  private static readonly SIGN_OUT_REDIRECT = '/user/sign-in';

  /**
   * Where to redirect after sign in
   */
  static readonly SIGN_IN_REDIRECT = '/';

  /**
   * Where to redirect after sign in without profiles
   */
  static readonly SIGN_IN_REDIRECT_NO_PROFILE = '/dash/profile/list';

  /**
   * Where to redirect after sign in without profiles
   */
  static readonly OLD_AUTHENTICATION_REDIRECT = '/user/refresh';

  /**
   * Authentication user subject
   */
  private static userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(AuthService.getUser());

  /**
   * Authenticated user
   */
  static user: Observable<User> = AuthService.userSubject.asObservable();

  /**
   * Parse JWT from token.
   *
   * @param token JWT.
   *
   * @return Parsed JWT token.
   */
  private static parseJwt(token: string): AuthToken {
    const base64Url = token.split('.')[1];
    if (typeof base64Url === 'undefined') {
      return null;
    }
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }

  /**
   * @returns User data from localStorage
   */
  private static getUser(): User | null {
    const data: string = localStorage.getItem('user');
    if (data) {
      return JSON.parse(data) as User;
    }
    return null;
  }

  /**
   * @return Is user authenticated
   */
  static isAuth(): boolean {
    return Boolean(localStorage.getItem(AuthService.STORAGE_TOKEN_KEY));
  }

  /**
   * Set or update user data and update subscribers
   */
  static setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    AuthService.userSubject.next(user);
  }

  /**
   * Save/update token to storage
   */
  static set token(token: string) {
    const jwt: AuthToken = AuthService.parseJwt(token);
    if (jwt) {
      localStorage.setItem(AuthService.STORAGE_TOKEN_KEY, token);
    }
  }

  /**
   * @returns Stored token from storage
   */
  static get token(): string {
    return localStorage.getItem(AuthService.STORAGE_TOKEN_KEY);
  }

  /**
   * Save user data and profiles
   */
  saveUserAndProfile(user: User, profiles: Profile[]): void {
    // Store user
    AuthService.setUser(user);
    // Store storage version
    localStorage.setItem(AuthService.STORAGE_VERSION_KEY, String(AuthService.STORAGE_VERSION));
    // Check profiles
    if (profiles.length) {
      // Store a profile as selected profile
      ProfileService.profile.next(profiles[0]);
      this.router.navigateByUrl(AuthService.SIGN_IN_REDIRECT);
    } else {
      this.router.navigateByUrl(AuthService.SIGN_IN_REDIRECT_NO_PROFILE);
    }
  }

  /**
   * Un-authenticate and redirect
   */
  signOut(redirect: boolean = true): void {
    if (redirect) {
      this.router.navigateByUrl(AuthService.SIGN_OUT_REDIRECT);
    }
    AuthService.userSubject.next(null);
    localStorage.clear();
  }

  /**
   * Sign user in
   * @param payload Username and password
   * @return String observable which can be subscribed to.
   */
  signIn(payload: { username: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${Api.base}auth/`, payload).pipe(
      map((data: AuthResponse): AuthResponse => {
        // Store token, user and profile
        AuthService.token = data.token;
        this.saveUserAndProfile(data.user, data.profiles);
        return data;
      }),
    );
  }

  /**
   * Sign user up
   */
  signUp(payload: { email: string, username: string, password: string }): Observable<void> {
    return this.http.post(Api.base + 'user/', payload).pipe(map((): void => {
      this.signIn(payload).subscribe();
    }));
  }

  /**
   * Change user password
   */
  changePassword(payload: {
    old_password: string,
    new_password1: string,
    new_password2: string,
  }): Observable<{ detail: string }> {
    return this.http.post<{ detail: string }>(`${Api.base}auth/password/change/`, payload);
  }

  /**
   * Send reset password token to user email
   *
   * @param email User email
   */
  resetPassword(email: string): Observable<{ detail: string }> {
    return this.http.post<{ detail: string }>(`${Api.base}auth/password/reset/`, { email });
  }

  /**
   * Change password on reset password
   *
   * @param payload Change password
   */
  resetPasswordConfirm(payload: {
    new_password1: string,
    new_password2: string,
    uid: string,
    token: string,
  }): Observable<{ detail: string }> {
    return this.http.post<{ detail: string }>(`${Api.base}auth/password/reset/confirm/`, payload);
  }
}
