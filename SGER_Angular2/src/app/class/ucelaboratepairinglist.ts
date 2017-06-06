/*
* \file ucelaboratepairinglist.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-21 11:33:00 +0100 $

Projet : GEMARA - SGER
*/
/// <reference path="./winnerPanel.ts" />
import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { PhaseService } from '../services/phase.service';
import { FlightService } from '../services/flight.service';
import { SubscriberService } from '../services/subscriber.service';
import { BoatService } from '../services/boat.service';
import { MatchService } from '../services/match.service';
import { RacerService } from '../services/racer.service';
import { PenaltyService } from '../services/penalty.service';

import { Event } from './data/event';
import { Phase } from './data/phase';
import { Flight } from './data/flight';
import { Match } from './data/match';
import { Racer } from './data/racer';
import { Boat } from './data/boat';
import { Subscriber } from './data/subscriber';
import { Penalty } from './data/penalty';

declare var Date;
declare const TIME_TO_WAIT;
declare const TIME_TO_WAIT_BUTTON;

/**
 * UcElaborerPairingList
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-21 11:33:00 +0100
 */
export class UcElaboratePairingList {
  private eventService: EventService;
  private phaseService: PhaseService;
  private flightService: FlightService;
  private subscriberService: SubscriberService;
  private boatService: BoatService;
  private matchService: MatchService;
  private racerService: RacerService;
  private penaltyService: PenaltyService;
  private event: {ref: Event};
  private phase: {ref: Phase};
  private flight: {ref: Flight};
  private match: {ref: Match};
  private racer: {ref: Racer};
  private winnerPanelIhm: {ref: WinnerPanel};
  private deleteFlightPanelIhm: {ref: boolean};
  private penaltyPanelIhm: {ref: boolean};
  private startTime: {ref: string};
  private startDate: {ref: string};

  /**
   * Constructeur qui initialise les attributs passés par référence, récupère les informations sur les flights et lance l'autocréation et l'autodescruction des matchs
   * @param eventService Persistance des événements
   * @param phaseService Persistance des phases
   * @param flightService Persistance des flights
   * @param subscriberService Persistance des subscribers
   * @param boatService Persistance des bateaux
   * @param matchService Persistance des matchs
   * @param racerService Persistance des concurrent
   * @param penaltyService Persistance des pénalités
   * @param event représente un événement
   * @param phase représente une phase
   * @param flight représente un flight
   * @param match représente un match
   * @param racer représente un concurrent
   * @param deleteFlightPanelIhm Variable qui indique le comportement de l'IHM deletePanel
   * @param winnerPanelIhm Booléen qui indique le comportement de l'IHM deletePanel
   * @param penaltyPanelIhm Booléen qui indique le comportement de l'IHM deletePanel
   * @param startTime Heure du départ
   * @param startDate Date du départ
   */
  constructor(
    eventService: EventService, phaseService: PhaseService, flightService: FlightService, subscriberService: SubscriberService,
     boatService: BoatService, matchService: MatchService, racerService: RacerService, penaltyService: PenaltyService,
    event: {ref: Event}, phase: {ref: Phase}, flight: {ref: Flight}, match: {ref: Match}, racer: {ref: Racer},
    deleteFlightPanelIhm: {ref: boolean}, winnerPanelIhm: {ref: WinnerPanel}, penaltyPanelIhm: {ref: boolean}, startTime: {ref: string}, startDate: {ref: string}
  ) {
    this.eventService = eventService;
    this.phaseService = phaseService;
    this.flightService = flightService;
    this.subscriberService = subscriberService;
    this.boatService = boatService;
    this.matchService = matchService;
    this.racerService = racerService;
    this.penaltyService = penaltyService;
    this.event = event;
    this.phase = phase;
    this.flight = flight;
    this.match = match;
    this.racer = racer;
    this.winnerPanelIhm = winnerPanelIhm;
    this.deleteFlightPanelIhm = deleteFlightPanelIhm;
    this.penaltyPanelIhm = penaltyPanelIhm;
    this.startTime = startTime;
    this.startDate = startDate;
    this.read();
    this.autoCreateMatch.bind(this)();
    this.autoDeleteMatch.bind(this)();
  }

  /**
   * Créer un flight
   */
  public createFlight(): void {
    this.flight.ref = new Flight(this.flightService.getNewID(), this.flightService.getNewFlightNumber(), [], '');
    var flights = this.phase.ref.getFlightsList().slice(0);
    flights.push(new Flight(this.flight.ref.getId(), this.flight.ref.getFlightNumber(), [], ''));
    this.phase.ref.setFlightsList(flights.slice(0));
    this.flightService.create(this.flight.ref);
    this.flightService.setPhaseID(this.flight.ref, this.phase.ref);
  }

  /**
   * Initialise toutes les informations sur l'événement sélectionné
   */
  public read(): void {
    this.flightService.readCurrentFlightNumber(this.phase.ref);
    this.flightService.read(this.phase);
    this.eventService.readByPhase(this.event, this.phase.ref);
    this.subscriberService.readByPhase(this.event, this.phase.ref);
    this.boatService.read(this.event);
    this.phaseService.readById(this.phase);
    this.updateMenu.bind(this)();
  }

  /**
   * Met à jour la barre de navigation
   */
  private updateMenu(): void{
    if(this.event.ref.getId() != 0 && this.phase.ref.getName() != ''){
      var menuList = [];
      menuList.push({title: "Event: " + this.event.ref.getName(), link:"events-list"});
      menuList.push({title: "Phase: " + this.phase.ref.getName(), link:"phase/" + this.phase.ref.getId()});
      document.getElementById('MenuData').innerHTML = JSON.stringify(menuList);
    }
    else
      setTimeout(this.updateMenu.bind(this), TIME_TO_WAIT);
  }

  /**
   * Supprime le flight selectionné
   */
  public deleteFlight(): void {
    var flights = this.phase.ref.getFlightsList().slice(0);
    const indexFlights = flights.findIndex(x => x.getId() == this.flight.ref.getId());
    flights.splice(indexFlights, 1);
    this.phase.ref.setFlightsList(flights.slice(0));
    this.flightService.delete(this.flight.ref);
    this.flightService.readCurrentFlightNumber(this.phase.ref);
    this.deletePanelHide();
  }

  /**
   * Crée automatiquement un match lorsque les champs sont remplis
   */
  public autoCreateMatch(): void{
    var fligths = this.phase.ref.getFlightsList().slice(0);
    for (var i = 0; i < fligths.length; i++) {
      if(fligths[i].getHiddenContent()){
        if(fligths[i].getBlueSubscriberId() > 0 && fligths[i].getBlueBoatId() > 0 && fligths[i].getYellowSubscriberId() > 0 && fligths[i].getYellowBoatId() > 0){
          var subscribers = this.event.ref.getSubscribers().slice(0);
          var boats = this.event.ref.getBoatsList().slice(0);

          const indexBlueSubscriber = subscribers.findIndex(x => x.getId() == fligths[i].getBlueSubscriberId());
          const indexYellowSubscriber = subscribers.findIndex(x => x.getId() == fligths[i].getYellowSubscriberId());
          const indexBlueBoat = boats.findIndex(x => x.getId() == fligths[i].getBlueBoatId());
          const indexYellowBoat = boats.findIndex(x => x.getId() == fligths[i].getYellowBoatId());
          var blueRacer = new Racer(
            this.racerService.getNewID(), subscribers[indexBlueSubscriber].getName(), subscribers[indexBlueSubscriber].getCountry(),
            subscribers[indexBlueSubscriber].getIsaf(), subscribers[indexBlueSubscriber].getRanking(), subscribers[indexBlueSubscriber].getLetter(),
            0, {ref: boats[indexBlueBoat]}, new Penalty(0, 0, '')
          );
          var yellowRacer = new Racer(
            this.racerService.getNewID(), subscribers[indexYellowSubscriber].getName(), subscribers[indexYellowSubscriber].getCountry(),
            subscribers[indexYellowSubscriber].getIsaf(), subscribers[indexYellowSubscriber].getRanking(), subscribers[indexYellowSubscriber].getLetter(),
            0, {ref: boats[indexYellowBoat]}, new Penalty(0, 0, '')
          );
          var match = new Match(this.matchService.getNewID(), blueRacer, yellowRacer, true, '');
          var matchsList = fligths[i].getMatchsList().slice(0);
          matchsList.push(match);
          fligths[i].setMatchsList(matchsList.slice(0));

          this.matchService.create(match);
          this.matchService.setFlightID(match, fligths[i]);
          this.racerService.create(match);
          fligths[i].setBlueSubscriberId(0);
          fligths[i].setBlueBoatId(0);
          fligths[i].setYellowSubscriberId(0);
          fligths[i].setYellowBoatId(0);
          this.phase.ref.setFlightsList(fligths.slice(0));
        }
      }
    }
    setTimeout(this.autoCreateMatch.bind(this), TIME_TO_WAIT_BUTTON);
  }

  /**
   *  Détruit automatiquement un match lorsque les champs sont vidés
   */
  public autoDeleteMatch(): void{
    var fligths = this.phase.ref.getFlightsList().slice(0);
    for (var i = 0; i < fligths.length; i++) {
      if(fligths[i].getHiddenContent()){
        var matchsList = fligths[i].getMatchsList().slice(0);
        for (var j = 0; j < matchsList.length; j++) {
          if(!matchsList[j].getLocked()){
            if(matchsList[j].getBlueSubscriberId() == -1 && matchsList[j].getBlueBoatId() == -1 && matchsList[j].getYellowSubscriberId() == -1 && matchsList[j].getYellowBoatId() == -1){
              this.matchService.delete(matchsList[j]);
              matchsList.splice(j, 1);
            }
          }
        }
        fligths[i].setMatchsList(matchsList.slice(0));
        this.phase.ref.setFlightsList(fligths.slice(0));
      }

    }
    setTimeout(this.autoDeleteMatch.bind(this), TIME_TO_WAIT_BUTTON);
  }

  /**
   * Déverouille le match afin de pouvoir le modifier
   * @param match Match sélectionné
   */
  public unlockMatch(match: Match): void{
    match.setLocked(false);
    var blueRacer = match.getBlue();
    var yellowRacer = match.getYellow();
    const indexBlueSubscriber = this.event.ref.getSubscribers().findIndex(
      x => x.getName() == blueRacer.getName() && x.getCountry() == blueRacer.getCountry()
      && x.getIsaf() == blueRacer.getIsaf() && x.getRanking() == blueRacer.getRanking()
      && x.getLetter() == blueRacer.getLetter()
    );
    const indexYellowSubscriber = this.event.ref.getSubscribers().findIndex(
      x => x.getName() == yellowRacer.getName() && x.getCountry() == yellowRacer.getCountry()
      && x.getIsaf() == yellowRacer.getIsaf() && x.getRanking() == yellowRacer.getRanking()
      && x.getLetter() == yellowRacer.getLetter()
    );
    match.setBlueSubscriberId(this.event.ref.getSubscribers()[indexBlueSubscriber].getId());
    match.setYellowSubscriberId(this.event.ref.getSubscribers()[indexYellowSubscriber].getId());
    match.setBlueBoatId(blueRacer.getBoat().getId());
    match.setYellowBoatId(yellowRacer.getBoat().getId());
  }

  /**
   * Met à jour les informations concernant le match
   * @param match Match sélectionné
   */
  public updateMatch(match: Match): void{
    var subscribers = this.event.ref.getSubscribers().slice(0);
    var boats = this.event.ref.getBoatsList().slice(0);

    const indexBlueSubscriber = subscribers.findIndex(x => x.getId() == match.getBlueSubscriberId());
    const indexYellowSubscriber = subscribers.findIndex(x => x.getId() == match.getYellowSubscriberId());
    const indexBlueBoat = boats.findIndex(x => x.getId() == match.getBlueBoatId());
    const indexYellowBoat = boats.findIndex(x => x.getId() == match.getYellowBoatId());
    var blueRacer = new Racer(
      match.getBlue().getId(), subscribers[indexBlueSubscriber].getName(), subscribers[indexBlueSubscriber].getCountry(),
      subscribers[indexBlueSubscriber].getIsaf(), subscribers[indexBlueSubscriber].getRanking(), subscribers[indexBlueSubscriber].getLetter(),
      0, {ref: boats[indexBlueBoat]}, new Penalty(0, 0, '')
    );
    var yellowRacer = new Racer(
      match.getYellow().getId(), subscribers[indexYellowSubscriber].getName(), subscribers[indexYellowSubscriber].getCountry(),
      subscribers[indexYellowSubscriber].getIsaf(), subscribers[indexYellowSubscriber].getRanking(), subscribers[indexYellowSubscriber].getLetter(),
      0, {ref: boats[indexYellowBoat]}, new Penalty(0, 0, '')
    );
    match.setBlue(blueRacer);
    match.setYellow(yellowRacer);
    match.setLocked(true);
    this.racerService.update(match);
  }

  /**
   * Affiche l'IHM deletePanel en récuperant le flight à supprimer
   * @param crew L'équipage selectionné pour la suppression
   */
  public deletePanelShow(flight: Flight): void {
    this.flight.ref = new Flight(
      flight.getId(), flight.getFlightNumber(),
      flight.getMatchsList(), flight.getStartDateTime()
    );
    this.deleteFlightPanelIhm.ref = true;
    document.body.scrollTop = 0;
  }

  /**
   * Cache l'IHM deletePanel et vide la variable flight
   */
  public deletePanelHide(): void {
    this.flight.ref = new Flight(0, 0, [], '');
    this.deleteFlightPanelIhm.ref = false;
  }

  /**
   * Met à jour l'équipage gagnant dans la base de données en lui ajoutant un point ou met à jour les deux équipages en leur attribuant 0.5 points chacun dans le cas d'un match nul
   */
  public saveWinnerScore(): void {
    this.match.ref.setFinishDateTime(this.winnerPanelIhm.ref.time);
    switch(this.winnerPanelIhm.ref.scoreBar){
      case 0:
        this.match.ref.getBlue().setPoints(1);
       break;
      case 1:
        this.match.ref.getBlue().setPoints(0.5);
        this.match.ref.getYellow().setPoints(0.5);
       break;
      case 2:
        this.match.ref.getYellow().setPoints(1);
       break;
    }
    var flights = this.phase.ref.getFlightsList();
    for (var i = 0; i < flights.length; i++) {
      var matchs = flights[i].getMatchsList()
      const index = matchs.findIndex(x => x.getId() == this.match.ref.getId());
      if(index != -1){
        matchs[index].getBlue().setPoints(this.match.ref.getBlue().getPoints());
        matchs[index].getYellow().setPoints(this.match.ref.getYellow().getPoints());
        matchs[index].setFinishDateTime(this.match.ref.getFinishDateTime());
        i = flights.length;
      }
    }
    this.matchService.update(this.match.ref);
    this.racerService.update(this.match.ref);
    this.winnerPanelHide();
  }

  /**
   * Remet à zéro le nombre de point et de pénalité des deux équipages
   */
  public removeWinnerScore(): void {
    this.match.ref.setFinishDateTime('');
    this.match.ref.getBlue().setPoints(0);
    this.match.ref.getBlue().setPenalty(new Penalty(0, 0, ''));
    this.match.ref.getYellow().setPoints(0);
    this.match.ref.getYellow().setPenalty(new Penalty(0, 0, ''));

    var flights = this.phase.ref.getFlightsList();
    for (var i = 0; i < flights.length; i++) {
      var matchs = flights[i].getMatchsList();
      const index = matchs.findIndex(x => x.getId() == this.match.ref.getId());
      if(index != -1){
        matchs[index].getBlue().setPoints(this.match.ref.getBlue().getPoints());
        matchs[index].getBlue().setPenalty(new Penalty(0, 0, ''));
        matchs[index].getYellow().setPoints(this.match.ref.getYellow().getPoints());
        matchs[index].getYellow().setPenalty(new Penalty(0, 0, ''));
        matchs[index].setFinishDateTime(this.match.ref.getFinishDateTime());
        i = flights.length;
      }
    }
    this.matchService.update(this.match.ref);
    this.racerService.update(this.match.ref);
    this.deleteWinnerPanelHide();
  }

  /**
   * Affiche le formulaire de sélection du vainqueur en présélectionnant l'équipage cliqué
   * @param match représente le match concerné
   * @param racer représente l'équipage sélectionné
   */
  public winnerPanelShow(match: Match, racer: string): void {
    this.winnerPanelIhm.ref.time = new Date().toTimeString().split(' ')[0];
    this.winnerPanelIhm.ref.hide = false;
    switch(racer){
      case 'blue': this.winnerPanelIhm.ref.scoreBar = 0; break;
      case 'blue/yellow': this.winnerPanelIhm.ref.scoreBar = 1; break;
      case 'yellow': this.winnerPanelIhm.ref.scoreBar = 2; break;
    }
    const blueRacer = match.getBlue();
    const blueBoat = blueRacer.getBoat();
    var blueRacerNew = new Racer(
      blueRacer.getId(), blueRacer.getName(), blueRacer.getCountry(), blueRacer.getIsaf(), blueRacer.getRanking(),
      blueRacer.getLetter(), blueRacer.getPoints(), {ref: new Boat(blueBoat.getId(), blueBoat.getBoatNumber())},
      new Penalty(0, 0, '')
    );
    const yellowRacer = match.getYellow();
    const yellowBoat = yellowRacer.getBoat();
    var yellowRacerNew = new Racer(
      yellowRacer.getId(), yellowRacer.getName(), yellowRacer.getCountry(), yellowRacer.getIsaf(), yellowRacer.getRanking(),
      yellowRacer.getLetter(), yellowRacer.getPoints(), {ref: new Boat(yellowBoat.getId(), yellowBoat.getBoatNumber())},
      new Penalty(0, 0, '')
    );
    this.match.ref = new Match(match.getId(), blueRacerNew, yellowRacerNew, match.getLocked(), match.getFinishDateTime());
    document.body.scrollTop = 0;
  }

  /**
   * Cache l'IHM winnerPanel et vide les variables racer et match
   */
  public winnerPanelHide(): void {
    this.winnerPanelIhm.ref.hide = true;
    this.winnerPanelIhm.ref.time = '';
    this.winnerPanelIhm.ref.scoreBar = 0;
    const racer = new Racer(0, '', '', '', 0, '', 0, {ref: new Boat(0, 0)}, new Penalty(0, 0, ''))
    this.match.ref = new Match(0, racer, racer, false, '');
  }

  /**
   * Affiche l'IHM deletePanel en récupérant le match dont les scores sont à supprimer
   * @param match Match selectionné pour la suppression des scores
   */
  public deleteWinnerPanelShow(match: Match): void {
    const blueRacer = match.getBlue();
    const blueBoat = blueRacer.getBoat();
    var blueRacerNew = new Racer(
      blueRacer.getId(), blueRacer.getName(), blueRacer.getCountry(), blueRacer.getIsaf(), blueRacer.getRanking(),
      blueRacer.getLetter(), blueRacer.getPoints(), {ref: new Boat(blueBoat.getId(), blueBoat.getBoatNumber())},
      new Penalty(0, 0, '')
    );
    const yellowRacer = match.getYellow();
    const yellowBoat = yellowRacer.getBoat();
    var yellowRacerNew = new Racer(
      yellowRacer.getId(), yellowRacer.getName(), yellowRacer.getCountry(), yellowRacer.getIsaf(), yellowRacer.getRanking(),
      yellowRacer.getLetter(), yellowRacer.getPoints(), {ref: new Boat(yellowBoat.getId(), yellowBoat.getBoatNumber())},
      new Penalty(0, 0, '')
    );
    this.match.ref = new Match(match.getId(), blueRacerNew, yellowRacerNew, match.getLocked(), match.getFinishDateTime());
    this.winnerPanelIhm.ref.deletePanelhide = false;
    document.body.scrollTop = 0;
  }

  /**
   * Cache l'IHM deletePanel et vide les variables racer et match
   */
  public deleteWinnerPanelHide(): void {
    const racer = new Racer(0, '', '', '', 0, '', 0, {ref: new Boat(0, 0)}, new Penalty(0, 0, ''))
    this.match.ref = new Match(0, racer, racer, false, '');
    this.winnerPanelIhm.ref.deletePanelhide = true;
  }

  /**
   * Récupère le concurrent sélectionné
   * @returns Le concurrent sélectionné
   */
  private getRefRacer(): Racer {
    var flights = this.phase.ref.getFlightsList();
    var racer: Racer;
    for (var i = 0; i < flights.length; i++) {
      var matchs = flights[i].getMatchsList()
      for (var j = 0; j < matchs.length; j++) {
        if(matchs[j].getBlue().getId() == this.racer.ref.getId()){
          racer = matchs[j].getBlue();
          i = flights.length;
          j = flights.length;
        }
        else if(matchs[j].getYellow().getId() == this.racer.ref.getId()){
          racer = matchs[j].getYellow();
          i = flights.length;
          j = flights.length;
        }
      }
    }
    return racer;
  }

  /**
   * Gère l'ajout, la mise à jour et la suppression des pénalités
   */
  private createUpdateDeletePenalty(): void {
    var penalty = this.racer.ref.getPenalty();
    var racer = this.getRefRacer();

    if(penalty.getId() == 0 && penalty.getPoints() != 0){
      //Create
      penalty.setId(this.penaltyService.getNewID());
      racer.getPenalty().setId(penalty.getId());
      racer.getPenalty().setPoints(penalty.getPoints());
      racer.getPenalty().setDetail(penalty.getDetail());
      this.penaltyService.create(this.racer.ref);
    }
    else{
      if(penalty.getPoints() == 0){
        //Delete
        racer.getPenalty().setId(0);
        racer.getPenalty().setPoints(0);
        racer.getPenalty().setDetail('');
        this.penaltyService.delete(this.racer.ref.getPenalty());
      }
      else{
        //Update
        racer.getPenalty().setPoints(penalty.getPoints());
        racer.getPenalty().setDetail(penalty.getDetail());
        this.penaltyService.update(this.racer.ref);
      }
    }
    this.penaltyPanelIhmHide();
  }

  /**
   * Affiche l'IHM de gestion des pénalités
   * @param racer Concurrent selectionné
   */
  public penaltyPanelIhmShow(racer: Racer): void {
    this.racer.ref = new Racer(
      racer.getId(), racer.getName(), racer.getCountry(), racer.getIsaf(), racer.getRanking(),
      racer.getLetter(), racer.getPoints(), {ref: new Boat(racer.getBoat().getId(), racer.getBoat().getBoatNumber())},
      new Penalty(racer.getPenalty().getId(), racer.getPenalty().getPoints(), racer.getPenalty().getDetail())
    );
    this.penaltyPanelIhm.ref = true;
    document.body.scrollTop = 0;
  }

  /**
   * Cache l'IHM de gestion des pénalités et vide la variable racer
   */
  public penaltyPanelIhmHide(): void {
    this.racer.ref = new Racer(0, '', '', '', 0, '', 0, {ref: new Boat(0, 0)}, new Penalty(0, 0, ''));
    this.penaltyPanelIhm.ref = false;
  }

  /**
   * Affiche les détails du flight sélectionné : match, concurrents, bateaux et pénalité
   * @param flight Flight selectionné
   */
  public detailPanelShowHide(flight: Flight): void {
    flight.setHiddenContent(flight.getHiddenContent()?false:true);
    if(flight.getHiddenContent()){
      this.matchService.read({ref: flight});
      this.racerService.read({ref: flight});
      this.boatService.associationBoatsToRacer({ref: flight});
      this.penaltyService.read({ref: flight});
    }
  }

  /**
   * Retourne la liste des bateaux disponibles avec le beteau sélectionné par l'identifiant
   * @param flight Flight selectionné
   * @param boatId L'identifiant du bateau
   * @returns La liste des bateaux disponibles avec le beteau sélectionné
   */
  public getBoatsList(flight: Flight, boatId: number): Boat[]{
    var boatsList = this.event.ref.getBoatsList().slice(0);
    var matchsInFlight = flight.getMatchsList();
    for(var i = 0; i < matchsInFlight.length; i++){
      const indexBlue = boatsList.findIndex(x => x.getId() == matchsInFlight[i].getBlue().getBoat().getId());
      boatsList.splice(indexBlue, 1);
      const indexYellow = boatsList.findIndex(x => x.getId() == matchsInFlight[i].getYellow().getBoat().getId());
      boatsList.splice(indexYellow, 1);
    }

    const indexBlueTmp = boatsList.findIndex(x => x.getId() == flight.getBlueBoatId());
    if(indexBlueTmp != -1)
      boatsList.splice(indexBlueTmp, 1);
    const indexYellowTmp = boatsList.findIndex(x => x.getId() == flight.getYellowBoatId());
    if(indexYellowTmp != -1)
      boatsList.splice(indexYellowTmp, 1);

    const index = this.event.ref.getBoatsList().findIndex(x => x.getId() == boatId);
    if(index != -1)
      boatsList.push(this.event.ref.getBoatsList().slice(0)[index]);
    return boatsList;
  }

  /**
   * Retourne la liste des participants disponibles avec le participant sélectionné par l'identifiant
   * @param flight Flight selectionné
   * @param subscriberId L'identifiant du participant
   * @returns La liste des bateaux disponibles avec le beteau sélectionné
   */
  public getSubscribersList(flight: Flight, subscriberId: number): Subscriber[]{
    var subscribersList = this.event.ref.getSubscribers().slice(0);
    var matchsInFlight = flight.getMatchsList();
    for(var i = 0; i < matchsInFlight.length; i++){
      const indexBlue = subscribersList.findIndex(x => x.getLetter() == matchsInFlight[i].getBlue().getLetter());
      subscribersList.splice(indexBlue, 1);
      const indexYellow = subscribersList.findIndex(x => x.getLetter() == matchsInFlight[i].getYellow().getLetter());
      subscribersList.splice(indexYellow, 1);
    }

    const indexBlueTmp = subscribersList.findIndex(x => x.getId() == flight.getBlueSubscriberId());
    if(indexBlueTmp != -1)
      subscribersList.splice(indexBlueTmp, 1);
    const indexYellowTmp = subscribersList.findIndex(x => x.getId() == flight.getYellowSubscriberId());
    if(indexYellowTmp != -1)
      subscribersList.splice(indexYellowTmp, 1);
    const index = this.event.ref.getSubscribers().findIndex(x => x.getId() == subscriberId);
    if(index != -1)
      subscribersList.push(this.event.ref.getSubscribers().slice(0)[index]);
    return subscribersList;
  }

  /**
   * Affecte le temps de départ à un flight
   * @param flight Flight selectionné
   */
  public createStartDateTime(flight: Flight): void{
    if(this.startDate.ref == '' || this.startTime.ref == ''){
      this.startDate.ref = new Date().yyyymmdd();
      this.startTime.ref = new Date().toTimeString().split(' ')[0];;
    }
    flight.setStartDateTime(this.startDate.ref + ' ' + this.startTime.ref);
    this.flightService.update(flight);
    this.startDate.ref = '';
    this.startTime.ref = '';
  }

  /**
   * Supprime le temps de départ à un flight
   * @param flight Flight selectionné
   */
  public deleteStartDateTime(flight: Flight): void{
    flight.setStartDateTime('');
    this.flightService.update(flight);
  }

  /**
   * Recupere le numero du plus grand fligth
   * @returns Le numero du plus grand fligth
   */
  public getMaxFligthInArray(): number{
    const numberMax = Math.max.apply(Math,this.phase.ref.getFlightsList().map(this.getNumberOfFligth));
    return /^-?[\d.]+(?:e-?\d+)?$/.test(numberMax)?numberMax:0;
  }

  /**
   * Recupere le numero du fligth
   * @param flight Flight selectionné
   * @returns Le numero du fligth
   */
  private getNumberOfFligth(flight: Flight): number{
    return flight.getFlightNumber();
  }
}
