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

  UserId = "";

  get usersignedin() {
    return this.auth.usersignedin;
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.UserId = user.uid;

      if (this.UserId !== null) {
        this.auth.usersignedin = true;
      }
      
    })
  }
}
