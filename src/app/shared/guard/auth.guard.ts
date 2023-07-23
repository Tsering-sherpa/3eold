import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate
{
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  constructor(
    private router: Router
  ) {
  }

  canActivate(): boolean {
    if (localStorage.getItem(this.accessTokenKey) && localStorage.getItem(this.accessTokenKey)) {
      return true;
    } else {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }
}
