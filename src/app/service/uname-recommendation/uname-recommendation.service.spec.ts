import { TestBed } from '@angular/core/testing';

import { UnameRecommendationService } from './uname-recommendation.service';

describe('UnameRecommendationService', () => {
  let service: UnameRecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnameRecommendationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
