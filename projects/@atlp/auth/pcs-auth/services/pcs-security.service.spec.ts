import { TestBed } from '@angular/core/testing';

import { PcsSecurityService } from './pcs-security.service';

describe('PcsSecurityService', () => {
  let service: PcsSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcsSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
