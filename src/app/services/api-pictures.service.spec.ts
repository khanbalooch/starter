import { TestBed, inject } from '@angular/core/testing';

import { ApiPicturesService } from './api-pictures.service';

describe('ApiPicturesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiPicturesService]
    });
  });

  it('should be created', inject([ApiPicturesService], (service: ApiPicturesService) => {
    expect(service).toBeTruthy();
  }));
});
