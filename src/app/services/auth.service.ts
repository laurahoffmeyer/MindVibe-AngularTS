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
  gtoken$;
 
  constructor(private router: Router, public readonly fireauth: AngularFireAuth) {
    // firebase.initializeApp(environment.firebaseConfig);
    if(this.user$) {
      fireauth.user.subscribe(this.user$);
      fireauth.idToken.subscribe(this.token$);
  
      // this.user$.getValue();
      console.log(this.user$);
      console.log(this.token$);
    }
}

  async signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential as firebase.auth.OAuthCredential;
      this.gtoken$ = credential.accessToken;
      console.log(this.gtoken$);
      console.log(this.user$);
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

  // isLoggedIn() {
  //   firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
  //     // Send token to your backend via HTTPS
  //     // ...
  //   }).catch(function(error) {
  //     // Handle error
  //   });  }

  async signOut() {
    // this.fireauth.user.subscribe(this.user$);
    // this.fireauth.idToken.subscribe(this.token$);

    this.fireauth.signOut();
    console.log(this.user$);
  }
 }