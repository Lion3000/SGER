/*
* \file events-list.component.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-13 18:15:00 +0100 $

Projet : GEMARA - SGER
*/
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { SettingsService } from '../../services/settings.service';
import { CrewService } from '../../services/crew.service';
import { SubscriberService } from '../../services/subscriber.service';
import { PhaseService } from '../../services/phase.service';
import { BoatService } from '../../services/boat.service';

import { SearchBar } from '../../class/searchbar';
import { Event } from '../../class/data/event';
import { Settings } from '../../class/data/settings';
import { Crew } from '../../class/data/crew';
import { Subscriber } from '../../class/data/subscriber';
import { Phase } from '../../class/data/phase';
import { UcOrganizeEvent } from '../../class/ucorganizeevent';
import { UcOrganizePhase } from '../../class/ucorganizephase';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
  providers: [
    EventService,
    SettingsService,
    CrewService,
    SubscriberService,
    PhaseService,
    BoatService
  ]
})

/**
 * Environnement de gestion des événements
 * Author: Zarzitski
 * Vrsion: 1
 * Date: 2017-04-13 18:15:00 +0100
 */
export class EventsListComponent extends SearchBar implements OnInit {
  protected events: {ref: Event[]};
  protected event: {ref: Event};
  protected settings: {ref: Settings};
  protected crews: {ref: Crew[]};
  protected phase: {ref: Phase};

  protected eventPanelIhm: {ref: boolean};
  protected deleteEventPanelIhm: {ref: boolean};
  protected phasePanelIhm: {ref: boolean};
  protected deletePhasePanelIhm: {ref: boolean};
  protected editMode: {ref: boolean};
  protected crewId: {ref: number};
  protected crewLetter: {ref: string};

  protected ucorganizeevent: UcOrganizeEvent;
  protected ucorganizephase: UcOrganizePhase;

  /**
   * Constructeur qui initialise les attributs
   * @param eventService persistance des événements
   * @param settingsService persistance des paramètres
   * @param crewService persistance des équipages
   * @param subscriberService persistance des participants
   * @param phaseService La persistance des phases
   * @param boatService persistance des bateaux
   */
  constructor(
    private eventService: EventService,
    private settingsService: SettingsService,
    private crewService: CrewService,
    private subscriberService: SubscriberService,
    private phaseService: PhaseService,
    private boatService: BoatService
  ) {
    super();
    this.events = {ref: []};
    this.event = {ref: new Event(0,'', '', '', 0, 1, '', [], [], false)};
    this.settings = {ref: new Settings('', '', '', '', '', '', '', '', 0, false)};
    this.phase = {ref: new Phase(0, '', false, [])};
    this.crews = {ref: []};
    this.eventPanelIhm = {ref: true};
    this.phasePanelIhm = {ref: true};
    this.editMode = {ref: true};
    this.deleteEventPanelIhm = {ref: false};
    this.deletePhasePanelIhm = {ref: false};
    this.crewId = {ref: 0};
    this.crewLetter = {ref: ''};
  }

  /**
   * Méthode qui initialise ucorganizeevent au chargement du EventsListComponent
   */
  ngOnInit(): void {
    this.ucorganizeevent = new UcOrganizeEvent(
      this.eventService, this.settingsService, this.crewService, this.subscriberService, this.boatService,
      this.events, this.event, this.settings, this.crews,
      this.eventPanelIhm, this.editMode, this.deleteEventPanelIhm,
      this.crewId, this.crewLetter
    );
    this.ucorganizephase = new UcOrganizePhase(
      this.phaseService, this.events, this.event, this.phase,
      this.phasePanelIhm, this.editMode, this.deletePhasePanelIhm
    );
  }

}
