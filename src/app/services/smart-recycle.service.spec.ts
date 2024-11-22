import { TestBed } from '@angular/core/testing';

import { SmartRecycleService } from './smart-recycle.service';

describe('SmartRecycleService', () => {
  let service: SmartRecycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartRecycleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
