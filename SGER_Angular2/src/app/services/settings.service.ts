/*
* \file settings.service.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-12 18:26:00 +0100 $

Projet : GEMARA - SGER
*/
/// <reference path="../class/requestSQL.ts" />
import { Injectable } from '@angular/core';
import { Settings } from '../class/data/settings';
import { DataBase } from '../class/database';

@Injectable()
/**
 * Cette classe s'occupe de la persistance de la configuration général de SGER
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-12 18:26:00 +0100
 */
export class SettingsService extends DataBase {

  /**
   * Constructeur qui passe la requête de la table SQL au constructeur de la classe DataBase et ajoute à la table les parametres par defaut si ils n'existent pas
   */
  constructor(){
    super('SettingsService','CREATE TABLE IF NOT EXISTS \
    Settings (id INTEGER, organization TEXT, phone TEXT, email TEXT, address TEXT, \
      addressSupplement TEXT, country TEXT, postalCode TEXT, location TEXT, \
      amountBoats INTEGER, timeManagement INTEGER, PRIMARY KEY (id))');
    this.divID = 'SettingsService';
    this.writeDB([
    "INSERT INTO Settings (id, organization, phone, email, address, addressSupplement, country, \
      postalCode, location, amountBoats, timeManagement) \
      SELECT 1,'SGER', '', '', '', '', '', '', '', 1, 0 \
      WHERE NOT EXISTS(SELECT 1 FROM Settings WHERE id = 1)",
    []]);
  }

  /**
   * Obtenir la configuration
   * @param settings La configuration
   */
  public read(settings: {ref: Settings}) {
    var requestSQL: RequestSQL = {request: '', attribute : []};
    requestSQL.request = 'SELECT * FROM Settings WHERE id = 1';
    this.readDB(requestSQL, settings, this.applyResult, this.divID);
  }

  /**
   * Recuperation de la donnée dans la div et met à jour la configuration
   * @param settings La configuration
   * @param dataID Le nom du service
   */
  private applyResult(settings: {ref: Settings}, dataID: string){
    const data = JSON.parse(document.getElementById(dataID).innerHTML)[0];
    document.getElementById(dataID).innerHTML = '';
    settings.ref = new Settings(data.organization, data.phone, data.email, data.address, data.addressSupplement, data.country, data.postalCode, data.location, data.amountBoats, data.timeManagement);
  }

  /**
   * Met à jour la configuration
   * @param settings La configuration qui doit être mise à jour
   */
  public update(settings: Settings): void {
     this.writeDB([
     'UPDATE Settings SET organization = ?, phone = ?, email = ?, address = ?, \
     addressSupplement = ?, country = ?, postalCode = ?, location = ?, amountBoats = ?, \
     timeManagement = ? WHERE id = 1',
     [settings.getOrganization(), settings.getPhone(), settings.getEmail(), settings.getAddress(), settings.getAddressSupplement(), settings.getCountry(), settings.getPostalCode(), settings.getLocation(), settings.getAmountBoats(), +settings.getTimeManagement()]
     ]);
  }
}
