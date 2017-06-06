/*
* \file penalty.service.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-23 15:51:00 +0100 $

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
 * Persistance de la classe Penalty
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-23 15:51:00 +0100
 */
export class PenaltyService extends CRUD {

  /**
   * Constructeur qui passe la requête de la table SQL au constructeur de la classe DataBase
   */
  constructor(){
    super('PenaltyService','\
    CREATE TABLE IF NOT EXISTS \
    Penalty ( id INTEGER PRIMARY KEY AUTOINCREMENT, points REAL,  detail TEXT )',
    'Penalty');
    this.divID = 'PenaltyService';
  }

  /**
   * Crée une pénalité pour un concurrent
   * @param racer Le concurrent qui prend la pénalité
   */
  public create(racer: Racer): void {
    this.writeDB([
      'INSERT INTO Penalty(id, points, detail) VALUES (?, ?, ?)',
      [racer.getPenalty().getId(), racer.getPenalty().getPoints(), racer.getPenalty().getDetail()]
    ]);
    this.writeDB([
      'UPDATE Racer SET penalty = ? WHERE id = ?',
      [racer.getPenalty().getId(), racer.getId()]
    ]);
  }

  /**
   * Obtenir tous les pénalités pour un flight
   * @param flight Le flight passé par référence
   */
  public read(flight: {ref: Flight}) {
    var requestSQL: RequestSQL = {request: '', attribute : []};
    const flightID = +flight.ref.getId();
    if(flightID > 0){
      requestSQL.request = '\
      SELECT P.*, M.id as idMatch, R.color \
      FROM Penalty P, Racer R, Matchs M \
      WHERE R.penalty = P.id AND R.matchs = M.id AND M.flight = ' + flightID;
      this.readDB(requestSQL, flight, this.applyResult, this.divID);
    }
  }

  /**
   * Recuperation de la donnée dans la div et met à jour la liste des pénalités pour un flight
   * @param flight Le flight passé par référence
   * @param dataID Le nom du service
   */
  protected applyResult(flight: {ref: Flight}, divID: string){
    const data = JSON.parse(document.getElementById(divID).innerHTML);
    document.getElementById(divID).innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      const index = flight.ref.getMatchsList().findIndex(x => x.getId() == data[i].idMatch);
      switch (data[i].color) {
        case "b":
          flight.ref.getMatchsList()[index].getBlue().setPenalty(new Penalty(data[i].id, data[i].points, data[i].detail));
          break;
        case "y":
          flight.ref.getMatchsList()[index].getYellow().setPenalty(new Penalty(data[i].id, data[i].points, data[i].detail));
          break;
      }
    }
  }

  /**
   * Met à jour la pénalité
   * @param racer Le concurrent qui a pris la pénalité
   */
  public update(racer: Racer): void {
    this.delete(racer.getPenalty());
    this.create(racer);
  }

  /**
   * Supprime la pénalité
   * @param penalty La penalty qui doit être supprimé
   */
  public delete(penalty: Penalty): void {
    this.writeDB([
     'DELETE FROM Penalty WHERE id = ?',
     [penalty.getId()]
    ]);
  }

}
