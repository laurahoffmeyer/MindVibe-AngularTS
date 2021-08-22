// import { EidAname } from './../models/eid-aname';
import { Activity } from './../models/activity';
import { Component, OnInit } from '@angular/core';
import { MoodService } from '../services/mood.service';
// import { Router, ActivatedRoute } from '@angular/router';
import { Entry } from '../models/entry.model';
import { AuthService } from './../services/auth.service';
// import { ThisReceiver } from '@angular/compiler';
// import { EntryActivity } from '../models/entryactivity';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  userEntries: Entry[] = [];
  userEntriesD: Entry[] = [];
  // userEntryAct: EntryActivity [] = [];
  userAct: Activity [] = [];
  userId: string = '';
  entryId: string = '';
  // id: number;
  mood = 0;
  selctedUser = [];
  userDetails = [];
  happyDays = [];
  sadDays = [];
  happyActivitiesIds = [];
  sadActivitiesIds = [];
  HappyActivitiesNamesandCategories = [];
  SadActivitiesNamesandCategories = [];
  AllActivities: Activity[];
  ActivitySelected: Number;
  // noActivitiesObject: EidAname = { aName: "None", aCategory: "None" };
  noactivity = "";
  hsheading = "";
  hBtnStatus = false;
  sBtnStatus = false;
  loopFinished = false;

  get clickedEntry(): any {
    return this.moodService.clickedEntry;
  }

  constructor(
    private moodService: MoodService,
    // private router: Router,
    // private route: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.displayEntries();
  }
  

  displayEntries() {
    let mood: any = '';
    let entrydate: string = '';
    let entrytime: string = '';
    let journalentry: string = '';
    this.auth.user$.subscribe((user) => {
      this.userId = user.uid;
      let userID: string = this.userId;
      this.moodService
        .getUserEntries(mood, entrydate, entrytime, journalentry, userID)
        .subscribe((result) => {
          this.userEntriesD = result;
        });
    });
  }

  happyDaysDidThis() {
    this.hBtnStatus = true;
    this.sBtnStatus = false;
    this.loopFinished = false;
    this.SadActivitiesNamesandCategories = [];
    this.hsheading = "on your happy days, you ...";
    // let i = 0;
    this.happyDays = [];
    this.happyActivitiesIds = [];
    this.userEntriesD.forEach((element) => {
      if (element.mood === 5 || element.mood === 4) {
        this.noactivity = "";
        this.happyDays.push(element.id);
      }
    });
    if (this.happyDays.length === 0) {
      this.noactivity = "you have no happy days to report ...";
      // this.HappyActivitiesNamesandCategories.push(this.noActivitiesObject);
    } else {
      this.HappyActivitiesNamesandCategories = [];
      // let newHEId;
      // let newHAId;
      // let newHObject: EidAname;
      this.happyDays.forEach((element) => {
        this.moodService.getAllEntryActivitiesPerEntryId(element).subscribe((result) => {
              result.forEach((EAResult, index) => {
                this.moodService.getActivityNameAndCategory(EAResult.activity_id).subscribe((fullActivity: any) => {

                  let foundActivity = this.HappyActivitiesNamesandCategories.find(activity => activity.id === fullActivity.id)
                  
                  if (foundActivity) {
                    foundActivity.amount = foundActivity.amount + 1;
                  } else {
                    let activityObject = {
                      id: fullActivity.id,
                      name: fullActivity.name,
                      category: fullActivity.category,
                      amount: 1
                    }
                    this.HappyActivitiesNamesandCategories.push(activityObject);
                  }
                  if (index === result.length -1) {
                    this.HappyActivitiesNamesandCategories.sort((a, b) => {
                      return b.amount - a.amount;
                    });   
                    this.loopFinished = true;  
                  }
                })
              });
              //   for (i = 0; i < result.length; i++) {
              //   newHEId = result[i].entry_id;
              //   newHAId = result[i].activity_id;
              //   this.moodService
              //     .getActivityNameAndCategory(newHAId)
              //     .subscribe((newResult: any) => {
              //       newHObject = {
              //         aName: newResult.name,
              //         aCategory: newResult.category,
              //       };
              //       this.HappyActivitiesNamesandCategories.push(newHObject);
              //   });
              // }
        });
      });
    }    
  }

  sadDaysDidThis() {
    this.sBtnStatus = true;
    this.hBtnStatus = false;
    this.loopFinished = false;
    this.HappyActivitiesNamesandCategories = [];
    this.hsheading = "on your sad days, you ...";
    // let i = 0;
    this.sadDays = [];
    this.sadActivitiesIds = [];
    this.userEntriesD.forEach((element) => {
      if (element.mood === 1 || element.mood === 2) {
        this.noactivity = "";
        this.sadDays.push(element.id);
      }
    });
    if (this.sadDays.length === 0) {
      this.noactivity = "you have no sad days to report ...";
      // this.SadActivitiesNamesandCategories.push(this.noActivitiesObject);
    } else {
      this.SadActivitiesNamesandCategories = [];
      // let newSEId;
      // let newSAId;
      // let newSObject: EidAname;

      this.sadDays.forEach((element) => {
        this.moodService.getAllEntryActivitiesPerEntryId(element).subscribe((result) => {
          result.forEach((EAResult, index) => {
            this.moodService.getActivityNameAndCategory(EAResult.activity_id).subscribe((fullActivity: any) => {

              let foundActivity = this.SadActivitiesNamesandCategories.find(activity => activity.id === fullActivity.id)
              
              if (foundActivity) {
                foundActivity.amount = foundActivity.amount + 1;
              } else {
                let activityObject = {
                  id: fullActivity.id,
                  name: fullActivity.name,
                  category: fullActivity.category,
                  amount: 1
                }
                this.SadActivitiesNamesandCategories.push(activityObject);
              }
              if (index === result.length -1) {
                this.SadActivitiesNamesandCategories.sort((a, b) => {
                  return b.amount - a.amount;
                });   
                this.loopFinished = true;
              }
            })
          });
          // for (i = 0; i < result.length; i++) {
              //   newSEId = result[i].entry_id;
              //   newSAId = result[i].activity_id;
              //   this.moodService
              //     .getActivityNameAndCategory(newSAId)
              //     .subscribe((newResult: any) => {
              //       newSObject = {
              //         aName: newResult.name,
              //         aCategory: newResult.category,
              //       };
              //       this.SadActivitiesNamesandCategories.push(newSObject);
              //     });
              // }
            });
          });
        }    
      }    
}

 
  

