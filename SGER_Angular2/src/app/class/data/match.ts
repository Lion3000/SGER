/*
* \file match.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-01 17:15:00 +0100 $

Projet : GEMARA - SGER
*/
import { Entity } from './entity';
import { Racer } from './racer';

/**
 * Représentation d'un match
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-01 17:15:00 +0100
 */
export class Match extends Entity {
  private blue: Racer;
  private yellow: Racer;
  private locked: boolean;
  private finishDateTime: string;
  private blueSubscriberId: number;
  private yellowSubscriberId: number;
  private blueBoatId: number;
  private yellowBoatId: number;

  /**
   * Constructeur qui initialise les attributs de l'équipage
   * @param id L'identifiant de l'entité
   * @param blue Le coureur bleu du match
   * @param yellow Le coureur jaune du match
   * @param locked Le verrou de l'édition
   * @param finishDateTime L'heure et date de fin de la course
   */
  constructor(id: number, blue: Racer, yellow: Racer, locked: boolean, finishDateTime: string) {
    super(id); // Appel du constructeur Entity
    this.blue = blue;
    this.yellow = yellow;
    this.locked = locked;
    this.finishDateTime = finishDateTime;
    this.blueSubscriberId = 0;
    this.blueBoatId = 0;
    this.yellowSubscriberId = 0;
    this.yellowBoatId = 0;
  }

  /**
   * Assesseur de l'attribut blue
   * @returns blue Retourne le coureur bleu du match
   */
  public getBlue(): Racer {
    return this.blue;
  }

  /**
   * Mutateur de l'attribut blue
   * @param blue Le coureur bleu du match
   */
  public setBlue(value: Racer): void {
    this.blue = value;
  }

  /**
   * Assesseur de l'attribut yellow
   * @returns yellow Retourne le coureur jaune du match
   */
  public getYellow(): Racer {
    return this.yellow;
  }

  /**
   * Mutateur de l'attribut yellow
   * @param yellow Le coureur jaune du match
   */
  public setYellow(value: Racer): void {
    this.yellow = value;
  }

  /**
   * Assesseur de l'attribut locked
   * @returns locked Retourne le verrou de l'édition
   */
  public getLocked(): boolean {
    return this.locked;
  }

  /**
   * Mutateur de l'attribut locked
   * @param locked Le verrou de l'édition
   */
  public setLocked(value: boolean): void {
    this.locked = value;
  }

  /**
   * Assesseur de l'attribut finishDateTime
   * @returns finishDateTime Retourne l'heure et date de fin de la course
   */
  public getFinishDateTime(): string {
    return this.finishDateTime;
  }

  /**
   * Mutateur de l'attribut finishDateTime
   * @param finishDateTime L'heure et date de fin de la course
   */
  public setFinishDateTime(value: string): void {
    this.finishDateTime = value;
  }

  /**
   * Assesseur de l'attribut blueSubscriberId
   * @returns blueSubscriberId Retourne l'identifiant du participant bleu sélectionné
   */
  public getBlueSubscriberId(): number {
    return this.blueSubscriberId;
  }

  /**
   * Mutateur de l'attribut blueSubscriberId
   * @param blueSubscriberId L'identifiant du participant bleu sélectionné
   */
  public setBlueSubscriberId(blueSubscriberId: number): void {
    this.blueSubscriberId = blueSubscriberId;
  }

  /**
   * Assesseur de l'attribut blueBoatId
   * @returns blueBoatId Retourne l'identifiant du bateau bleu sélectionné
   */
  public getBlueBoatId(): number {
    return this.blueBoatId;
  }

  /**
   * Mutateur de l'attribut blueBoatId
   * @param blueBoatId L'identifiant du bateau bleu sélectionné
   */
  public setBlueBoatId(blueBoatId: number): void {
    this.blueBoatId = blueBoatId;
  }

  /**
   * Assesseur de l'attribut yellowSubscriberId
   * @returns yellowSubscriberId Retourne l'identifiant du participant jaune sélectionné
   */
  public getYellowSubscriberId(): number {
    return this.yellowSubscriberId;
  }

  /**
   * Mutateur de l'attribut yellowSubscriberId
   * @param yellowSubscriberId L'identifiant du participant jaune sélectionné
   */
  public setYellowSubscriberId(yellowSubscriberId: number): void {
    this.yellowSubscriberId = yellowSubscriberId;
  }

  /**
   * Assesseur de l'attribut yellowBoatId
   * @returns yellowBoatId Retourne l'identifiant du bateau jaune sélectionné
   */
  public getYellowBoatId(): number {
    return this.yellowBoatId;
  }

  /**
   * Mutateur de l'attribut yellowBoatId
   * @param yellowBoatId L'identifiant du bateau jaune sélectionné
   */
  public setYellowBoatId(yellowBoatId: number): void {
    this.yellowBoatId = yellowBoatId;
  }
}
