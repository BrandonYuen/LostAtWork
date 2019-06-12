import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryEntryEditPage } from './diary-entry-edit.page';

describe('DiaryEntryEditPage', () => {
  let component: DiaryEntryEditPage;
  let fixture: ComponentFixture<DiaryEntryEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryEntryEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
