import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { ApiUsersService } from './api-users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuardService implements CanActivate {
  constructor(
    private auth: ApiUsersService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.auth.isAuthenticated() && (this.auth.getRole() === 'Admin' || this.auth.getRole() === 'SuperAdmin')) {
      return true;
    }
    this.router.navigate(['/']);
  }
}
