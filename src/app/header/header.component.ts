import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router) { }

  id = "";

  ngOnInit(): void {
    
    this.auth.user$.subscribe(user => {
      if(user) {
        this.id = user.uid;
        this.inactivityTime(this.auth);
      } else {
        this.id = "";
        this.router.navigate(["/homepage"]);
      }
    })
  }
  inactivityTime(myService) {
    var time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;
  
    function logout() {
      myService.signOut();
      alert("You have been logged out due to inactivity.")
    }
    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, 600000)
    }
  };
}
