/*
* \file results.ts
* $Author: Sixou$
* $Rev: 1 $
* $Date: 2017-04-20 17:15:00 +0100 $

Projet : GEMARA - SGER
*/

import { Subscriber } from './subscriber';

/**
 * Représentation des resultats
 * Author: Sixou
 * Version: 1
 * Date: 2017-04-20 18:19:00 +0100
 */
 export class ResultSubscriber {
   private winTotSub: number;
   private winPercentSub: number;
   private idSub: string;


 /**
  * Constructeur qui initialise les attributs du coureur
  * @param id L'identifiant de l'entité
  * @param points Les points du coureur
  * @param boat Le bateau du coureur
  * @param penalty La pénalité du coureur
  */
  constructor(winTotSub: number, winPercentSub: number, idSub: string) {
    this.winTotSub = winTotSub;
    this.winPercentSub = winPercentSub;
    this.idSub = idSub;
  }

  /**
   * Assesseur de l'attribut organization
   * @returns organization Retourne le nom de l'organisation
   */
  public getWinTotSub(): number {
    return this.winTotSub;
  }

  /**
   * Mutateur de l'attribut organization
   * @param organization Le nom de l'organisation
   */
  public setWinTotSub(value: number): void {
    this.winTotSub = value;
  }

  /**
   * Assesseur de l'attribut organization
   * @returns organization Retourne le nom de l'organisation
   */
  public getWinPercentSub(): number {
    return this.winPercentSub;
  }

  /**
   * Mutateur de l'attribut organization
   * @param organization Le nom de l'organisation
   */
  public setWinPercentSub(value: number): void {
    this.winPercentSub = value;
  }

  /**
   * Assesseur de l'attribut organization
   * @returns organization Retourne le nom de l'organisation
   */
  public getIdSub(): string {
    return this.idSub;
  }

  /**
   * Mutateur de l'attribut organization
   * @param organization Le nom de l'organisation
   */
  public setIdSub(value: string): void {
    this.idSub = value;
  }
}
