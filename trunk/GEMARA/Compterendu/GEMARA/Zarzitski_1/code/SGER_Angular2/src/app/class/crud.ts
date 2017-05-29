/*
* \file crud.ts
* $Author: Zarzitski$
* $Rev: 2 $
* $Date: 2017-04-05 19:47:00 +0100 $

Projet : GEMARA - SGER
*/
import { DataBase } from './database';

/**
 * Create / Read / Update / Delete
 * Author: Zarzitski
 * Version: 2
 * Date: 2017-04-05 19:47:00 +0100
 */
export abstract class CRUD extends DataBase {
  private currentID: {ref: number};

  /**
   * Créer une entité
   * @param dataID Le de la div de stockage
   * @param table Requête SQL qui permet de créer la table
   * @param tableName Le nom de la table SQl
   */
  constructor(divID: string, table: string, tableName: string){
    super(divID,table);
    this.currentID = {ref: 0};
    var requestSQL: RequestSQL = {request: '', attribute : []};
    requestSQL.request = 'SELECT MAX(id) as currentID FROM '+tableName;
    if(!document.getElementById(tableName+'CurrentID'))
      document.getElementById("data").innerHTML += '<div id="'+tableName+'CurrentID'+'" style="background-color: orange; margin: 10px;"></div>';
    this.readDB(requestSQL, this.currentID, this.updateCurrentID, tableName+'CurrentID');
  }

  /**
   * Créer une entité
   * @param entity L'entité qui doit être créé
   */
  public abstract create(entity: any): void;

  /**
   * Obtenir tous les entités
   * @param entitys La liste des entités
   */
  public abstract read(entitys: any): void;

  /**
   * Recuperation de la donnée dans la div et met à jour l'entité
   * @param entity Une Entité
   * @param dataID Le de la div de stockage
   */
  protected abstract applyResult(entity: {ref: any}, dataID: string): void;

  /**
   * Mets à jour l'entité
   * @param entity L'entité qui doit être mise à jour
   */
  public abstract update(entity: any): void;

  /**
   * Supprime l'entité
   * @param entity L'entité qui doit être supprimé
   */
  public abstract delete(entity: any): void;

  /**
   * Donne un nouveau identifiant
   * @returns Retourne le nouveau idantifiant
   */
  public getNewID(): number{
    this.currentID.ref = this.currentID.ref + 1;
    return this.currentID.ref;
  }

  /**
   * Recuperation de la donnée dans la div et met à jour currentID
   * @param currentID L'identifiant courant
   * @param divID Le nom de la div de stockage
   */
  private updateCurrentID(currentID: {ref: number}, divID: string) : void{
    currentID.ref = JSON.parse(document.getElementById(divID).innerHTML)[0].currentID;
    document.getElementById(divID).innerHTML = '';
  }
}
