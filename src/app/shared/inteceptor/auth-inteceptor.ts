// auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { KeyFormatterService } from '../services/key-formatter.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private keyFormatter: KeyFormatterService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the access token
    const accessToken = this.authService.getAccessToken();

    // Clone the request and add the Authorization header if the access token exists
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    // Continue with the request
    return next.handle(request).pipe(
      catchError((error) => {
        // If the request returns an error, check for unauthorized response
        if (error.status === 401) {
          // Get the refresh token
          const refreshToken = this.authService.getRefreshToken();

          // If there is no refresh token, the user is not authenticated or tokens have expired
          if (!refreshToken) {
            this.authService.logout(); // You can implement the logout method in AuthService
            return throwError('User not authenticated or tokens have expired.');
          }

          // If there is a refresh token, try to refresh the access token
          return this.authService.refreshAccessToken(refreshToken).pipe(
            switchMap((newAccessToken) => {
              // Update the access token
              this.authService.setAccessToken(newAccessToken);

              // Clone the original request and add the new access token in the header
              const authReq = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });

              // Retry the request with the new access token
              return next.handle(authReq);
            }),
            catchError((refreshError) => {
              this.authService.logout(); // Handle refresh token error, you might want to handle this differently
              return throwError(refreshError);
            })
          );
        }

        // For other errors, just pass them along
        return throwError(error);
      }),
      map((event: HttpEvent<any>) => {
        // If it's an HttpResponse, process the response body to format the keys
        if (event instanceof HttpResponse) {
          return event.clone({ body: this.formatKeys(event.body) });
        }

        return event;
      })
    );
  }

  private formatKeys(data: any): any {
    if (!data || typeof data !== 'object') {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.formatKeys(item));
    }

    const formattedData: any = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const formattedKey = this.keyFormatter.toCamelCase(key);
        formattedData[formattedKey] = this.formatKeys(data[key]);
      }
    }

    return formattedData;
  }
}
