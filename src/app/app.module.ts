import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgZone } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { EntryPageComponent } from './entrypage/entrypage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PastentriesComponent } from './pastentries/pastentries.component';
import { StatsComponent } from './stats/stats.component';
import { MobileMenuComponent } from './mobilemenu/mobilemenu.component';
import { HeaderComponent } from './header/header.component';
import { EntrydisplayComponent } from './entrydisplay/entrydisplay.component';

const config = {
  apiKey: "AIzaSyB70_QuTshwii3W5Yb-YpBEahVSaCLG2Uo",
  authDomain: "happycranky-483d5.firebaseapp.com",
  projectId: "happycranky-483d5",
  storageBucket: "happycranky-483d5.appspot.com",
  messagingSenderId: "987622101214",
  appId: "1:987622101214:web:509179646f15269103b24f",
  measurementId: "G-S0TK243C3P"
};

@NgModule({
  declarations: [
    AppComponent,
    EntryPageComponent,
    HomepageComponent,
    DashboardComponent,
    PastentriesComponent,
    StatsComponent,
    MobileMenuComponent,
    HeaderComponent,
    EntrydisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
