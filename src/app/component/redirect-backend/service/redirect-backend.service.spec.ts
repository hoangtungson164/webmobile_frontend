import { TestBed } from '@angular/core/testing';

import { RedirectBackendService } from './redirect-backend.service';

describe('RedirectBackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedirectBackendService = TestBed.get(RedirectBackendService);
    expect(service).toBeTruthy();
  });
});
