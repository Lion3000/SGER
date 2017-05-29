/*
* \file boat.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-01 11:50:00 +0100 $

Projet : GEMARA - SGER
*/
import { Entity } from './entity';

/**
 * Représentation d'un bateau
 * Author: Zarzitski
 * Version 1
 * Date: 2017-04-01 11:50:00 +0100
 */
export class Boat extends Entity {
  boatNumber: number;

  /**
   * Constructeur qui initialise les attributs du bateau
   * @param id L'identifiant de l'entité
   * @param boatNumber Le numero du bateau
   */
  constructor(id: number, boatNumber: number ) {
    super(id);
    this.boatNumber = boatNumber;
  }

  /**
   * Assesseur de l'attribut name
   * @returns boatNumber Retourne le numero du bateau
   */
  public getBoatNumber(): number {
    return this.boatNumber;
  }

  /**
   * Mutateur de l'attribut boatNumber
   * @param boatNumber Le numero du bateau
   */
  public setBoatNumber(value: number): void {
    this.boatNumber = value;
  }
}
