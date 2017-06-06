/*
* \file match.service.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-23 14:40:00 +0100 $

Projet : GEMARA - SGER
*/
import { Injectable } from '@angular/core';
import { Match } from '../class/data/match';
import { Flight } from '../class/data/flight';
import { Racer } from '../class/data/racer';
import { Boat } from '../class/data/boat';
import { Penalty } from '../class/data/penalty';
import { CRUD } from '../class/crud';

@Injectable()

/**
 * Persistance de la classe Event
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-23 14:40:00 +0100
 */
export class MatchService extends CRUD {

  /**
   * Constructeur qui passe la requête de la table SQL au constructeur de la classe DataBase
   */
  constructor(){
    super('MatchService','\
    CREATE TABLE IF NOT EXISTS \
    Matchs ( id INTEGER PRIMARY KEY AUTOINCREMENT, flight INTEGER, locked INTEGER, finishDateTime INTEGER,\
     FOREIGN KEY(flight) REFERENCES Flight(id) )',
    'Matchs');
    this.divID = 'MatchService';
  }

  /**
   * Créer un match
   * @param match Le match qui doit être créé
   */
  public create(match: Match): void {
     this.writeDB([
       'INSERT INTO Matchs(id, locked, finishDateTime) VALUES (?, ?, ?)',
       [match.getId(), match.getLocked(), match.getFinishDateTime()]
     ]);
  }

  /**
   * Affecte le match au flight
   * @param match Le mach selectionné
   * @param flight Le flight selectionné
   */
  public setFlightID(match: Match, flight: Flight): void {
     this.writeDB([
       'UPDATE Matchs SET flight = ? WHERE id = ?',
       [flight.getId(), match.getId()]
     ]);
  }

  /**
   * Obtenir tous les matchs pour le flight
   * @param flight Le flight passé par référence
   */
  public read(flight: {ref: Flight}) {
    var requestSQL: RequestSQL = {request: '', attribute : []};
    const flightID = +flight.ref.getId();
    if(flightID > 0){
      requestSQL.request = '\
      SELECT * FROM Matchs \
      WHERE flight = ' + flightID + ' \
      ORDER BY id';
      this.readDB(requestSQL, flight, this.applyResult, this.divID);
    }
  }

  /**
   * Recuperation de la donnée dans la div et met à jour la liste des matchs
   * @param flight Le flight passé par référence
   * @param dataID Le nom du service
   */
  protected applyResult(flight: {ref: Flight}, divID: string){
    const data = JSON.parse(document.getElementById(divID).innerHTML);
    document.getElementById(divID).innerHTML = '';
    var matchs = [];
    const racer = new Racer(0, '', '', '', 0, '', 0, {ref: new Boat(0, 0)}, new Penalty(0, 0, ''))
    for (var i = 0; i < data.length; i++) {
      matchs.push(new Match(data[i].id, racer, racer, data[i].locked, data[i].finishDateTime));
    }
    flight.ref.setMatchsList(matchs.slice(0));
  }

  /**
   * Met à jour le match
   * @param match Le match qui doit être mise à jour
   */
  public update(match: Match): void {
    this.writeDB([
      'UPDATE Matchs SET locked = ?, finishDateTime = ? WHERE id = ?',
      [match.getLocked(), match.getFinishDateTime(), match.getId()]
    ]);
  }

  /**
   * Supprime le match avec tout son contenu
   * @param match Le match qui doit être supprimé
   */
  public delete(match: Match): void {
    const matchID = +match.getId();
    if(matchID > 0){
      this.writeDB(['DELETE FROM Penalty \
      WHERE id in (SELECT penalty FROM Racer WHERE matchs = ' + matchID + ')',[]]);
      this.writeDB(['DELETE FROM Racer \
      WHERE matchs = ?',[matchID]]);
      this.writeDB(['DELETE FROM Matchs WHERE id = ?',[matchID]]);
    }
  }

}
