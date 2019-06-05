import { TestBed } from '@angular/core/testing';

import { DiaryEntriesService } from './diary-entries.service';

describe('DiaryEntriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiaryEntriesService = TestBed.get(DiaryEntriesService);
    expect(service).toBeTruthy();
  });
});
