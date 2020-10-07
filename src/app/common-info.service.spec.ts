import { TestBed } from '@angular/core/testing';

import { CommonInfoService } from './common-info.service';

describe('CommonInfoService', () => {
  let service: CommonInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
