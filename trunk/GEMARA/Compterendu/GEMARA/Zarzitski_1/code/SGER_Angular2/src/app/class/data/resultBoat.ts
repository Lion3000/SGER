/*
* \file results.ts
* $Author: Sixou$
* $Rev: 1 $
* $Date: 2017-04-20 17:15:00 +0100 $

Projet : GEMARA - SGER
*/

import { Boat } from './boat';

/**
 * Représentation des resultats
 * Author: Sixou
 * Version: 1
 * Date: 2017-04-20 18:19:00 +0100
 */
 export class ResultBoat {
   private winTotBoat: number;
   private winPercentBoat: number;
   private idBoat: Boat;


 /**
  * Constructeur qui initialise les attributs du coureur
  * @param points Les points du coureur
  * @param boat Le bateau du coureur
  * @param penalty La pénalité du coureur
  */
  constructor( winTotBoat: number,  winPercentBoat: number, idBoat: Boat) {
    this.winTotBoat = winTotBoat;
    this.winPercentBoat = winPercentBoat;
    this.idBoat = idBoat;
  }

  /**
   * Assesseur de l'attribut organization
   * @returns organization Retourne le nom de l'organisation
   */
  public getWinTotBoat(): number {
    return this.winTotBoat;
  }

  /**
   * Mutateur de l'attribut organization
   * @param organization Le nom de l'organisation
   */
  public setWinTotBoat(value: number): void {
    this.winTotBoat = value;
  }

  /**
   * Assesseur de l'attribut organization
   * @returns organization Retourne le nom de l'organisation
   */
  public getWinPercentBoat(): number {
    return this.winPercentBoat;
  }

  /**
   * Mutateur de l'attribut organization
   * @param organization Le nom de l'organisation
   */
  public setWinPercentBoat(value: number): void {
    this.winPercentBoat = value;
  }

  /**
   * Assesseur de l'attribut organization
   * @returns organization Retourne le nom de l'organisation
   */
  public getIdBoat(): Boat {
    return this.idBoat;
  }

  /**
   * Mutateur de l'attribut organization
   * @param organization Le nom de l'organisation
   */
  public setIdBoat(value: Boat): void {
    this.idBoat = value;
  }
}
