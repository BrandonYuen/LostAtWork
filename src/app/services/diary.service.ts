import { Injectable } from '@angular/core';
import { DiaryEntry } from '../models/diary-entry.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { catchError, tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DiaryService {

  private _diaryEntries: BehaviorSubject<DiaryEntry[]>;
  private baseUrl: string;
  private dataStore: {
    diaryEntries: DiaryEntry[]
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseUrl = environment.api.url;
    this.dataStore = { diaryEntries: [] };
    this._diaryEntries = new BehaviorSubject([]) as BehaviorSubject<DiaryEntry[]>;
  }

  get diaryEntries() {
    return this._diaryEntries.asObservable();
  }

  fetchAllEntries() {
    return this.http.get<DiaryEntry[]>(`${environment.api.url}/api/diary`)
    .pipe(
      catchError(e => {
        if (e.status === 401) {
          this.authService.showAlert('Please log in again.');
          this.authService.logout();
        }
        throw new Error(e);
      }),
      map(entries => {
        for (let entry of (entries as Array<DiaryEntry>)){
          entry.date = new Date(entry.date);
        }
        return entries;
      }),
    ).subscribe(data => {
      this.dataStore.diaryEntries = data;
      this._diaryEntries.next(Object.assign({}, this.dataStore).diaryEntries);
    }, error => console.log('Could not load todos.'));
  }

  fetchOneEntry(id: string) {
    this.http.get(`${this.baseUrl}/api/diary/${id}`)
    .pipe(
      catchError(e => {
        if (e.status === 401) {
          this.authService.showAlert('Please log in again.');
          this.authService.logout();
        }
        throw new Error(e);
      }),
      map((entry: DiaryEntry) => {
        entry.date = new Date(entry.date);
        return entry;
      }),
    ).subscribe((fetchedEntry: DiaryEntry) => {
      let notFound = true;

      this.dataStore.diaryEntries.forEach((entry, i) => {
        if (entry._id === fetchedEntry._id) {
          this.dataStore.diaryEntries[i] = fetchedEntry;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.diaryEntries.push(fetchedEntry);
      }

      this._diaryEntries.next(Object.assign({}, this.dataStore).diaryEntries);
    }, error => {
      console.log('Could not load diary entry with id:', id);
    });
  }

  createEntry(entry: DiaryEntry) {
    return this.http.post(`${this.baseUrl}/api/diary`, entry)
    .pipe(
      map((createdEntry: DiaryEntry) => {
        createdEntry.date = new Date(createdEntry.date);
        return createdEntry;
      }),
      tap((createdEntry: DiaryEntry) => {
        // Add the entry to the datastore
        this.dataStore.diaryEntries.unshift(createdEntry);
        this._diaryEntries.next(Object.assign({}, this.dataStore).diaryEntries);
        console.log('Created new entry: ', createdEntry);
      })
    );
  }

  updateEntry(entry: DiaryEntry) {
    return this.http.put(`${this.baseUrl}/api/diary/${entry._id}`, entry)
    .pipe(
      tap( (updatedEntry: DiaryEntry) => {
        // Update date to actual Date object
        updatedEntry.date = new Date(updatedEntry.date);

        // Update the entry in the datastore
        this.dataStore.diaryEntries.forEach((e, i) => {
          if (e._id === updatedEntry._id) { this.dataStore.diaryEntries[i] = updatedEntry; }
        });

        this._diaryEntries.next(Object.assign({}, this.dataStore).diaryEntries);
        console.log('Removed entry with ID: ', entry._id);
      })
    );
  }

  removeEntry(entry: DiaryEntry) {
    return this.http.delete(`${this.baseUrl}/api/diary/${entry._id}`)
    .pipe(
      tap( response => {
        // Remove the entry from the datastore
        this.dataStore.diaryEntries.forEach((e, i) => {
          if (e._id === entry._id) { this.dataStore.diaryEntries.splice(i, 1); }
        });

        this._diaryEntries.next(Object.assign({}, this.dataStore).diaryEntries);
        console.log('Removed entry with ID: ', entry._id);
      })
    );
  }
}
