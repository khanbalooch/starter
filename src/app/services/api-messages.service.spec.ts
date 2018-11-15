import { TestBed, inject } from '@angular/core/testing';

import { ApiMessagesService } from './api-messages.service';

describe('ApiMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiMessagesService]
    });
  });

  it('should be created', inject([ApiMessagesService], (service: ApiMessagesService) => {
    expect(service).toBeTruthy();
  }));
});
