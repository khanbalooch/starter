import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { ApiUsersService } from './api-users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private auth: ApiUsersService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    this.auth.logout(() => {
      localStorage.removeItem('tokenBE');
      this.router.navigate(['/']);
    });
  }
}
