import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ProfileService } from '@shared/services/profile.service';
import { PK } from '@shared/types/pk';
import { Observable } from 'rxjs';

/**
 * CRUD API model
 *
 * T is the type of data.
 * LT is the type of data returned in list.
 */
export class Crud<T, LT = T[]> {

  /**
   * @returns Full API endpoint URL
   */
  get endpoint(): string {
    return `${environment.api}${this.name}/`;
  }

  constructor(public http: HttpClient,
              public name: string,
              public profile?: boolean) {
  }

  /**
   * Get list of objects
   */
  list(params: { [key: string]: string } = {}): Observable<LT> {
    return this.http.get<LT>(this.endpoint, { params: Object.assign(params, String(ProfileService.PROFILE)) });
  }

  /**
   * Create a new object
   */
  create(payload: Partial<T>): Observable<T> {
    return this.http.post<T>(this.endpoint, Object.assign(payload, { profile: ProfileService.PROFILE }));
  }

  /**
   * Update a single object
   */
  update(pk: PK, payload: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.endpoint}${pk}/`, payload);
  }

  /**
   * Get a single object
   */
  retrieve(pk: PK): Observable<T> {
    return this.http.get<T>(`${this.endpoint}${pk}/`);
  }

  /**
   * Delete a single object
   */
  delete(pk: PK): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}${pk}/`);
  }
}
