import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const loggedIn = localStorage.getItem('isCustomerLoggedIn');

    if (loggedIn === 'true') {
      return true;
    }

    // ✅ USE ANGULAR ROUTER URL (THIS IS THE FIX)
    this.router.navigate(['/auth/login'], {
      queryParams: {
        role: 'customer',
        returnUrl: state.url
      }
    });

    return false;
  }
}
