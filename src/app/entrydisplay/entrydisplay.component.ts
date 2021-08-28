import { MoodService } from '../services/mood.service';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrydisplay',
  templateUrl: './entrydisplay.component.html',
  styleUrls: ['./entrydisplay.component.css']
})
export class EntrydisplayComponent implements OnInit {

  constructor(public auth: AuthService, private moodService: MoodService, private router: Router) { }

  mood: number = 3;
  entrydate: string = "";
  entrytime: string = "";
  journalentry: string = "";
  UserId: string = "";
  entryToView: any = {}
  activityIds = [];
  activityObjects = [];

  dbSocialActivities = [];
  dbHealthActivities = [];
  dbEmotionActivities = [];
  dbActivityActivities = [];
  dbActionActivities = [];

  onlyOneCategory = false;

  get clickedEntry(): any {
    return this.moodService.clickedEntry;
  }

  ngOnInit(): void {
    this.entryToView = this.moodService.clickedEntry;
    this.mood = this.entryToView.mood;
    this.entrydate = this.entryToView.entrydate;
    this.entrytime = this.entryToView.entrytime;
    this.journalentry = this.entryToView.journalentry;
    this.UserId = this.entryToView.UserId;
    this.moodService.getEAs(this.entryToView.id).subscribe(result => {
      if (result) {
        result.forEach(element => {
           this.activityIds.push(element.activity_id);
         }); 
         this.activityIds.forEach(element => {
          this.moodService.getActivityInfoById(element).subscribe(a => {
            this.activityObjects.push(a);
            this.addActivities("Social");
            this.addActivities("Social");
            this.addActivities("Health");
            this.addActivities("Emotion");
            this.addActivities("Activity");
            this.addActivities("Action");
            this.numberOfCategories();  
          })
        }); 
       }
    });
  }
  goToPastEntries() {
    this.router.navigate(['/pastentries']);
  }
  editEntry(entry: any) {
    this.moodService.clickedEntry = entry;
    this.router.navigate(['/entrypage']);
  }
  numberOfCategories() {
    let number = 0;
    this.dbSocialActivities.length > 0 ? number += 1 : number = number;
    this.dbHealthActivities.length > 0 ? number += 1 : number = number;
    this.dbEmotionActivities.length > 0 ? number += 1 : number = number;
    this.dbActivityActivities.length > 0 ? number += 1 : number = number;
    this.dbActionActivities.length > 0 ? number += 1 : number = number;

    if(number <= 1) {
      this.onlyOneCategory = true;
    } else {
      this.onlyOneCategory = false;
    }
  } 
  addActivities(category: string) {
    if(category === "Social") {
      this.dbSocialActivities = this.activityObjects.filter(activity => activity.category === category);
    } else if(category === "Health") {
      this.dbHealthActivities = this.activityObjects.filter(activity => activity.category === category);
    } else if (category === "Emotion") {
      this.dbEmotionActivities = this.activityObjects.filter(activity => activity.category === category);
    } else if (category === "Activity") {
      this.dbActivityActivities = this.activityObjects.filter(activity => activity.category === category);
    } else if (category === "Action") {
      this.dbActionActivities = this.activityObjects.filter(activity => activity.category === category);
    }
  }
}