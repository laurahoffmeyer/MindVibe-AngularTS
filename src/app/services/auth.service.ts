// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

// import { firebase } from '@firebase/app';
// import '@firebase/auth';

// import { Observable, of } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// import { User } from '../models/user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   user$: Observable<User>;

//   constructor(
//     private afAuth: AngularFireAuth,
//     private afs: AngularFirestore,
//     private router: Router
//   ) 
//   {
//     this.user$ = this.afAuth.authState.pipe(
//       switchMap(user => {
//         if (user) {
//           return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
//         } else {
//           return of(null);
//         }
//       })
//     )
//   }

//   async googleSignin() {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     const credential = await this.afAuth.signInWithPopup(provider);
//     this.router.navigate(["/dashboard"]);
//     return this.updateUserData(credential.user);
//   }

//   async signOut() {
//     await this.afAuth.signOut();
//     return this.router.navigate(['/homepage']);
//   }

//   private updateUserData({ uid, email, displayName, photoURL }: User) {
//     const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
//     const data = {
//       uid, email, displayName, photoURL
//     };
//     return userRef.set(data, { merge: true });
//   }
// }


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {BehaviorSubject} from 'rxjs';

import firebase from 'firebase/app';
import '@firebase/auth';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

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
      // this.user = result.user;
      console.log(this.gtoken$);
      console.log(this.user$);
      // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //   this.router.navigate(['/dashboard']);
      // }); 
      // this.router.navigate(["/dashboard"]);
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