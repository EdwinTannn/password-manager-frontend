import { TestBed } from '@angular/core/testing';

import { PasswordVisibleService } from './password-visible.service';

describe('PasswordVisibleService', () => {
  let service: PasswordVisibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordVisibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
