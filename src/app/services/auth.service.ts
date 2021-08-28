import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

import firebase from 'firebase/app';
import '@firebase/auth';

@Injectable({
  providedIn: 'root',
})

 export class AuthService {

  user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  token$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
 
  constructor(private router: Router, public readonly fireauth: AngularFireAuth) {
    if(this.user$) {
      fireauth.user.subscribe(this.user$);
      fireauth.idToken.subscribe(this.token$);
    }
}
  async signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential as firebase.auth.OAuthCredential;
      // this.gtoken$ = credential.accessToken;
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }
  signOut() {
    this.fireauth.signOut();
  }
}