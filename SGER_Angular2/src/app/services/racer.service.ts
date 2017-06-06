/*
* \file racer.service.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-23 12:05:00 +0100 $

Projet : GEMARA - SGER
*/
import { Injectable } from '@angular/core';
import { Racer } from '../class/data/racer';
import { Match } from '../class/data/match';
import { Flight } from '../class/data/flight';
import { Boat } from '../class/data/boat';
import { Penalty } from '../class/data/penalty';
import { CRUD } from '../class/crud';

@Injectable()

/**
 * Persistance de la classe Racer
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-23 12:05:00 +0100
 */
export class RacerService extends CRUD {

  /**
   * Constructeur qui passe la requête de la table SQL au constructeur de la classe DataBase
   */
  constructor(){
    super('RacerService','CREATE TABLE IF NOT EXISTS\
     Racer ( id INTEGER PRIMARY KEY AUTOINCREMENT, matchs INTEGER, color TEXT, points REAL,\
     boat INTEGER, penalty INTEGER, letter TEXT, name TEXT, country TEXT, isaf TEXT, ranking TEXT, \
     FOREIGN KEY(matchs) REFERENCES Matchs(id), FOREIGN KEY(penalty) REFERENCES Penalty(id), \
     FOREIGN KEY(boat) REFERENCES Boat(id))', 'Racer');
    this.divID = 'RacerService';
  }

  /**
   * Crée deux concurrents pour le match
   * @param match Le match qui contient deux concurrents
   */
  public create(match: Match): void {
    this.writeDB([
      'INSERT INTO Racer(id, matchs, color, points, boat, penalty, letter, name, country, isaf, ranking) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [match.getBlue().getId(), match.getId(), 'b', match.getBlue().getPoints(),
      match.getBlue().getBoat().getId(), match.getBlue().getPenalty().getId(),
      match.getBlue().getLetter(), match.getBlue().getName(), match.getBlue().getCountry(),
      match.getBlue().getIsaf(), match.getBlue().getRanking()]
    ]);
    this.writeDB([
      'INSERT INTO Racer(id, matchs, color, points, boat, penalty, letter, name, country, isaf, ranking) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [match.getYellow().getId(), match.getId(), 'y', match.getYellow().getPoints(),
      match.getYellow().getBoat().getId(), match.getYellow().getPenalty().getId(),
      match.getYellow().getLetter(), match.getYellow().getName(), match.getYellow().getCountry(),
      match.getYellow().getIsaf(), match.getYellow().getRanking()]
    ]);
  }

  /**
   * Obtenir tous les concurrents pour un flight
   * @param flight Le flight passé par référence
   */
  public read(flight: {ref: Flight}) {
    var requestSQL: RequestSQL = {request: '', attribute : []};
    const flightID = +flight.ref.getId();
    if(flightID > 0){
      requestSQL.request = '\
      SELECT R.* \
      FROM Racer R, Matchs M \
      WHERE R.matchs = M.id AND M.flight = ' + flightID + ' \
      ORDER BY R.id';
      this.readDB(requestSQL, flight, this.applyResult, this.divID);
    }
  }

  /**
   * Recuperation de la donnée dans la div et met à jour la liste des concurrents pour un flight
   * @param flight Le flight passé par référence
   * @param dataID Le nom du service
   */
  protected applyResult(flight: {ref: Flight}, divID: string){
    const data = JSON.parse(document.getElementById(divID).innerHTML);
    document.getElementById(divID).innerHTML = '';
    var matchs = flight.ref.getMatchsList();
    for (var i = 0; i < data.length; i++) {
      const index = matchs.findIndex(x => x.getId() == data[i].matchs);
      switch (data[i].color) {
        case "b":
          matchs[index].setBlue(new Racer(data[i].id, data[i].name, data[i].country, data[i].isaf, data[i].ranking, data[i].letter, data[i].points, {ref: new Boat(0, 0)}, new Penalty(0, 0, '')));
          break;
        case "y":
          matchs[index].setYellow(new Racer(data[i].id, data[i].name, data[i].country, data[i].isaf, data[i].ranking, data[i].letter, data[i].points, {ref: new Boat(0, 0)}, new Penalty(0, 0, '')));
          break;
      }
    }
    flight.ref.setMatchsList(matchs.slice(0));
  }

  /**
   * Met à jour la liste des concurrents pour un match
   * @param match Le match sélectionné
   */
  public update(match: Match): void {
    this.delete(match);
    this.create(match);
  }

  /**
   * Supprime les deux concurrents du match
   * @param match Le match sélectionné
   */
  public delete(match: Match): void {
    const matchID = +match.getId();
    if(matchID > 0){
      this.writeDB(['DELETE FROM Penalty \
      WHERE id = (SELECT penalty FROM Racer WHERE matchs = ' + matchID + ')',[]]);
      this.writeDB(['DELETE FROM Racer \
      WHERE matchs = ?',[matchID]]);
    }
  }

}
