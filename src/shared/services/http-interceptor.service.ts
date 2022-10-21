import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { ProfileService } from '@shared/services/profile.service';
import { GetParams } from '@shared/types/get-params';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {

  private static readonly PROFILE_ENDPOINTS: string[] = [
    'transaction',
    'transactions-page',
    'wallet',
    'category',
    'event',
    'invoice',
    'invoice-contact',
  ];

  private static shouldFilterByProfile(url: string, method: string): boolean {
    const endpoints: string[] = HttpInterceptorService.PROFILE_ENDPOINTS;
    return Boolean(
      method === 'GET' &&
      ProfileService.profile.value &&
      endpoints.some((endpoint: string): boolean => url.includes(`/${endpoint}/`)),
    );
  }

  constructor(private auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (AuthService.token) {
      /**
       * Include profile for some API calls
       */
      const params: GetParams = {};
      if (HttpInterceptorService.shouldFilterByProfile(request.url, request.method)) {
        let key = 'profile';
        if (request.url.includes('/transaction/')) {
          key = 'wallet__profile';
        }
        params[key] = String(ProfileService.profile.value.id);
      }
      /**
       * Include authentication token
       */
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${AuthService.token}`,
        },
        setParams: params,
      });
    }
    return next.handle(request).pipe(catchError((error: HttpErrorResponse): Observable<never> => {
      // Sign out if 401 response
      if (error.status === 401) {
        this.auth.signOut();
      }
      return throwError(error);
    }));
  }
}
