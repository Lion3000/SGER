/*
* \file penalty.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-01 18:19:00 +0100 $

Projet : GEMARA - SGER
*/
import { Entity } from './entity';

/**
 * Représentation d'une pénalité
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-01 18:19:00 +0100
 */
export class Penalty extends Entity {
  private points: number;
  private detail: string;

  /**
   * Constructeur qui initialise les attributs de la pénalité
   * @param id L'identifiant de l'entité
   * @param points Les points de pénalité
   * @param detail Le détail de la pénalité
   */
  constructor(id: number, points: number, detail: string) {
    super(id); // Appel du constructeur Entity
    this.points = points;
    this.detail = detail;
  }

  /**
   * Assesseur de l'attribut points
   * @returns points Retourne les points de pénalité
   */
  public getPoints(): number {
    return this.points;
  }

  /**
   * Mutateur de l'attribut points
   * @param points Les points de pénalité
   */
  public setPoints(value: number): void {
    this.points = value;
  }

  /**
   * Assesseur de l'attribut detail
   * @returns detail Retourne le détail de la pénalité
   */
  public getDetail(): string {
    return this.detail;
  }

  /**
   * Mutateur de l'attribut detail
   * @param detail Le détail de la pénalité
   */
  public setDetail(value: string): void {
    this.detail = value;
  }

}
