import { MoodService } from './../services/mood.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Entry } from '../models/entry.model';

@Component({
  selector: 'app-pastentries',
  templateUrl: './pastentries.component.html',
  styleUrls: ['./pastentries.component.css']
})
export class PastentriesComponent implements OnInit {

  constructor(public auth: AuthService, private moodService: MoodService, public router: Router) { }

  id: string = "";
  public userEntries = [];

  get clickedEntry(): any {
    return this.moodService.clickedEntry;
  }

  ngOnInit(): void {
    this.displayEntries();
  }

  displayEntries() {
    this.userEntries = [];
    let mood: any = "";
    let entrydate: string = "";
    let entrytime: string = "";
    let journalentry: string = "";
    
    this.auth.user$.subscribe(user => {
      this.id = user.uid;
      let userID: string = this.id;
      this.moodService.getUserEntries(mood, entrydate, entrytime, journalentry, userID).subscribe(result => {
        this.userEntries = result;
      })
    })
  }

  goToEntryPage() {
    this.router.navigate(['/entrypage']);
    this.moodService.clickedEntry = {};
  }

  displayEntry(entry: any) {
    this.moodService.clickedEntry = entry;
    this.router.navigate(['/entrydisplay']);
  }

  deleteEntry(entry) {
    this.moodService.deleteEntry(entry.id).subscribe((entries: Entry[]) => {
      this.userEntries = entries;
      this.displayEntries();
    })
    this.moodService.getAllEntryActivitiesPerEntryId(entry.id).subscribe(newList => {
      newList.forEach(element => {
        let newId = element.id;
        // console.log(newId);
        this.moodService.deleteEntryFromEA(newId).subscribe(() => {
          // console.log(`I'm deleting EA Table id = ${newId}`);
        })
      });
    })
  }

}

