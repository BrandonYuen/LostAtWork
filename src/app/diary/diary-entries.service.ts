import { Injectable } from '@angular/core';
import { DiaryEntry } from './diary-entry/diary-entry.model';

@Injectable({
  providedIn: 'root'
})

export class DiaryEntriesService {

  //TODO: Replace hardcoded dummy data with actualy data from database
  private diaryEntries: DiaryEntry[] = [
    {
        id: '1',
        misconductType: 'Bullying',
        title: 'Denied at luch',
        date: '6-9-2019',
        content: 'Today they didn\'t invite me for lunch, even though they normally do. I felt alone and depressed. It feels like it\'t getting worse by the day.'
    },
    {
        id: '2',
        title: 'Yelled at',
        misconductType: 'Aggression',
        date: '8-9-2019',
        content: 'Ryan came to my desk this afternoon and started talking fairly aggresive to me from the start. He had an issue with...'
    },
    {
        id: '3',
        title: 'Willem intimidating me',
        misconductType: 'Intimidation',
        date: '6-9-2019',
        content: 'My boss Willem talked to me about the customer issue. At some point he looked at me without really asking a question and just stared at me...'
    },
    {
        id: '4',
        title: 'Jessica',
        misconductType: 'Gossip',
        date: '13-10-2019',
        content: 'Jessica has been spreading rumors about me slacking off and taking too much lunch time. I\'ve heard others talk about me in the back...'
    }
  ];

  constructor() { }

  getAllEntries() {
    return [...this.diaryEntries];
  }

  getEntry(diaryId: string) {
    return {...this.diaryEntries.find(diary => {
      return diary.id === diaryId;
    })};
  }
}
