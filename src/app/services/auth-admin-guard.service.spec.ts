import { TestBed, inject } from '@angular/core/testing';

import { AuthAdminGuardService } from './auth-guard.service';

describe('AuthAdminGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthAdminGuardService]
    });
  });

  it('should be created', inject([AuthAdminGuardService], (service: AuthAdminGuardService) => {
    expect(service).toBeTruthy();
  }));
});
