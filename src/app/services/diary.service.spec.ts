import { TestBed } from '@angular/core/testing';

import { DiaryService } from './diary.service';

describe('DiaryEntriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiaryService = TestBed.get(DiaryService);
    expect(service).toBeTruthy();
  });
});
