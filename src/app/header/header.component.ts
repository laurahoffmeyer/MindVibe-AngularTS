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
        console.log(this.id);
      } else {
        this.id = "";
        this.router.navigate(["/homepage"]);
      }
    })
  }
}
