import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { CrewsListComponent } from './components/crews-list/crews-list.component';
import { GuideComponent } from './components/guide/guide.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { PhaseComponent } from './components/phase/phase.component';
import { ResultsBoatComponent } from './components/results-boat/results-boat.component';
import { ResultSubscriberComponent } from './components/results-subscriber/results-subscriber.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventsListComponent,
    CrewsListComponent,
    GuideComponent,
    SettingsComponent,
    AboutComponent,
    PhaseComponent,
    ResultsBoatComponent,
    ResultSubscriberComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
