/*
* \file app-routing.module.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-22 09:30:00 +0100 $

Projet : GEMARA - SGER
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { CrewsListComponent } from './components/crews-list/crews-list.component';
import { GuideComponent } from './components/guide/guide.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { PhaseComponent } from './components/phase/phase.component';
import { ResultSubscriberComponent } from './components/results-subscriber/results-subscriber.component';
import { ResultsBoatComponent } from './components/results-boat/results-boat.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'events-list', component: EventsListComponent },
  { path: 'crews-list', component: CrewsListComponent },
  { path: 'guide', component: GuideComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'results-subscriber/:id', component: ResultSubscriberComponent },
  { path: 'results-boat/:id', component: ResultsBoatComponent },
  { path: 'phase/:id', component: PhaseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
