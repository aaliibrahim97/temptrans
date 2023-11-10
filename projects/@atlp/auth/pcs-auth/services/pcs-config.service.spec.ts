import { TestBed } from '@angular/core/testing';

import { PcsConfigService } from './pcs-config.service';

describe('PcsConfigService', () => {
  let service: PcsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
