/**
* \file crew.service.ts
* $Author: Sixou$
* $Rev: 2 $
* $Date: 2017-04-22 00:34:00 +0100 $

\brief Projet : GEMARA - SGER
*******************************************************/
/// <reference path="../class/requestSQL.ts" />
import { Injectable } from '@angular/core';
import { DataBase } from '../class/database';
import { ResultBoat } from '../class/data/resultBoat';
import { Phase } from '../class/data/phase';


@Injectable()

/**
 * \class ResultBoatService
 * \brief Cette classe s'occupe de la persistance des équipages
 * \author Sixou
 * \version 2
 * \date 2017-04-11 23:41:00 +0100
 */
export class ResultBoatService extends DataBase {

  /**
   * \fn     constructor();
   * \brief Constructeur qui passe la requête de la table SQL au constructeur de la classe DataBase et ajoute à la table les parametres par defaut si ils n'existent pas
   */
  constructor(){
    super('ResultBoatService','CREATE TABLE IF NOT EXISTS Crew (id INTEGER, name TEXT, country TEXT, isaf TEXT, ranking INTEGER, PRIMARY KEY (id))');
    this.writeDB(['CREATE TABLE IF NOT EXISTS Event ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, organization TEXT, location TEXT, ranking INTEGER, numberBoats INTEGER, date TEXT, timeManagement INTEGER)',[]]);
    this.writeDB(['CREATE TABLE IF NOT EXISTS Boat ( id INTEGER PRIMARY KEY AUTOINCREMENT, boatNumber INTEGER)',[]]);
    this.writeDB(['CREATE TABLE IF NOT EXISTS Flight ( id INTEGER PRIMARY KEY AUTOINCREMENT, phase INTEGER, flightNumber INTEGER, startDateTime TEXT, FOREIGN KEY(phase) REFERENCES Phase(id) )',[]]);
    this.writeDB(['CREATE TABLE IF NOT EXISTS Matchs ( id INTEGER PRIMARY KEY AUTOINCREMENT, flight INTEGER, locked INTEGER, finishDateTime INTEGER, FOREIGN KEY(flight) REFERENCES Flight(id) )',[]]);
    this.writeDB(['CREATE TABLE IF NOT EXISTS Phase ( id INTEGER PRIMARY KEY AUTOINCREMENT, event INTEGER, name TEXT, roundRobin INTEGER, FOREIGN KEY(event) REFERENCES Event(id))',[]]);
    this.writeDB(['CREATE TABLE IF NOT EXISTS Penalty ( id INTEGER PRIMARY KEY AUTOINCREMENT, points REAL,  detail TEXT )',[]]);
    this.writeDB(['CREATE TABLE IF NOT EXISTS Racer ( id INTEGER PRIMARY KEY AUTOINCREMENT, matchs INTEGER, color TEXT, points REAL, boat INTEGER, penalty INTEGER, letter TEXT, name TEXT, country TEXT, isaf TEXT, ranking TEXT, FOREIGN KEY(matchs) REFERENCES Matchs(id), FOREIGN KEY(penalty) REFERENCES Penalty(id), FOREIGN KEY(boat) REFERENCES Boat(id))',[]]);
    this.writeDB(['CREATE TABLE IF NOT EXISTS Subscriber ( id INTEGER PRIMARY KEY AUTOINCREMENT, letter TEXT, event INTEGER, name TEXT, country TEXT, isaf TEXT, ranking TEXT, FOREIGN KEY(event) REFERENCES Event(id) )',[]]);
    this.writeDB(['CREATE TABLE IF NOT EXISTS Boat ( id INTEGER PRIMARY KEY AUTOINCREMENT, boatNumber INTEGER)',[]]);

    this.writeDB(['\
    CREATE VIEW IF NOT EXISTS Results as \
    SELECT P.id idPhase, M.id idMatchs, B.boatNumber boat, R.points, (	SELECT points FROM Penalty WHERE id = R.penalty) penalty, S.letter, S.name \
    FROM Event E, Phase P, Flight F, Subscriber S, Racer R, Matchs M, Boat B\
    WHERE P.event = E.id AND \
    F.phase = P.id AND \
    M.flight = F.id AND \
    R.matchs = M.id AND \
    R.boat = B.id AND \
    S.event = E.id AND \
    S.letter = R.letter \
    ',[]]);
    this.divID = 'ResultBoatService';
  }

  /**
   * \fn    read();
   * \brief Obtenir la configuration
   * \param settings La configuration
   */
  public read(resultBoat: {ref: ResultBoat[]}, phase: Phase) {
    var requestSQL: RequestSQL = {request: '', attribute : []};
    requestSQL.request = '\
    SELECT boat, sum(points) tots, sum(points)*100/count(Boat) percentWin \
    FROM Results \
    WHERE idPhase = ' + phase.getId() + ' \
    GROUP BY boat ORDER BY boat DESC';
    this.readDB(requestSQL, resultBoat, this.applyResult, this.divID);
  }


  /**
   * \fn    applyResult();
   * \brief Recuperation de la donnée dans la div et met à jour la configuration
   * \param settings La configuration
   * \param dataID Le nom du service
   */
  protected applyResult(resultBoatList: {ref: ResultBoat[]}, dataID){
    const data = JSON.parse(document.getElementById(dataID).innerHTML);
    document.getElementById(dataID).innerHTML = '';
    for(var i = 0; i < data.length; i++){
      resultBoatList.ref[i] = new ResultBoat( data[i].tots, data[i].percentWin.toFixed(1), data[i].boat);
    }
  }
}
