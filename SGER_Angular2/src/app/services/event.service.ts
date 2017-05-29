/*
* \file event.service.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-02 00:37:00 +0100 $

Projet : GEMARA - SGER
*/
import { Injectable } from '@angular/core';
import { Event } from '../class/data/event';
import { Phase } from '../class/data/phase';
import { CRUD } from '../class/crud';
declare var Date;

@Injectable()

/**
 * Persistance de la classe Event
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-02 00:37:00 +0100
 */
export class EventService extends CRUD {

  /**
   * Constructeur qui passe la requête de la table SQL au constructeur de la classe DataBase
   */
  constructor(){
    super('EventService','\
    CREATE TABLE IF NOT EXISTS \
    Event ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, organization TEXT, \
    location TEXT, ranking INTEGER, numberBoats INTEGER, date TEXT, timeManagement INTEGER)',
    'Event');
    this.divID = 'EventService';
  }

  /**
   * Créer une épreuve
   * @param event L'épreuve qui doit être créé
   */
  public create(event: Event): void {
     this.writeDB([
       'INSERT INTO \
       Event(id, name, organization, location, ranking, numberBoats, date, timeManagement) \
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
       [event.getId(), event.getName(), event.getOrganization(), event.getLocation(), event.getRanking(), event.getNumberBoats(), event.getDate(), +event.getTimeManagement()]
     ]);
  }

  /**
   * Obtenir tous les épreuves
   * @param events La liste des épreuves passées par référence
   */
  public read(events: {ref: Event[]}) {
    var requestSQL: RequestSQL = {request: '', attribute : []};
    requestSQL.request = 'SELECT * FROM Event ORDER BY date DESC, name';
    this.readDB(requestSQL, events, this.applyResult, this.divID);
  }

  /**
   * Obtenir l'épreuve avec la phase
   * @param event L'épreuve passée par référence
   * @param phase La phase passée par référence
   */
  public readByPhase(event: {ref: Event}, phase: Phase) {
    var requestSQL: RequestSQL = {request: '', attribute : []};
    const phaseID = +phase.getId();
    if(phaseID > 0){
      requestSQL.request = '\
      SELECT * FROM Event \
      WHERE id = (SELECT event FROM Phase WHERE id = ' + phaseID + ')';
      this.readDB(requestSQL, event, this.applyResultByPhase, this.divID);
    }
  }

  /**
   * Recuperation de la donnée dans la div et met à jour la liste des épreuves
   * @param events La liste des épreuves passées par référence
   * @param dataID Le nom du service
   */
  protected applyResult(events: {ref: Event[]}, divID: string){
    const data = JSON.parse(document.getElementById(divID).innerHTML);
    document.getElementById(divID).innerHTML = '';
    events.ref = [];
    for (var i = 0; i < data.length; i++) {
      events.ref.push(
        new Event(data[i].id, data[i].name, data[i].organization, data[i].location, data[i].ranking, data[i].numberBoats, data[i].date, [], [], data[i].timeManagement)
      );
    }
  }

  /**
   * Recuperation de la donnée dans la div et met à jour l'épreuve avec la phase
   * @param event L'épreuve passée par référence
   * @param dataID Le nom du service
   */
  private applyResultByPhase(event: {ref: Event}, divID: string){
    const data = JSON.parse(document.getElementById(divID).innerHTML);
    document.getElementById(divID).innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      event.ref.setId(data[i].id);
      event.ref.setName(data[i].name);
      event.ref.setTimeManagement(data[i].timeManagement);
    }
  }

  /**
   * Met à jour l'épreuve
   * @param event L'épreuve qui doit être mise à jour
   */
  public update(event: Event): void {
     this.writeDB([
     'UPDATE Event \
     SET name = ?, organization = ?, location = ?, ranking = ?, numberBoats = ?, date = ?, timeManagement = ? \
     WHERE id = ?',
     [event.getName(), event.getOrganization(), event.getLocation(), event.getRanking(), event.getNumberBoats(), event.getDate(), +event.getTimeManagement(), event.getId()]
     ]);
  }

  /**
   * Supprime l'épreuve et tout ce qu'elle contient
   * @param event L'épreuve qui doit être supprimé
   */
  public delete(event: Event): void {
    const eventID = +event.getId();
    if(eventID > 0){
      this.writeDB(['DELETE FROM Penalty \
      WHERE id IN (\
       SELECT R.penalty \
       FROM Racer R, Matchs M, Flight F, Phase P \
       WHERE R.matchs = M.id AND M.flight = F.id AND F.phase = P.id AND P.event = ' + eventID + ')',[]]);
      this.writeDB(['DELETE FROM Racer \
      WHERE matchs IN (SELECT M.id FROM Matchs M, Flight F, Phase P WHERE M.flight = F.id AND F.phase = P.id AND P.event = ' + eventID + ')',[]]);
      this.writeDB(['DELETE FROM Matchs \
      WHERE flight IN (SELECT F.id FROM Flight F, Phase P WHERE F.phase = P.id AND P.event = ' + eventID + ')',[]]);
      this.writeDB(['DELETE FROM Flight \
      WHERE phase IN (SELECT id FROM Phase WHERE event = ' + eventID + ')',[]]);
      this.writeDB(['DELETE FROM \
      Phase WHERE event = ?',[eventID]]);
      this.writeDB(['DELETE FROM Event \
      WHERE id = ?',[eventID]]);
    }
  }

}
