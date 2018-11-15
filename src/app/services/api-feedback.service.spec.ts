import { TestBed, inject } from '@angular/core/testing';

import { ApiFeedbackService } from './api-feedback.service';

describe('ApiFeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiFeedbackService]
    });
  });

  it('should be created', inject([ApiFeedbackService], (service: ApiFeedbackService) => {
    expect(service).toBeTruthy();
  }));
});
