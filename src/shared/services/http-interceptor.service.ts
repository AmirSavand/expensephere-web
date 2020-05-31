import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { ProfileService } from '@shared/services/profile.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {

  private static readonly PROFILE_ENDPOINTS: string[] = ['transaction', 'wallet', 'category', 'event'];

  constructor(private auth: AuthService) {
  }

  /**
   * @param request The outgoing request to handle
   * @param next The next interceptor in the chain, or the backend if no interceptors in the chain.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = AuthService.token;
    if (token) {
      /**
       * Include profile for some API calls
       */
      const params: { [p: string]: string } = {};
      if (request.method === 'GET') {
        if (HttpInterceptorService.PROFILE_ENDPOINTS.some((substr: string): boolean => request.url.includes(substr))) {
          params.profile = String(ProfileService.profile.id);
        }
      }
      /**
       * Update request with new params and headers
       */
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${token}`,
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
