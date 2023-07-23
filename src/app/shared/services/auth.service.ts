// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private authUrl = environment.apiUrl + 'auth/token/';

  constructor(private http: HttpClient) {}

  // Methods to manage access and refresh tokens

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  clearTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  // Method to handle user logout

  logout(): void {
    this.clearTokens();
    // Redirect the user to the login page or do any additional cleanup if needed
    // For example: this.router.navigate(['/login']);
  }

  // Method to handle token refreshing

  refreshAccessToken(refreshToken: string): Observable<string> {
    const refreshEndpoint = `${this.authUrl}/refresh/`; // Replace this with the API endpoint to refresh tokens

    return this.http.post<any>(refreshEndpoint, { refreshToken }).pipe(
      tap((response) => {
        // Update the access token in the storage
        this.setAccessToken(response.access_token);
      }),
      catchError((error) => {
        // Handle refresh token error, you might want to handle this differently
        console.error('Token refresh error:', error);
        return of('');
      })
    );
  }

  // Method to handle user login (assuming you get the tokens from the server upon successful login)

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.authUrl, { username, password }).pipe(
      tap((response) => {
        // Save the access and refresh tokens to the storage
        this.setAccessToken(response.access);
        localStorage.setItem(this.refreshTokenKey, response.refresh);
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }
}
