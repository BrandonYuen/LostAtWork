import { Injectable } from '@angular/core';
import { DiaryEntry } from './diary-entry/diary-entry.model';

@Injectable({
  providedIn: 'root'
})

export class DiaryEntriesService {

  private diaryEntries: DiaryEntry[] = [
    {
        id: '1',
        title: 'Denied at luch',
        date: '6-9-2019',
        content: 'Today they didn\'t invite me for lunch, even though they normally do. I felt alone and depressed. It feels like it\'t getting worse by the day.'
    },
    {
        id: '2',
        title: 'Yelled at',
        date: '8-9-2019',
        content: 'Ryan came to my desk this afternoon and started talking fairly aggresive to me from the start. He had an issue with...'
    },
    {
        id: '3',
        title: 'Willem intimidating me',
        date: '6-9-2019',
        content: 'My boss Willem talked to me about the customer issue. At some point he looked at me without really asking a question and just stared at me...'
    },
    {
        id: '4',
        title: 'Jessica',
        date: '13-10-2019',
        content: 'Jessica has been spreading rumors about me slacking off and taking too much lunch time. I\'ve heard others talk about me in the back...'
    }
  ];

  constructor() { }

  getAllEntries() {
    return [...this.diaryEntries];
  }

  getEntry(diaryId: string) {
    console.log('Looking for diary entry with id', diaryId);
    return {...this.diaryEntries.find(diary => {
      console.log('Found diary entry with id', diary.id);
      return diary.id === diaryId;
    })};
  }
}
