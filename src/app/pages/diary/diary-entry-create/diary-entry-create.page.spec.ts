import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryEntryCreatePage } from './diary-entry-create.page';

describe('DiaryEntryCreatePage', () => {
  let component: DiaryEntryCreatePage;
  let fixture: ComponentFixture<DiaryEntryCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryEntryCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
