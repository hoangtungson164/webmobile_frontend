import { TestBed } from '@angular/core/testing';

import { CicService } from './cic.service';

describe('CicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CicService = TestBed.get(CicService);
    expect(service).toBeTruthy();
  });
});
