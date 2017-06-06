/*
* \file phase.service.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-17 14:24:00 +0100 $

Projet : GEMARA - SGER
*/
import { Injectable } from '@angular/core';
import { Event } from '../class/data/event';
import { Phase } from '../class/data/phase';
import { CRUD } from '../class/crud';

@Injectable()

/**
 * Persistance de la classe Phase
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-02 00:37:00 +0100
 */
export class PhaseService extends CRUD {

  /**
   * Constructeur qui passe la requête de la table SQL au constructeur de la classe DataBase
   */
  constructor(){
    super('PhaseService','\
    CREATE TABLE IF NOT EXISTS \
    Phase ( id INTEGER PRIMARY KEY AUTOINCREMENT, event INTEGER, name TEXT, roundRobin INTEGER, \
    FOREIGN KEY(event) REFERENCES Event(id))',
    'Phase');
    this.divID = 'PhaseService';
  }

  /**
   * Créer une phase
   * @param phase La phase qui doit être créé
   */
  public create(phase: Phase): void {
     this.writeDB([
       'INSERT INTO Phase(id, name, roundrobin) VALUES (?, ?, ?)',
       [phase.getId(), phase.getName(), +phase.getRoundRobin()]
     ]);
  }

  /**
   * Affecte la phase à l'épreuve
   * @param phase La phase selectionnée
   * @param event L'épreuve selectionnée
   */
  public setEventID(phase: Phase, event: Event): void {
     this.writeDB([
       'UPDATE Phase SET event = ? WHERE id = ?',
       [event.getId(), phase.getId()]
     ]);
  }

  /**
   * Obtenir tous les phases
   * @param events La liste des épreuves passés par référence
   */
  public read(events: {ref: Event[]}) {
    var requestSQL: RequestSQL = {request: '', attribute : []};
    requestSQL.request = 'SELECT * FROM Phase ORDER BY id';
    this.readDB(requestSQL, events, this.applyResult, this.divID);
  }

  /**
   * Obtenir la pahse à partir de l'identifiant
   * @param phase La phase selectionnée
   */
  public readById(phase: {ref: Phase}) {
    var requestSQL: RequestSQL = {request: '', attribute : []};
    const phaseID = +phase.ref.getId();
    if(phaseID > 0){
      requestSQL.request = 'SELECT * FROM Phase WHERE id = ' + phaseID + ' ORDER BY id';
      this.readDB(requestSQL, phase, this.applyResultById, this.divID);
    }
  }

  /**
   * Recuperation de la donnée dans la div et met à jour la liste des phases
   * @param events La liste des épreuves passés par référence
   * @param dataID Le nom du service
   */
  protected applyResult(events: {ref: Event[]}, divID: string){
    const data = JSON.parse(document.getElementById(divID).innerHTML);
    document.getElementById(divID).innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      const indexEvent = events.ref.findIndex(x => x.getId() == data[i].event);
      var phases = events.ref[indexEvent].getPhasesList().slice(0);
      phases.push( new Phase(data[i].id, data[i].name, data[i].roundRobin, []) );
      events.ref[indexEvent].setPhasesList(phases.slice(0));
    }
  }

  /**
   * Recuperation de la donnée dans la div et met à jour la pahse à partir de l'identifiant
   * @param phase La phase selectionnée
   * @param dataID Le nom du service
   */
  protected applyResultById(phase: {ref: Phase}, divID: string){
    const data = JSON.parse(document.getElementById(divID).innerHTML);
    document.getElementById(divID).innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      phase.ref.setName(data[i].name);
      phase.ref.setRoundRobin(data[i].roundRobin);
    }
  }

  /**
   * Met à jour la phase
   * @param crew La phase qui doit être mise à jour
   */
  public update(phase: Phase): void {
    this.writeDB([
     'UPDATE Phase SET name = ?, roundrobin = ? WHERE id = ?',
     [phase.getName(), +phase.getRoundRobin(), phase.getId()]
    ]);
  }

  /**
   * Supprime la phase avec tout son contenu
   * @param phase La phase qui doit être supprimée
   */
  public delete(phase: Phase): void {
    const phaseID = +phase.getId();
    if(phaseID > 0){
      this.writeDB(['DELETE FROM Penalty \
      WHERE id in (\
        SELECT R.penalty \
        FROM Racer R, Matchs M, Flight F \
        WHERE R.matchs = M.id AND M.flight = F.id AND F.phase = ' + phaseID + ')',
      []]);
      this.writeDB(['DELETE FROM Racer \
      WHERE matchs = (\
        SELECT M.id \
        FROM Matchs M, Flight F \
        WHERE M.flight = F.id AND F.phase = ' + phaseID + ')',[]]);
      this.writeDB(['DELETE FROM Matchs \
      WHERE flight = (SELECT id FROM Flight WHERE phase = ' + phaseID + ')',[]]);
      this.writeDB(['DELETE FROM Flight WHERE phase = ?',[phaseID]]);
      this.writeDB(['DELETE FROM Phase WHERE id = ?',[phaseID]]);
    }
  }

}
