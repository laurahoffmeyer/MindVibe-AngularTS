import { Router } from '@angular/router';
import { MoodService } from '../services/mood.service';
import { AuthService } from '../services/auth.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { Entry } from '../models/entry.model';
import { Activity } from '../models/activity';
import { EntryActivity } from '../models/entryactivity';
import { ConditionalExpr } from '@angular/compiler';

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

  get clickedEntry(): any {
    return this.moodService.clickedEntry;
  }

  dbAllActivities = [];

  dbSocialActivities = [];
  dbHealthActivities = [];
  dbEmotionActivities = [];
  dbActivityActivities = [];
  dbActionActivities = [];

  selectedActivities = [];

  formStep = 1;

  pageTitle = "Create New Entry";

  ngOnInit(): void {

    this.getCurrentDate();
    this.getCurrentTime();

    this.entryToEdit = this.moodService.clickedEntry;

    if (this.entryToEdit.id !== undefined) {
      this.pageTitle = "Edit Entry";
      this.mood = this.entryToEdit.mood;
      this.entrydate = this.entryToEdit.entrydate;
      this.entrytime = this.entryToEdit.entrytime;
      this.journalentry = this.entryToEdit.journalentry;
      this.UserId = this.entryToEdit.UserId;

      this.moodService.getEAs(this.entryToEdit.id).subscribe(result => {
        result.forEach(element => {
          this.selectedActivities.push(element.activity_id);
        });
      });
    }

    this.moodService.getAllActivities().subscribe(result => {
      if (this.dbAllActivities.length === 0) {
        result.forEach((activity: Activity) => {
          this.dbAllActivities.push(activity);
        });
      this.addActivities("Social");
      this.addActivities("Health");
      this.addActivities("Emotion");
      this.addActivities("Activity");
      this.addActivities("Action");
      }
   })
}

  addActivities(category: string) {
    if(category === "Social") {
      this.dbSocialActivities = this.dbAllActivities.filter(activity => activity.category === category);
    } else if(category === "Health") {
      this.dbHealthActivities = this.dbAllActivities.filter(activity => activity.category === category);
    } else if (category === "Emotion") {
      this.dbEmotionActivities = this.dbAllActivities.filter(activity => activity.category === category);
    } else if (category === "Activity") {
      this.dbActivityActivities = this.dbAllActivities.filter(activity => activity.category === category);
    } else if (category === "Action") {
      this.dbActionActivities = this.dbAllActivities.filter(activity => activity.category === category);
    }
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
      this.selectedActivities.push(id);
    } else {
      const index = this.selectedActivities.findIndex(list => list == id);
      this.selectedActivities.splice(index, 1);
    }
  }

  goPrev() {
    this.formStep--;
  }
  goNext() {
    this.formStep++;
  }
  goToPastEntries() {
    this.router.navigate(['/pastentries']);
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

      this.moodService.createNewEntry(this.newEntry).subscribe(result => {

        let emptyMood = "";
        let emptyEntryDate = "";
        let emptyEntrytime = "";
        let emptyJournalentry = "";
        let emptyUserId = "";

        this.moodService.getUserEntries(emptyMood, emptyEntryDate, emptyEntrytime, emptyJournalentry, emptyUserId).subscribe(result => {
          this.newEntryId = result[0].id;
          
          this.selectedActivities.forEach(activity => {
            let newEntryActivity: EntryActivity = {
              entry_id: this.newEntryId,
              activity_id: activity
            }
            this.moodService.addActivities(newEntryActivity).subscribe(result => {
            });
          });
          this.router.navigate(['/pastentries']);
        })
      })
    });
  }

  updateEntry() {
    this.auth.user$.subscribe(user => {
      this.UserId = user.uid;
      let entryObject = {
        mood: this.mood,
        entrydate: this.entrydate,
        entrytime: this.entrytime,
        journalentry: this.journalentry,
        user_id: this.UserId,
        id: this.entryToEdit.id
      }
      this.moodService.updateEntry(this.entryToEdit.id, entryObject).subscribe(result => {

        this.moodService.getEAs(this.entryToEdit.id).subscribe(eaList => {
          eaList.forEach(element => {
            let eaId = element.id;
            this.moodService.deleteEA(eaId).subscribe(() => {
            })
          });
        })

        if(this.selectedActivities.length > 0) {
          this.selectedActivities.forEach(activity => {
            let updatedEntryActivity: EntryActivity = {
              entry_id: this.entryToEdit.id,
              activity_id: activity
            }
            this.moodService.addActivities(updatedEntryActivity).subscribe(result => {
            });
          });
        }
       this.router.navigate(['/pastentries']);
      })
    })
  }
}