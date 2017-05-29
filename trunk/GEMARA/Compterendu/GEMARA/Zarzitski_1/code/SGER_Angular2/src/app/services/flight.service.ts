/*
* \file flight.service.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-17 14:24:00 +0100 $

Projet : GEMARA - SGER
*/
import { Injectable } from '@angular/core';
import { Phase } from '../class/data/phase';
import { Flight } from '../class/data/flight';
import { CRUD } from '../class/crud';

@Injectable()

/**
 * Persistance de la classe Flight
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-17 14:24:00 +0100
 */
export class FlightService extends CRUD {
  private currentFlightNumber: {ref: number};

  /**
   * Constructeur qui passe la requête de la table SQL au constructeur de la classe DataBase
   */
  constructor(){
    super('FlightService','\
    CREATE TABLE IF NOT EXISTS \
    Flight ( id INTEGER PRIMARY KEY AUTOINCREMENT, phase INTEGER, flightNumber INTEGER, startDateTime TEXT, FOREIGN KEY(phase) REFERENCES Phase(id) )',
    'Flight');
    this.divID = 'FlightService';
  }

  /**
   * Recupere le numero courant du fligth
   * @param phase La phase qui contient les flights
   */
  public readCurrentFlightNumber(phase: Phase){
    this.currentFlightNumber = {ref: 0};
    var requestSQL: RequestSQL = {request: '', attribute : []};
    const phaseID = +phase.getId();
    if(phaseID > 0){
      requestSQL.request = '\
      SELECT MAX(flightNumber) as currentFlightNumber \
      FROM Flight F, Phase P, Event E \
      WHERE F.phase = P.id  AND E.id = P.event AND \
      E.id = (SELECT event FROM Phase WHERE id = ' + phaseID + ')';
      if(!document.getElementById('CurrentFlightNumber'))
        document.getElementById("data").innerHTML += '<div id="CurrentFlightNumber" style="background-color: orange; margin: 10px;"></div>';
      this.readDB(requestSQL, this.currentFlightNumber, this.updateCurrentFlightNumber, 'CurrentFlightNumber');
    }
  }

  /**
   * Recupere le numero courant du fligth dans la div
   * @param currentFlightNumber Le numero courant passé par référence
   * @param dataID Le nom du service
   */
  private updateCurrentFlightNumber(currentFlightNumber: {ref: number}, divID: string){
    currentFlightNumber.ref = JSON.parse(document.getElementById(divID).innerHTML)[0].currentFlightNumber;
    document.getElementById(divID).innerHTML = '';
  }

  /**
   * Créer un fligth
   * @param fligth Le fligth qui doit être créé
   */
  public create(flight: Flight): void {
     this.writeDB([
       'INSERT INTO Flight(id, flightNumber, startDateTime) VALUES (?, ?, ?)',
       [flight.getId(), flight.getFlightNumber(), flight.getStartDateTime()]
     ]);
  }

  /**
   * Affect un flight à une phase
   * @param flight Le flight qui doit être affect
   * @param phase La phase qui doit recevoir l'affectation
   */
  public setPhaseID(flight: Flight, phase: Phase): void {
     this.writeDB([
       'UPDATE Flight SET phase = ?, flightNumber = ? WHERE id = ?',
       [phase.getId(), flight.getFlightNumber(), flight.getId()]
     ]);
  }

  /**
   * Obtenir tous les flights pour une phase
   * @param phase La phase passée par référence
   */
  public read(phase: {ref: Phase}) {
    var requestSQL: RequestSQL = {request: '', attribute : []};
    const phaseID = +phase.ref.getId();
    if(phaseID > 0){
      requestSQL.request = 'SELECT * FROM Flight WHERE phase = ' + phaseID + ' ORDER BY id';
      this.readDB(requestSQL, phase, this.applyResult, this.divID);
    }
  }

  /**
   * Recuperation de la donnée dans la div et met à jour la liste des fligths
   * @param phase La phase passée par référence
   * @param dataID Le nom du service
   */
  protected applyResult(phase: {ref: Phase}, divID: string){
    const data = JSON.parse(document.getElementById(divID).innerHTML);
    document.getElementById(divID).innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      var fligths = phase.ref.getFlightsList().slice(0);
      fligths.push( new Flight(data[i].id, data[i].flightNumber, [], data[i].startDateTime));
      phase.ref.setFlightsList(fligths.slice(0));
    }
  }

  /**
   * Met à jour le flight
   * @param flight Le flight qui doit être mise à jour
   */
  public update(flight: Flight): void {
    this.writeDB([
      'UPDATE Flight SET flightNumber = ?, startDateTime = ? WHERE id = ?',
      [flight.getFlightNumber(), flight.getStartDateTime(), flight.getId()]
    ]);
  }

  /**
   * Supprime le flight avec tout son contenu
   * @param flight Le flight qui doit être supprimé
   */
  public delete(flight: Flight): void {
    const flightID = +flight.getId();
    if(flightID > 0){
     this.writeDB(['DELETE FROM Penalty \
     WHERE id IN (\
       SELECT R.penalty FROM Racer R, Matchs M \
       WHERE R.matchs = M.id AND M.flight = ' + flightID + ')',
     []]);
     this.writeDB(['DELETE FROM Racer \
     WHERE matchs IN (SELECT id FROM Matchs WHERE flight = ' + flightID + ')',[]]);
     this.writeDB(['DELETE FROM Matchs \
     WHERE flight = ?',[flightID]]);
     this.writeDB(['DELETE FROM Flight \
     WHERE id = ?',[flightID]]);
   }
  }

  /**
   * Récupérer un nouveau numéro de flight
   * @returns Le nouveau numéro de flight
   */
  public getNewFlightNumber(): number{
    this.currentFlightNumber.ref = this.currentFlightNumber.ref + 1;
    return this.currentFlightNumber.ref;
  }

  /**
   * Récupérer le dernier numéro de flight créé
   * @returns Le numéro de flight
   */
  public getLastFlightNumber(): number{
    return this.currentFlightNumber.ref;
  }
}
