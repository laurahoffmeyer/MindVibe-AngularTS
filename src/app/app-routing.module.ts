import { EntrydisplayComponent } from './entrydisplay/entrydisplay.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EntryPageComponent } from './entrypage/entrypage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PastentriesComponent } from './pastentries/pastentries.component';
import { StatsComponent } from './stats/stats.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: "/homepage", pathMatch: "full" },
  { path: 'entrypage', component: EntryPageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'pastentries', component: PastentriesComponent },
  { path: 'entrydisplay', component: EntrydisplayComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
