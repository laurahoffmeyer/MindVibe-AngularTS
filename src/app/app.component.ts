import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthService) { }

  //   , private moodService: MoodService) {

  // }

  // saveMood() {
  //   //Always this to get the user id
  //   this.auth.user$.subscribe(user => {
  //     const moodPost = {
  //       //ALWAYS DO THIS to get the specific uid
  //       id: user.uid,
  //       mood: "meh",

  //     }
  //     this.moodService.addMood...................postg

  //   })
}

