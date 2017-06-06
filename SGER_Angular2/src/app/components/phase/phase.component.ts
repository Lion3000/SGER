/*
* \file phase.component.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-22 09:30:00 +0100 $

Projet : GEMARA - SGER
*/
/// <reference path="../../class/winnerPanel.ts" />
import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { EventService } from '../../services/event.service';
import { PhaseService } from '../../services/phase.service';
import { FlightService } from '../../services/flight.service';
import { SubscriberService } from '../../services/subscriber.service';
import { BoatService } from '../../services/boat.service';
import { MatchService } from '../../services/match.service';
import { RacerService } from '../../services/racer.service';
import { PenaltyService } from '../../services/penalty.service';

import { SearchBar } from '../../class/searchbar';
import { Event } from '../../class/data/event';
import { Phase } from '../../class/data/phase';
import { Flight } from '../../class/data/flight';
import { Match } from '../../class/data/match';
import { Racer } from '../../class/data/racer';
import { Boat } from '../../class/data/boat';
import { Penalty } from '../../class/data/penalty';
import { Subscriber } from '../../class/data/subscriber';
import { UcElaboratePairingList } from '../../class/ucelaboratepairinglist';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css'],
  providers: [
    EventService,
    PhaseService,
    FlightService,
    SubscriberService,
    BoatService,
    MatchService,
    RacerService,
    PenaltyService
  ]
})
/**
 * Environnement de gestion des phases
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-22 09:30:00 +0100
 */
export class PhaseComponent extends SearchBar implements OnInit {
  protected event: {ref: Event};
  protected phase: {ref: Phase};
  protected flight: {ref: Flight};
  protected match: {ref: Match};
  protected racer: {ref: Racer};
  protected winnerPanelIhm: {ref: WinnerPanel};
  protected deleteFlightPanelIhm: {ref: boolean};
  protected penaltyPanelIhm: {ref: boolean};
  protected startTime: {ref: string};
  protected startDate: {ref: string};

  protected ucelaboratepairinglist: UcElaboratePairingList;

  /**
   * Constructeur qui initialise les attributs
   * @param eventService persistance des événements
   * @param phaseService La persistance des phases
   * @param flightService La persistance des flights
   * @param subscriberService persistance des participants
   * @param boatService persistance des bateaux
   * @param matchService persistance des matchs
   * @param racerService persistance des concurrents
   * @param penaltyService persistance des pénalités
   * @param route composant Angular
   * @param location composant Angular
   */
  constructor(
    private eventService: EventService,
    private phaseService: PhaseService,
    private flightService: FlightService,
    private subscriberService: SubscriberService,
    private boatService: BoatService,
    private matchService: MatchService,
    private racerService: RacerService,
    private penaltyService: PenaltyService,
    private route: ActivatedRoute, private location: Location
  ) {
    super();
    this.event = {ref: new Event(0,'', '', '', 0, 1, '', [], [], false)};
    this.phase = {ref: new Phase(0, '', false, [])};
    this.route.params.switchMap((params: Params) => params['id']).subscribe(id => this.phase.ref.setId(+id));
    var phases = [];
    phases.push(this.phase.ref);
    this.event.ref.setPhasesList(phases);
    this.flight = {ref: new Flight(0, 0, [], '')};
    const racer = new Racer(0, '', '', '', 0, '', 0, {ref: new Boat(0, 0)}, new Penalty(0, 0, ''));
    this.match = {ref: new Match(0, racer, racer, false, '')};
    this.racer = {ref: new Racer(0, '', '', '', 0, '', 0, {ref: new Boat(0, 0)}, new Penalty(0, 0, ''))};
    this.winnerPanelIhm = {ref: {hide: true, deletePanelhide: true, scoreBar: 0, time: ''}};
    this.deleteFlightPanelIhm = {ref: false};
    this.penaltyPanelIhm = {ref: false};
    this.startTime = {ref: ''};
    this.startDate = {ref: ''};
  }

  /**
   * Méthode qui initialise ucelaboratepairinglist au chargement du PhaseComponent
   */
  ngOnInit(): void {
    this.ucelaboratepairinglist = new UcElaboratePairingList(
      this.eventService, this.phaseService, this.flightService, this.subscriberService,
      this.boatService, this.matchService, this.racerService, this.penaltyService,
      this.event, this.phase, this.flight, this.match, this.racer,
      this.deleteFlightPanelIhm, this.winnerPanelIhm, this.penaltyPanelIhm, this.startTime, this.startDate
    );
  }

}
