/*
* \file crew.service.ts
* $Author: Zarzitski$
* $Rev: 2 $
* $Date: 2017-04-02 00:34:00 +0100 $

Projet : GEMARA - SGER
*/
/// <reference path="../class/requestSQL.ts" />
import { Injectable } from '@angular/core';
import { Crew } from '../class/data/crew';
import { DataBase } from '../class/database';
import { CRUD } from '../class/crud';

@Injectable()

/**
 * Cette classe s'occupe de la persistance des équipages
 * Author: Zarzitski
 * Version: 2
 * Date: 2017-04-11 23:41:00 +0100
 */
export class CrewService extends CRUD {

  /**
   * Constructeur qui passe la requête de la table SQL au constructeur de la classe DataBase
   */
  constructor(){
    super('CrewService','\
    CREATE TABLE IF NOT EXISTS \
    Crew (id INTEGER, name TEXT, country TEXT, isaf TEXT, ranking INTEGER, PRIMARY KEY (id))',
    'Crew');
    this.divID = 'CrewService';
  }

  /**
   * Créer un équipage
   * @param crew L'équipage qui doit être créé
   */
  public create(crew: Crew): void {
     this.writeDB([
     'INSERT INTO \
     Crew(id, name, country, isaf, ranking) \
     VALUES (?, ?, ?, ?, ?)',
     [crew.getId(), crew.getName(), crew.getCountry(), crew.getIsaf(), crew.getRanking()]
     ]);
  }

  /**
   * Obtenir tous les équipages
   * @param crews La liste des équipages
   */
  public read(crews: {ref: Crew[]}) {
    var requestSQL: RequestSQL = {request: '', attribute : []};
    requestSQL.request = 'SELECT * FROM Crew ORDER BY name';
    this.readDB(requestSQL, crews, this.applyResult, this.divID);
  }

  /**
   * Recuperation de la donnée dans la div et met à jour l'équipage
   * @param crews La liste des équipages
   * @param dataID Le nom du service
   */
  protected applyResult(crews: {ref: Crew[]}, dataID: string){
    const data = JSON.parse(document.getElementById(dataID).innerHTML);
    document.getElementById(dataID).innerHTML = '';
    crews.ref = [];
    for (var i = 0; i < data.length; i++) {
      crews.ref.push(
        new Crew(data[i].id, data[i].name, data[i].country, data[i].isaf, data[i].ranking)
      );
    }
  }

  /**
   * Met à jour l'équipage
   * @param crew L'équipage qui doit être mise à jour
   */
  public update(crew: Crew): void {
     this.writeDB([
     'UPDATE Crew SET name = ?, country = ?, isaf = ?, ranking = ? WHERE id = ?',
     [crew.getName(), crew.getCountry(), crew.getIsaf(), crew.getRanking(), crew.getId()]
     ]);
  }

  /**
   * Supprime l'équipage
   * @param crew L'équipage qui doit être supprimé
   */
  public delete(crew: Crew): void {
     this.writeDB([
     'DELETE FROM Crew WHERE id = ?',
     [crew.getId()]
     ]);
  }

}
