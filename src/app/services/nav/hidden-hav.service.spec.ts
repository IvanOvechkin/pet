import { TestBed } from '@angular/core/testing';

import { HiddenHavService } from './hidden-hav.service';

describe('HiddenHavService', () => {
  let service: HiddenHavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HiddenHavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
