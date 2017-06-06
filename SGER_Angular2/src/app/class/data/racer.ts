/*
* \file penalty.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-01 17:48:00 +0100 $

Projet : GEMARA - SGER
*/
import { Subscriber } from './subscriber';
import { Boat } from './boat';
import { Penalty } from './penalty';

/**
 * Représentation d'un coureur
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-01 17:48:00 +0100
 */
export class Racer extends Subscriber {
  private points: number;
  private boat: {ref: Boat};
  private penalty: Penalty;

  /**
   * Constructeur qui initialise les attributs du coureur
   * @param id L'identifiant de l'entité
   * @param points Les points du coureur
   * @param boat Le bateau du coureur
   * @param penalty La pénalité du coureur
   */
  constructor(id: number, name: string, country: string, isaf: string, ranking: number, letter: string,
              points: number, boat: {ref: Boat}, penalty: Penalty
  ) {
    super(id, name, country, isaf, ranking, letter); // Appel du constructeur Crew
    this.points = points;
    this.boat = boat;
    this.penalty = penalty;
  }

  /**
   * Assesseur de l'attribut points
   * @returns points Retourne les points du coureur
   */
  public getPoints(): number {
    return this.points;
  }

  /**
   * Mutateur de l'attribut points
   * @param points Les points du coureur
   */
  public setPoints(value: number): void {
    this.points = value;
  }

  /**
   * Assesseur de l'attribut boat
   * @returns boat Retourne le bateau du coureur
   */
  public getBoat(): Boat {
    return this.boat.ref;
  }

  /**
   * Mutateur de l'attribut boat
   * @param boat Le bateau du coureur
   */
  public setBoat(value: {ref: Boat}): void {
    this.boat = value;
  }

  /**
   * Assesseur de l'attribut penalty
   * @returns penalty Retourne la pénalité du coureur
   */
  public getPenalty(): Penalty {
    return this.penalty;
  }

  /**
   * Mutateur de l'attribut penalty
   * @param penalty La pénalité du coureur
   */
  public setPenalty(value: Penalty): void {
    this.penalty = value;
  }
}
