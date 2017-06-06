/*
* \file entity.ts
* $Author: Zarzitski$
* $Rev: 2 $
* $Date: 2017-04-01 10:17:00 +0100 $

Projet : GEMARA - SGER
*/

/**
 * Représentation général de l'entité
 * Version: $Rev 2$
 * Date: 2017-04-01 10:17:00 +0100
 */
export abstract class Entity {
  protected id: number;

  /**
   * Constructeur qui initialise l'attribut de l'entité
   * @param id L'identifiant de l'entité
   */
  constructor(id: number) {
    this.id = id;
  }

  /**
   * Assesseur de l'attribut id
   * @returns id Retourne l'identifiant de l'entité
   */
  public getId(): number {
    return this.id;
  }

  /**
   * Mutateur de l'attribut id
   * @param id L'identifiant de l'entité
   */
  public setId(id: number): void {
    this.id = id;
  }
}
