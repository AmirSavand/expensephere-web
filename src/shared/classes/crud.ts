import { HttpClient } from '@angular/common/http';
import { ExportFile } from '@shared/enums/export-file';
import { GetParams } from '@shared/types/get-params';
import { Payload } from '@shared/types/payload';
import { PK } from '@shared/types/pk';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * CRUD API model (v21.2.28).
 *
 * T is the type of data.
 * LT is the type of data returned in list.
 */
export class Crud<T, LT = T[]> {

  /**
   * Must be set in API service before usage.
   */
  private static http: HttpClient;

  /**
   * Base API URL.
   */
  private static base: string;

  /**
   * Last cache value stored.
   *
   * @see enableCache
   */
  private cache: LT;

  /**
   * @returns Full API endpoint URL
   */
  get endpoint(): string {
    return `${Crud.base}${this.name}/`;
  }

  /**
   * @param name API endpoint.
   * @param enableCache Enable cache for list?
   */
  constructor(public name: string,
              public enableCache?: boolean) {
  }

  /**
   * Initiate and set static properties.
   */
  static initiate(http: HttpClient, base: string): void {
    Crud.http = http;
    Crud.base = base;
  }

  /**
   * Get list of objects
   */
  list(params: GetParams = {}, ignoreCache?: boolean): Observable<LT> {
    if (this.enableCache && !ignoreCache && this.cache) {
      return of(this.cache);
    }
    return Crud.http.get<LT>(this.endpoint, { params }).pipe(map((data: LT): LT => {
      this.cache = data;
      return data;
    }));
  }

  /**
   * Create a new object
   */
  create(payload: Payload<T>): Observable<T> {
    return Crud.http.post<T>(this.endpoint, payload);
  }

  /**
   * Create a new file upload object.
   */
  upload(file: File): Observable<T> {
    const payload: FormData = new FormData();
    payload.append('file', file, file.name);
    return Crud.http.post<T>(this.endpoint, payload);
  }

  /**
   * Update a single object
   */
  update(pk: PK, payload: Payload<T>): Observable<T> {
    return Crud.http.patch<T>(`${this.endpoint}${pk}/`, payload);
  }

  /**
   * Get a single object
   */
  retrieve(pk: PK): Observable<T> {
    return Crud.http.get<T>(`${this.endpoint}${pk}/`);
  }

  /**
   * Delete a single object
   */
  delete(pk: PK): Observable<void> {
    return Crud.http.delete<void>(`${this.endpoint}${pk}/`);
  }

  /**
   * Download action endpoint file from API
   */
  download(action: ExportFile, file: string, params: GetParams = {}): Observable<Blob> {
    return Crud.http.get(
      `${this.endpoint}${action}/`,
      { responseType: 'blob', params },
    ).pipe(map((data: Blob): Blob => {
      const a: HTMLAnchorElement = document.createElement('a');
      a.href = URL.createObjectURL(data);
      a.download = `${file}.${action}`;
      a.click();
      a.remove();
      return data;
    }));
  }
}
