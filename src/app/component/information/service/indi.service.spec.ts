import { TestBed } from '@angular/core/testing';

import { IndiService } from './indi.service';

describe('IndiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndiService = TestBed.get(IndiService);
    expect(service).toBeTruthy();
  });
});
