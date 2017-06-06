/*
* \file crew.ts
* $Author: Zarzitski$
* $Rev: 2 $
* $Date: 2017-04-01 10:31:00 +0100 $

Projet : GEMARA - SGER
*/
import { Entity } from './entity';

/**
 * Représentation d'un équipage
 * Author: Zarzitski
 * Version: $Rev 2$
 * Date: 2017-04-01 10:31:00 +0100
 */
export class Crew extends Entity {
  private name: string;
  private country: string;
  private isaf: string;
  private ranking: number;

  /**
   * Constructeur qui initialise les attributs de l'équipage
   * @param id L'identifiant de l'entité
   * @param name Le nom de l'équipage
   * @param country Le pays de l'équipage
   * @param isaf Le code ISAF de l'équipage
   * @param ranking Le classement de l'équipage
   */
  constructor(id: number, name: string, country: string, isaf: string, ranking: number) {
    super(id); // Appel du constructeur Entity
    this.name = name;
    this.country = country;
    this.isaf = isaf;
    this.ranking = ranking;
  }

  /**
   * Assesseur de l'attribut name
   * @returns name Retourne le nom de l'équipage
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Mutateur de l'attribut name
   * @param name Le nom de l'équipage
   */
  public setName(value: string): void {
    this.name = value;
  }

  /**
   * Assesseur de l'attribut country
   * @returns country Retourne le pays de l'équipage
   */
  public getCountry(): string {
    return this.country;
  }

   /**
   * Mutateur de l'attribut country
   * @param country Le pays de l'équipage
   */
  public setCountry(value: string): void {
    this.country = value;
  }

  /**
   * Assesseur de l'attribut isaf
   * @returns isaf Retourne le code ISAF de l'équipage
   */
  public getIsaf(): string {
    return this.isaf;
  }

   /**
   * Mutateur de l'attribut isaf
   * @param isaf Le code ISAF de l'équipage
   */
  public setIsaf(value: string): void {
    this.isaf = value;
  }

  /**
   * Assesseur de l'attribut ranking
   * @returns ranking Retourne le classement de l'équipage
   */
  public getRanking(): number {
    return this.ranking;
  }

  /**
   * Mutateur de l'attribut ranking
   * @param ranking Le classement de l'équipage
   */
  public setRanking(value): void {
    this.ranking = value;
  }

}
