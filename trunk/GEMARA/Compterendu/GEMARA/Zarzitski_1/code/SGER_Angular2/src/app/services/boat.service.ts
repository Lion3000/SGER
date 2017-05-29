/*
* \file boat.service.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-23 11:38:00 +0100 $

Projet : GEMARA - SGER
*/
import { Injectable } from '@angular/core';
import { Event } from '../class/data/event';
import { Boat } from '../class/data/boat';
import { Flight } from '../class/data/flight';
import { Racer } from '../class/data/racer';
import { CRUD } from '../class/crud';

@Injectable()

/**
 * Persistance de la classe Boat
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-23 11:38:00 +0100
 */
export class BoatService extends CRUD {

  /**
   * Constructeur qui passe la requête de la table SQL au constructeur de la classe DataBase
   */
  constructor(){
    super('BoatService','\
    CREATE TABLE IF NOT EXISTS \
    Boat ( id INTEGER PRIMARY KEY AUTOINCREMENT, boatNumber INTEGER)',
    'Boat');
    this.divID = 'BoatService';
  }

  /**
   * Créer un les bateaux
   * @param event L'épreuve qui contient les bateux
   */
  public create(event: Event): void {
     for (var i = 1; i <= event.getNumberBoats(); i++) {
       this.writeDB([
         'INSERT INTO Boat(boatNumber) \
         SELECT ? WHERE NOT EXISTS(SELECT * FROM Boat WHERE boatNumber = ?)',
         [i, i]
       ]);
     }
  }

  /**
   * Obtenir tous les bateaux
   * @param event L'épreuve selectioné par référence
   */
  public read(event: {ref: Event}) {
    var requestSQL: RequestSQL = {request: '', attribute : []};
    const phaseID = +event.ref.getPhasesList()[0].getId();
    if(phaseID > 0){
      requestSQL.request = '\
      SELECT B.id, B.boatNumber \
      FROM Boat B, Event E, Phase P \
      WHERE B.boatNumber <= E.numberBoats \
      AND E.id = P.event AND P.id = ' + phaseID + ' \
      ORDER BY boatNumber';
      this.readDB(requestSQL, event, this.applyResult, this.divID);
    }
  }

  /**
   * Associe les bateaux aux concurrents
   * @param flight Le flight selectioné par référence
   */
  public associationBoatsToRacer(flight: {ref: Flight}) {
    var requestSQL: RequestSQL = {request: '', attribute : []};
    const flightID = +flight.ref.getId();
    if(flightID > 0){
      requestSQL.request = '\
      SELECT B.id, M.id as matchsId, R.color, B.boatNumber \
      FROM Boat B, Racer R, Flight F, Matchs M \
      WHERE F.id = M.flight AND M.id = R.matchs \
      AND R.boat = B.id AND F.id = ' + flightID;
      this.readDB(requestSQL, flight, this.applyResultBoatsToRacer, this.divID);
    }
  }

  /**
   * Recuperation de la donnée dans la div et met à jour les bateaux dans l'épreuve
   * @param crews La liste des équipages
   * @param dataID Le nom du service
   */
  protected applyResult(event: {ref: Event}, divID: string){
   const data = JSON.parse(document.getElementById(divID).innerHTML);
   document.getElementById(divID).innerHTML = '';
   var boats = [];
   for (var i = 0; i < data.length; i++) {
     boats.push(new Boat(data[i].id, data[i].boatNumber));
   }
   event.ref.setBoatsList(boats.slice(0));
  }

  /**
   * Recuperation de la donnée dans la div et met à jour l'équipage
   * @param event L'épreuve selectioné par référence
   * @param dataID Le nom du service
   */
  private applyResultBoatsToRacer(flight: {ref: Flight}, divID: string){
    const data = JSON.parse(document.getElementById(divID).innerHTML);
    document.getElementById(divID).innerHTML = '';
    var boats = [];
    var matchs = flight.ref.getMatchsList().slice(0);
    for (var i = 0; i < data.length; i++) {
      const index = matchs.findIndex(x => x.getId() == data[i].matchsId);
      if(data[i].color == 'b'){
        matchs[index].getBlue().setBoat({ref: new Boat(data[i].id, data[i].boatNumber)});
      }
      else{
        matchs[index].getYellow().setBoat({ref: new Boat(data[i].id, data[i].boatNumber)});
      }
    }
    flight.ref.setMatchsList(matchs.slice(0));
  }

  /**
   * Met à jour la liste des bateaux
   * @param event L'épreuve selectioné
   */
  public update(event: Event): void {
     this.create(event);
  }

  /**
   * Supprime le beateau
   * @param boat Le beateau qui doit être supprimé
   */
  public delete(boat: Boat): void {
     this.writeDB([
     'DELETE FROM Boat WHERE id = ?',
     [boat.getId()]
     ]);
  }

}
