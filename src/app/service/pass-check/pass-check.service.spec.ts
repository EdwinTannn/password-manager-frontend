import { TestBed } from '@angular/core/testing';

import { PassCheckService } from './pass-check.service';

describe('PassCheckService', () => {
  let service: PassCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
