import { TestBed } from '@angular/core/testing';

import { LimitDateService } from './limit-date.service';

describe('LimitDateService', () => {
  let service: LimitDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LimitDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
