import { Router } from '@angular/router';
import { MoodService } from '../services/mood.service';
import { AuthService } from '../services/auth.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { Entry } from '../models/entry.model';
import { Activity } from '../models/activity';
import { EntryActivity } from '../models/entryactivity';

@Component({
  selector: 'app-entrypage',
  templateUrl: './entrypage.component.html',
  styleUrls: ['./entrypage.component.css']
})
export class EntryPageComponent implements OnInit {

  constructor(public auth: AuthService, private moodService: MoodService, public router: Router, private ngZone:NgZone) { }

  mood: number = 3;
  entrydate: string = "";
  entrytime: string = "";
  journalentry: string = "";
  UserId: string = "";
  newEntryId: number = 0;
  entryToEdit: any = {}
  newEntry: Entry;
  // exsistingEntryId: number = this.item.id;

  get activityArray(): Activity[] {
    return this.moodService.activityArray;
  }
  get clickedEntry(): any {
    return this.moodService.clickedEntry;
  }
  activityList = [];

  ngOnInit(): void {

    this.getCurrentDate();
    this.getCurrentTime();

    this.entryToEdit = this.moodService.clickedEntry;

    if (this.entryToEdit.id !== undefined) {
      this.mood = this.entryToEdit.mood;
      this.entrydate = this.entryToEdit.entrydate;
      this.entrytime = this.entryToEdit.entrytime;
      this.journalentry = this.entryToEdit.journalentry;
      this.UserId = this.entryToEdit.UserId;

      this.moodService.getAllEntryActivitiesPerEntryId(this.entryToEdit.id).subscribe(result => {
        result.forEach(element => {
          this.activityList.push(element.activity_id);
        });
      });
    }

    this.moodService.getAllActivities().subscribe(result => {
      if (this.moodService.activityArray.length === 0) {
        result.forEach((activity: Activity) => {
          this.moodService.activityArray.push(activity);
        });
      }
    })
  }

  getCurrentDate() {
    let currentDate = new Date();
    let dd = String(currentDate.getDate()).padStart(2, '0');
    let mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    let yyyy = currentDate.getFullYear();

    this.entrydate = currentDate.toString();
    this.entrydate = mm + '/' + dd + '/' + yyyy;
  }

  getCurrentTime() {
    let currentTime = new Date().toLocaleTimeString();
    this.entrytime = currentTime.toString();
  }

  toggleActivityList(id, event) {
    const checked = event.target.checked;

    if (checked) {
      this.activityList.push({ id });
    } else {
      const index = this.activityList.findIndex(list => list == id);
      this.activityList.splice(index, 1);
    }
  }

  addNewEntry() {
    this.auth.user$.subscribe(user => {

      this.UserId = user.uid;

      this.newEntry = {
        mood: this.mood,
        entrydate: this.entrydate,
        entrytime: this.entrytime,
        journalentry: this.journalentry,
        user_id: this.UserId
      }

      console.log(this.newEntry);

      this.moodService.addNewEntry(this.newEntry).subscribe(result => {
        console.log(result);

        let emptyMood = "";
        let emptyEntryDate = "";
        let emptyEntrytime = "";
        let emptyJournalentry = "";
        let emptyUserId = "";

        this.moodService.getUserEntries(emptyMood, emptyEntryDate, emptyEntrytime, emptyJournalentry, emptyUserId).subscribe(result => {
          this.newEntryId = result[0].id;
          console.log(this.newEntryId);
          
          this.activityList.forEach(activity => {
            let newEntryActivity: EntryActivity = {
              entry_id: this.newEntryId,
              activity_id: activity.id
            }
            console.log(newEntryActivity);
            this.moodService.addEntryActivities(newEntryActivity).subscribe(result => {
            });
          });
          this.router.navigate(['/pastentries']);
        })
        // this.ngZone.run(() => {
        //   this.router.navigate(['/pastentries']);
        // })    
      })
    });
  }

  // updateEntry() {
  // this.auth.user$.subscribe(user => {
  //   this.UserId = user.uid;

  //   let entryObject = {
  //     mood: this.mood,
  //     entrydate: this.entrydate,
  //     entrytime: this.entrytime,
  //     journalentry: this.journalentry,
  //     user_id: this.UserId,
  //     id: this.entryToEdit.id
  //   }
  //   console.log(entryObject);
  //   this.moodService.updateEntry(this.entryToEdit.id, entryObject).subscribe(result => {
  //     console.log(entryObject);
  //     console.log(result);

  //     console.log(this.entryToEdit.id);

  //   })
  // })
  // }
}

