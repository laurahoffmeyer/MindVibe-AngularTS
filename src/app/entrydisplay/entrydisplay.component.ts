import { MoodService } from '../services/mood.service';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Entry } from '../models/entry.model';
import { Activity } from '../models/activity';
import { EntryActivity } from '../models/entryactivity';

@Component({
  selector: 'app-entrydisplay',
  templateUrl: './entrydisplay.component.html',
  styleUrls: ['./entrydisplay.component.css']
})
export class EntrydisplayComponent implements OnInit {

  constructor(public auth: AuthService, private moodService: MoodService) { }

  mood: number = 3;
  entrydate: string = "";
  entrytime: string = "";
  journalentry: string = "";
  UserId: string = "";
  newEntryId: number = 0;
  entryToEdit: any = {}
  displayAll: any;
  activityList = [];
  activityNameAndCategory: any[] = [];

  get activityArray(): Activity[] {
    return this.moodService.activityArray;
  }

  get clickedEntry(): any {
    return this.moodService.clickedEntry;
  }

  ngOnInit(): void {
    this.entryToEdit = this.moodService.clickedEntry;
    console.log(this.entryToEdit);
    if (this.entryToEdit.id !== undefined) {
      this.mood = this.entryToEdit.mood;
      this.entrydate = this.entryToEdit.entrydate;
      this.entrytime = this.entryToEdit.entrytime;
      this.journalentry = this.entryToEdit.journalentry;
      this.UserId = this.entryToEdit.UserId;
      this.moodService.getAllEntryActivitiesPerEntryId(this.entryToEdit.id).subscribe(result => {
        if (result) {
          result.forEach(element => {
            this.activityList.push(element.activity_id);
          });
        }
        this.activityNameAndCategory = [];
        this.activityList.forEach(element => {
          this.moodService.getActivityNameAndCategory(element).subscribe(result => {
            this.activityNameAndCategory.push(result);
          })
        });
      });
    }
  }

}

