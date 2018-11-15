import { TestBed, inject } from '@angular/core/testing';

import { ApiUsersService } from './api-users.service';

describe('ApiUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUsersService]
    });
  });

  it('should be created', inject([ApiUsersService], (service: ApiUsersService) => {
    expect(service).toBeTruthy();
  }));
});
