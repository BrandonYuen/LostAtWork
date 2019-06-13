import { TestBed } from '@angular/core/testing';

import { HideTabOnInputService } from './hide-tab-on-input.service';

describe('HideTabOnInputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HideTabOnInputService = TestBed.get(HideTabOnInputService);
    expect(service).toBeTruthy();
  });
});
