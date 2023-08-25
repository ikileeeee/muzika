import { TestBed } from '@angular/core/testing';

import { RecomendService } from './recomend.service';

describe('RecomendService', () => {
  let service: RecomendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecomendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
