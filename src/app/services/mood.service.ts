import { EidAname } from './../models/eid-aname';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EntryActivity } from '../models/entryactivity';
import { Activity } from '../models/activity';
import { Entry } from '../models/entry.model';

@Injectable({
  providedIn: 'root',
})
export class MoodService {
  activityArray: Activity[] = [];
  clickedEntry: any = {};

  headers = new Headers();

  constructor(private http: HttpClient, private auth: AuthService) { }

  apiURL: string = `https://happy-cranky.herokuapp.com/entries`;

  getUserEntries(
    moodVar: string,
    entryDate: string,
    entryTime: string,
    journalEntry: string,
    userId?: string
  ): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL, {
      params: {
        mood: moodVar,
        entrydate: entryDate,
        entrytime: entryTime,
        journalentry: journalEntry,
        user_id: userId,
      },
    });
  }

  getEntriesOnlyByUserId(userId?: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL, {
      params: { user_id: userId },
    });
  }

  getUserStats(moodVar?: string, userId?: string): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.apiURL, {
      params: { mood: moodVar, user_id: userId },
    });
  }

  deleteEntry(itemId: number): Observable<Entry[]> {
    return this.http.delete<Entry[]>(this.apiURL + `/${itemId}`);
  }

  addNewEntry(newEntry: Entry): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL, newEntry);
  }

  // updateEntry(entryID: number, entryObject: any): Observable<any[]> {       
  //   return this.http.put<any[]>(`http://localhost:3000/entries` + `/${entryID}`, 
  //   JSON.stringify(entryObject));
  // }

  getAllEntryActivitiesPerEntryId(entryId: string): Observable<any> {
    return this.http.get<any[]>(
      `https://happy-cranky.herokuapp.com/entryactivities`,
      {
        params: { entry_id: entryId }
      }
    );
  }

  deleteEntryFromEA(eaId: number): Observable<Entry[]> {
    return this.http.delete<Entry[]>(
      `https://happy-cranky.herokuapp.com/entryactivities/${eaId}`
    );
  }

  addEntryActivities(
    entryActivity: EntryActivity
  ): Observable<EntryActivity[]> {
    return this.http.post<EntryActivity[]>(
      'https://happy-cranky.herokuapp.com/entryactivities',
      entryActivity
    );
  }

  getActivityNameAndCategory(id): Observable<any[]> {
    return this.http.get<any[]>(
      `https://happy-cranky.herokuapp.com/activities/${id}`
    );
  }

  getActivitiesByCategory(category: string): Observable<Activity[]> {
    return this.http.get<Activity[]>('https://happy-cranky.herokuapp.com/activities',
      {
        params: { category: category }
      }
    );
  }

  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>('https://happy-cranky.herokuapp.com/activities');
  }

  

}
