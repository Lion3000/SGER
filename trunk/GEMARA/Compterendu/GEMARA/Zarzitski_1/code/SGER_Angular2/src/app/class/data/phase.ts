/*
* \file phase.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-01 13:35:00 +0100 $

Projet : GEMARA - SGER
*/
import { Entity } from './entity';
import { Flight } from './flight';

/**
 * Représentation d'une phase
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-01 13:35:00 +0100
 */
export class Phase extends Entity {
  private name: string;
  private roundRobin: boolean;
  private flightsList: Flight[];

  /**
   * Constructeur qui initialise les attributs d'une phase
   * @param id L'identifiant de l'entité
   * @param name Le nom de la phase
   * @param roundRobin Indication si c'est un RoundRobin
   * @param flightsList La liste des flights dans la phase
   */
  constructor(id: number, name: string, roundRobin: boolean, flightsList: Flight[]) {
    super(id); // Appel du constructeur Entity
    this.name = name;
    this.roundRobin = roundRobin;
    this.flightsList = flightsList;
  }

  /**
   * Assesseur de l'attribut name
   * @returns name Retourne le nom de la phase
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Mutateur de l'attribut name
   * @param name Le nom de la phase
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * Assesseur de l'attribut roundRobin
   * @returns roundRobin Retourne le nom de la phase
   */
  public getRoundRobin(): boolean {
    return this.roundRobin;
  }

  /**
   * Mutateur de l'attribut roundRobin
   * @param roundRobin Indication si c'est un RoundRobin
   */
  public setRoundRobin(roundRobin: boolean): void {
    this.roundRobin = roundRobin;
  }

  /**
   * Assesseur de l'attribut flightsList
   * @returns flightsList Retourne la liste des flights dans la phase
   */
  public getFlightsList(): Flight[] {
    return this.flightsList;
  }

  /**
   * Mutateur de l'attribut flightsList
   * @param flightsList La liste des flights dans la phase
   */
  public setFlightsList(flightsList: Flight[]): void {
    this.flightsList = flightsList;
  }

}
