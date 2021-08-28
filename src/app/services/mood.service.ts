import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EntryActivity } from '../models/entryactivity';
import { Activity } from '../models/activity';
import { Entry } from '../models/entry.model';

@Injectable({
  providedIn: 'root',
})
export class MoodService {
  clickedEntry: any = {};

  constructor(private http: HttpClient, private auth: AuthService) { }

  apiURL: string = `https://mindvibe.herokuapp.com/entries`;

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
  deleteEntry(itemId: number): Observable<Entry[]> {
    return this.http.delete<Entry[]>(this.apiURL + `/${itemId}`);
  }
  createNewEntry(newEntry: Entry): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL, newEntry);
  }
  updateEntry(entryID: number, entryObject: any): Observable<any[]> { 
    return this.http.put<any[]>(this.apiURL + `/${entryID}`, entryObject);
  }
  addActivities(entryActivity: EntryActivity): Observable<EntryActivity[]> {
    return this.http.post<EntryActivity[]>(
      'https://mindvibe.herokuapp.com/entryactivities', entryActivity );
  }
  getEAs(entryId: string): Observable<any> {
    return this.http.get<any[]>(
      `https://mindvibe.herokuapp.com/entryactivities`,
      { params: { entry_id: entryId } } );
  }
  deleteEA(eaId: number): Observable<Entry[]> {
    return this.http.delete<Entry[]>(
      `https://mindvibe.herokuapp.com/entryactivities/${eaId}` );
  }
  getActivityInfoById(id): Observable<any[]> {
    return this.http.get<any[]>(
      `https://mindvibe.herokuapp.com/activities/${id}` );
  }
  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>('https://mindvibe.herokuapp.com/activities');
  }
}
