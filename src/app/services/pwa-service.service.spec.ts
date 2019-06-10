import { TestBed } from '@angular/core/testing';

import { PwaService } from './pwa-service.service';

describe('PwaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PwaService = TestBed.get(PwaService);
    expect(service).toBeTruthy();
  });
});
