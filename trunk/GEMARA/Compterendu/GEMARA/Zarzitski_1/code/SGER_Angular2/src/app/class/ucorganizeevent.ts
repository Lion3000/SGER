/*
* \file ucorganizeevent.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-13 21:34:00 +0100 $

Projet : GEMARA - SGER
*/
import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { SettingsService } from '../services/settings.service';
import { CrewService } from '../services/crew.service';
import { SubscriberService } from '../services/subscriber.service';
import { BoatService } from '../services/boat.service';

import { Event } from './data/event';
import { Settings } from './data/settings';
import { Crew } from './data/crew';
import { Subscriber } from './data/subscriber';

declare var Date;
declare const TIME_TO_WAIT_BUTTON;

/**
 * UcOrganiserEpreuve
 * Author: Zarzitski
 * Version: 2
 * Date: 2017-04-23 16:18:00 +0100
 */
export class UcOrganizeEvent {
  private eventService: EventService;
  private settingsService: SettingsService;
  private crewService: CrewService;
  private subscriberService: SubscriberService;
  private boatService: BoatService;
  private events: {ref: Event[]};
  private event: {ref: Event};
  private settings: {ref: Settings};
  private crews: {ref: Crew[]};
  private eventPanelIhm: {ref: boolean};
  private deleteEventPanelIhm: {ref: boolean};
  private editMode: {ref: boolean};
  private crewId: {ref: number};
  private crewLetter: {ref: string};

  /**
   * Constructeur qui initialise les attributs passés par référence et récupère les informations concernant l'événement
   * @param eventService persistance des événements
   * @param settingsService persistance des paramètres
   * @param crewService persistance des équipages
   * @param subscriberService persistance des participants
   * @param boatService persistance des bateaux
   * @param events Liste des événements
   * @param event Evénement selectionné
   * @param settings Les paramètres de l'application
   * @param crews Liste des équipages
   * @param eventPanelIhm booleen qui indique le comportement de l'IHM évenement
   * @param editMode booleen qui indique si le mode édition est sélectionné ou non
   * @param deleteEventPanelIhm booleen qui indique si une suppression est demandée
   * @param crewId identifiant du bateau
   * @param crewLetter lettre du bateau
   */
  constructor(
    eventService: EventService, settingsService: SettingsService, crewService: CrewService, subscriberService: SubscriberService, boatService: BoatService,
    events: {ref: Event[]}, event: {ref: Event}, settings: {ref: Settings}, crews: {ref: Crew[]},
    eventPanelIhm: {ref: boolean}, editMode: {ref: boolean}, deleteEventPanelIhm: {ref: boolean},
    crewId: {ref: number}, crewLetter: {ref: string}
  ) {
    this.eventService = eventService;
    this.settingsService = settingsService;
    this.crewService = crewService;
    this.subscriberService = subscriberService;
    this.boatService = boatService;
    this.events = events;
    this.event = event;
    this.settings = settings;
    this.crews = crews;
    this.eventPanelIhm = eventPanelIhm;
    this.editMode = editMode;
    this.deleteEventPanelIhm = deleteEventPanelIhm;
    this.crewId = crewId;
    this.crewLetter = crewLetter;
    this.read();
  }

  /**
   * Créer un événement
   */
  public create(): void {
    if(this.testEventPanel()){
      this.event.ref.setId(this.eventService.getNewID());
      this.eventService.create(this.event.ref);
      this.subscriberService.create(this.event.ref);
      this.boatService.create(this.event.ref);
      this.events.ref.push(
        new Event(
          this.event.ref.getId(), this.event.ref.getName(), this.event.ref.getOrganization(), this.event.ref.getLocation(), this.event.ref.getRanking(), this.event.ref.getNumberBoats(), this.event.ref.getDate(),
          this.event.ref.getSubscribers(), this.event.ref.getPhasesList(), this.event.ref.getTimeManagement()
        )
      );
      this.eventPanelShowHide();
    }
  }

  /**
   * Met à jour la liste des événements
   */
  public update(): void {
    if(this.testEventPanel()){
      const index = this.events.ref.findIndex(x => x.getId() == this.event.ref.getId());
      this.events.ref[index] = new Event(
        this.event.ref.getId(), this.event.ref.getName(), this.event.ref.getOrganization(), this.event.ref.getLocation(), this.event.ref.getRanking(), this.event.ref.getNumberBoats(), this.event.ref.getDate(),
        this.event.ref.getSubscribers(), this.event.ref.getPhasesList(), this.event.ref.getTimeManagement()
      );
      this.eventService.update(this.event.ref);
      this.subscriberService.update(this.event.ref);
      this.boatService.create(this.event.ref);
      this.eventPanelShowHide();
    }
  }

  /**
   * Test les champs du formulaire EventPanel et affiche les erreurs
   * @returns Retourne le resultat du test
   */
  public testEventPanel(): boolean {
    var testResult = true;
    if(!/^[A-Za-z0-9- ]{2,}[A-Za-z0-9- ]*$/.test(this.event.ref.getName())){
      testResult = false;
      alert('The event name contains unauthorized characters, please correct it with the allowed characters ("A-Z", "a-z", "0-9", "-", " ").');
    }
    if(!/^[A-Za-z0-9- ]{2,}[A-Za-z0-9- ]*$/.test(this.event.ref.getOrganization())){
      testResult = false;
      alert('The event organization name contains unauthorized characters, please correct it with the allowed characters ("A-Z", "a-z", "0-9", "-", " ").');
    }
    if(!/^[A-Za-z0-9- ]{2,}[A-Za-z0-9- ]*$/.test(this.event.ref.getLocation())){
      testResult = false;
      alert('The event location contains unauthorized characters, please correct it with the allowed characters ("A-Z", "a-z", "0-9", "-", " ").');
    }
    if(!/^[0-5]{1}$/.test(this.event.ref.getRanking().toString())){
      testResult = false;
      alert('The ranking contains unauthorized number, please correct it with the allowed number ("0-5")');
    }
    if(!/^[1-9]{1,}[0-9]*$/.test(this.event.ref.getNumberBoats().toString())){
      testResult = false;
      alert('The boats contains unauthorized number, please correct it with the allowed number');
    }
    if(!/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(this.event.ref.getDate())){
      testResult = false;
      alert('The date contains unauthorized format, please correct it with the allowed format ("YYYY-MM-DD")');
    }
    return testResult;
  }

  /**
   * Initialise tous les paramètres, événements et équipages sauvegardés
   */
  public read(): void {
    this.settingsService.read(this.settings);
    this.eventService.read(this.events);
    this.crewService.read(this.crews);
  }

  /**
   * Supprime l'événement selectionné
   */
  public delete(): void {
    const index = this.events.ref.findIndex(x => x.getId() == this.event.ref.getId());
    this.eventService.delete(this.event.ref);
    this.subscriberService.delete(this.event.ref);
    this.events.ref.splice(index, 1);
    this.deletePanelHide();
  }

  /**
   * Affiche l'IHM crewPanel en mode création
   */
  public createEventPanel(): void {
    this.eventPanelShowHide();
    this.editMode.ref = false;
  }

  /**
   * Affiche l'IHM crewPanel en mode édition en récuperant l'événement à modifier
   * @param event L'événement selectionné pour la modification
   */
  public editEventPanel(event: Event): void {
    this.eventPanelShowHide();
    this.event.ref = new Event(
      event.getId(), event.getName(), event.getOrganization(), event.getLocation(), event.getRanking(), event.getNumberBoats(), event.getDate(),
      event.getSubscribers().slice(0), event.getPhasesList(), event.getTimeManagement()
    );
    this.subscriberService.read(this.event);
    this.editMode.ref = true;
  }

  /**
   * Affiche l'IHM crewPanel et vide les variables crewId et crewLetter
   */
  public eventPanelShowHide(): void {
    const date = new Date();
    this.event.ref = new Event(
      0,'', this.settings.ref.getOrganization(), this.settings.ref.getLocation(), 0, this.settings.ref.getAmountBoats(),
      date.yyyymmdd(), [], [], this.settings.ref.getTimeManagement()
    );
    this.crewId.ref = 0;
    this.crewLetter.ref = '';
    this.eventPanelIhm.ref = this.eventPanelIhm.ref ? false : true;
    this.addSubscriberEvent(this.addSubscriberEvent, this.subscriberService, this.crewLetter, this.crewId, this.crews, this.event, this.eventPanelIhm);
  }

  /**
   * Ajoute un participant à l'événement
   * @param addSubscriberEvent fonction addSubscriberEvent
   * @param subscriberService Persistance des participants
   * @param crewLetter lettre de l'équipage
   * @param crewId identifiant de l'équipage
   * @param crews Liste des équipages
   * @param event Liste des événements
   * @param eventPanelIhm Etat de l'ihm de gestion des événements
   */
  public addSubscriberEvent(addSubscriberEvent, subscriberService: SubscriberService, crewLetter: {ref: string}, crewId: {ref: number}, crews: {ref: Crew[]}, event: {ref: Event}, eventPanelIhm: {ref: boolean}): void{
    if(crewLetter.ref != '' && crewId.ref != 0){
      const index = crews.ref.findIndex(x => x.getId() == crewId.ref);
      var subscribers = event.ref.getSubscribers().slice(0);
      subscribers.push(new Subscriber(subscriberService.getNewID(), crews.ref[index].getName(), crews.ref[index].getCountry(), crews.ref[index].getIsaf(), crews.ref[index].getRanking(), crewLetter.ref));
      event.ref.setSubscribers(subscribers.slice(0));
      crewLetter.ref = '';
      crewId.ref = 0;
    }
    if(!eventPanelIhm.ref)
      setTimeout(addSubscriberEvent.bind(null, addSubscriberEvent, subscriberService, crewLetter, crewId, crews, event, eventPanelIhm), TIME_TO_WAIT_BUTTON);
  }

  /**
   * Supprime le participant sélectionné
   * @param subscriber participant sélectionné
   */
  public removeSubscriberEvent(subscriber: Subscriber): void{
    var subscribers = this.event.ref.getSubscribers().slice(0);
    const index = subscribers.findIndex(x => x.getId() == subscriber.getId());
    subscribers.splice(index, 1);
    this.event.ref.setSubscribers(subscribers.slice(0));
  }

  /**
   * Affiche l'IHM deletePanel en récuperant l'événement à supprimer
   * @param event événement selectionné pour la suppression
   */
  public deletePanelShow(event: Event): void {
    this.event.ref = new Event(
      event.getId(), event.getName(), event.getOrganization(), event.getLocation(), event.getRanking(), event.getNumberBoats(), event.getDate(),
      event.getSubscribers(), event.getPhasesList(), event.getTimeManagement()
    );
    this.deleteEventPanelIhm.ref = true;
  }

  /**
   * Cache l'IHM deletePanel et vide la variable event
   */
  public deletePanelHide(): void {
    this.event.ref = new Event(0,'', '', '', 0, 1, '', [], [], false);
    this.deleteEventPanelIhm.ref = false;
  }

  /**
   * Affiche et cache les détails de l'événement sélectionné
   * @param event événement selectionné
   */
  public detailPanelShowHide(event: Event): void {
    event.setHiddenContent(event.getHiddenContent()?false:true);
  }

  /**
   * Retourne une liste de lettres non utilisées
   * @returns Liste de lettres non utilisées
   */
  public getLattersList(): string[]{
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var subscribersInEvent = this.event.ref.getSubscribers();
    for(var i = 0; i < subscribersInEvent.length; i++){
      const index = letters.findIndex(x => x == subscribersInEvent[i].getLetter());
      letters.splice(index, 1);
    }
    return letters;
  }

  /**
   * Retourne une liste d'equipages non affectés
   * @returns Liste de lettres non affectés
   */
  public getCrewsList(): Crew[]{
    var crewsList = this.crews.ref.slice(0);
    var subscribersInEvent = this.event.ref.getSubscribers();
    for(var i = 0; i < subscribersInEvent.length; i++){
      const index = crewsList.findIndex(x =>
        x.getName() == subscribersInEvent[i].getName() &&
        x.getCountry() == subscribersInEvent[i].getCountry() &&
        x.getIsaf() == subscribersInEvent[i].getIsaf() &&
        x.getRanking() == subscribersInEvent[i].getRanking()
      );
      crewsList.splice(index, 1);
    }
    return crewsList;
  }
}
