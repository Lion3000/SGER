/*
* \file subscriber.service.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-15 21:05:00 +0100 $

Projet : GEMARA - SGER
*/
import { Injectable } from '@angular/core';
import { Subscriber } from '../class/data/subscriber';
import { Event } from '../class/data/event';
import { Phase } from '../class/data/phase';
import { CRUD } from '../class/crud';

@Injectable()

/**
 * Persistance de la classe Subscriber
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-15 21:05:00 +0100
 */
export class SubscriberService extends CRUD {

  /**
   * Constructeur qui passe la requête de la table SQL au constructeur de la classe DataBase
   */
  constructor(){
    super('SubscriberService','CREATE TABLE IF NOT EXISTS \
    Subscriber ( id INTEGER PRIMARY KEY AUTOINCREMENT, letter TEXT, event INTEGER, name TEXT, \
    country TEXT, isaf TEXT, ranking TEXT, FOREIGN KEY(event) REFERENCES Event(id) )', 'Subscriber');
    this.divID = 'SubscriberService';
  }

  /**
   * Créer les participants
   * @param event L'épreuve qui contient les participants
   */
  public create(event: Event): void {
    var subscribers = event.getSubscribers().slice(0);
    for (var i = 0; i < subscribers.length; i++) {
      this.writeDB([
        'INSERT INTO Subscriber(id, letter, event, name, country, isaf, ranking) \
        VALUES (?, ?, ?, ?, ?, ?, ?)',
        [subscribers[i].getId(), subscribers[i].getLetter(), event.getId(), subscribers[i].getName(), subscribers[i].getCountry(), subscribers[i].getIsaf(), subscribers[i].getRanking()]
      ]);
    }
  }

  /**
   * Obtenir tous les participants
   * @param event L'épreuve selectioné par référence
   */
  public read(event: {ref: Event}) {
    var requestSQL: RequestSQL = {request: '', attribute : []};
    const eventID = +event.ref.getId();
    if(eventID > 0){
      requestSQL.request = '\
      SELECT * FROM Subscriber WHERE event = ' + eventID + ' ORDER BY name';
      var subscribers = {ref: event.ref};
      this.readDB(requestSQL, event, this.applyResult, this.divID);
    }
  }

  /**
   * Obtenir tous les participants à partir de la phase
   * @param event L'épreuve selectioné par référence
   * @param phase La Phase selectionée par référence
   */
  public readByPhase(event: {ref: Event}, phase: Phase) {
    var requestSQL: RequestSQL = {request: '', attribute : []};
    const phaseID = +phase.getId();
    if(phaseID > 0){
      requestSQL.request = '\
      SELECT S.* \
      FROM Subscriber S, Event E, Phase P \
      WHERE S.event = E.id AND E.id = P.event AND P.id = ' + phaseID + ' ORDER BY name';
      this.readDB(requestSQL, event, this.applyResult, this.divID);
    }
  }

  /**
   * Recuperation de la donnée dans la div et met à jour les participants dans l'épreuve
   * @param event L'épreuve selectioné par référence
   * @param dataID Le nom du service
   */
  protected applyResult(event: {ref: Event}, divID: string){
    const data = JSON.parse(document.getElementById(divID).innerHTML);
    document.getElementById(divID).innerHTML = '';
    var subscribers = [];
    for (var i = 0; i < data.length; i++) {
      subscribers.push(
        new Subscriber(data[i].id, data[i].name, data[i].country, data[i].isaf, data[i].ranking, data[i].letter)
      );
    }
    event.ref.setSubscribers(subscribers.slice(0));
  }

  /**
   * Met à jour la liste des participants
   * @param event L'épreuve selectioné
   */
  public update(event: Event): void {
    this.delete(event);
    this.create(event);
  }

  /**
   * Supprime tous les participants dans l'épreuve
   * @param event L'épreuve selectioné
   */
  public delete(event: Event): void {
     this.writeDB([
     'DELETE FROM Subscriber WHERE event = ?',
     [event.getId()]
     ]);
  }

}
