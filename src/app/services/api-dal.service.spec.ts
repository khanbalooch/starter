import { TestBed, inject } from '@angular/core/testing';

import { ApiDalService } from './api-dal.service';

describe('ApiDalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiDalService]
    });
  });

  it('should be created', inject([ApiDalService], (service: ApiDalService) => {
    expect(service).toBeTruthy();
  }));
});
