import { Component, OnInit, Input } from '@angular/core';
import { DiaryEntry } from '../../../models/diary-entry.model';

@Component({
  selector: 'app-diary-entry',
  templateUrl: './diary-entry.component.html',
  styleUrls: ['./diary-entry.component.scss'],
})

export class DiaryEntryComponent implements OnInit {
  @Input() diaryEntry: DiaryEntry;

  constructor() { }

  ngOnInit() {}

}
