import { MoodService } from './../services/mood.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public auth: AuthService, private moodService: MoodService, public router: Router) { }

  get clickedEntry(): any {
    return this.moodService.clickedEntry;
  }

  id: string = "";
  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.id = user.uid;
    })
  }

  checkLoginStatus() {
    if (this.id) {
      this.router.navigate(["/dashboard"]);
      return true;
    }
    return false;
  }
}
