import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { EntryPageComponent } from './entrypage/entrypage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PastentriesComponent } from './pastentries/pastentries.component';
import { StatsComponent } from './stats/stats.component';
import { MobileMenuComponent } from './mobilemenu/mobilemenu.component';
import { HeaderComponent } from './header/header.component';
import { EntrydisplayComponent } from './entrydisplay/entrydisplay.component';

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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }