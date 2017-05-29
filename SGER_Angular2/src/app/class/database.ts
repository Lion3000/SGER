/*
* \file database.ts
* $Author: Zarzitski$
* $Rev: 2 $
* $Date: 2017-04-05 19:47:00 +0100 $

Projet : GEMARA - SGER
*/
/// <reference path="./requestSQL.ts" />
declare var SQLite;
declare const TIME_TO_WAIT;

/**
 * Base de données SQLite
 * Author: Zarzitski
 * Version: 2
 * Date: 2017-04-11 21:54:00 +0100
 */
export class DataBase {
  private table: string
  private dataID: string
  protected divID: string;

  /**
   * Constructeur qui initialise les attributs, crée la table SQL s'il n'existe pas et crée la div de stockage des chênes JSON
   * @param dataID Le nom du service
   * @param table La requéte qui crée la table SQL s'il n'existe pas
   */
  constructor(dataID: string, table: string){
    this.table = table;
    this.dataID = dataID;
    this.writeDB([ this.table, [] ]);
    if(!document.getElementById(this.dataID))
      document.getElementById("data").innerHTML += '<div id="'+this.dataID+'" style="background-color: orange; margin: 10px;"></div>';
  }

  /**
   * Stock dans une div les données extréte de la base de donnée selon la requête
   * @param request La requête à exécuter
   * @param entitys La liste des entités à modifier
   * @param applyResult La fonction qui doit être lancée à la fin du chargement
   * @param dataID Le nom du service
   */
  public readDB(request: RequestSQL, entitys: {ref: any}, applyResult, divID: string): void {
    SQLite.read(request, divID);
    this.waitResult(this.waitResult, divID, entitys, applyResult);
  }

  /**
   * Créer la table SQL si elle nexiste pas et exécute la requête
   * @param request La requête à exécuter
   */
  public writeDB(request: any): void {
    SQLite.write(this.table, request);
  }

  /**
   * La fonction qui s'appelle de façon récurrente jusqu'à la détection des données dans la div, puis elle exécute la fonction passée dans les paramètres
   * @param waitResult La fonction elle-même
   * @param dataID Le nom du service
   * @param entitys La liste des entités à modifier
   * @param applyResult La fonction qui doit être lancée à la fin du chargement
   */
  private waitResult(waitResult, divID: string, entitys: any, applyResult){
    if(document.getElementById(divID).innerHTML == ''){
      setTimeout(waitResult.bind(null, waitResult, divID, entitys, applyResult), TIME_TO_WAIT);
    }
    else{
      applyResult(entitys, divID);
    }
  }

}
