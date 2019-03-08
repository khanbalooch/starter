import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { ApiUsersService } from './api-users.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuardService implements CanActivate {
  constructor(
    private auth: AuthenticationService,
  ) { }

  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }
}
