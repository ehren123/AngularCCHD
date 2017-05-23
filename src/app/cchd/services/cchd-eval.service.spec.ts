import { TestBed, inject } from '@angular/core/testing';

import { CchdEvalService } from './cchd-eval.service';

describe('CchdEvalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CchdEvalService]
    });
  });

  it('should be created', inject([CchdEvalService], (service: CchdEvalService) => {
    expect(service).toBeTruthy();
  }));
});
