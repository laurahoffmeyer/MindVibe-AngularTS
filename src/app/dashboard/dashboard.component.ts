import { Component, OnInit } from '@angular/core';
import { MoodService } from './../services/mood.service';
import { User } from '../models/user.model';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userEntries = [];
  id: string = "";
  total: number;
  average: number;
  displayName: string = '';
  displayAverage: number;

  constructor(public auth: AuthService, private moodService: MoodService, public router: Router) { }

  ngOnInit(): void {
    let mood: any = "";
    let entrydate: string = "";
    let entrytime: string = "";
    let journalentry: string = "";
    this.auth.user$.subscribe(user => {
      this.displayName = user.displayName;
      this.id = user.uid;
      let userID: string = this.id;
      this.moodService.getUserEntries(mood, entrydate, entrytime, journalentry, userID).subscribe(result => {
        this.userEntries = result;
        // console.log(this.userEntries);
        this.total = 0;
        this.userEntries.forEach(element => {
          this.total += element.mood;
        });
        this.average = (this.total) / (this.userEntries.length);
        // console.log(this.average);
        this.displayAverage = Math.round(this.average * 10) / 10;
      })
    })

  }

  goToEntryPage() {
    this.router.navigate(['/entrypage']);
    this.moodService.clickedEntry = {};
  }
}






