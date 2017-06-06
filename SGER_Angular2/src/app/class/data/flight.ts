/*
* \file flight.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-01 14:20:00 +0100 $

Projet : GEMARA - SGER
*/
import { Entity } from './entity';
import { Match } from './match';

/**
 * Représentation d'un fligth
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-01 14:20:00 +0100
 */
export class Flight extends Entity {
  private flightNumber: number;
  private matchsList: Match[];
  private startDateTime: string;
  private hiddenContent: boolean;
  private blueSubscriberId: number;
  private yellowSubscriberId: number;
  private blueBoatId: number;
  private yellowBoatId: number;

  /**
   * Constructeur qui initialise les attributs d'un flight
   * @param id L'identifiant de l'entité
   * @param flightNumber Le numero du flight
   * @param matchsList La liste des matchs dans le fligth
   * @param startDateTime Le debut de la course
   */
  constructor(id: number, flightNumber: number, matchsList: Match[], startDateTime: string) {
    super(id); // Appel du constructeur Entity
    this.flightNumber = flightNumber;
    this.matchsList = matchsList;
    this.startDateTime = startDateTime;
    this.blueSubscriberId = 0;
    this.blueBoatId = 0;
    this.yellowSubscriberId = 0;
    this.yellowBoatId = 0;
  }

  /**
   * Assesseur de l'attribut flightNumber
   * @returns flightNumber Retourne le numero du flight
   */
  public getFlightNumber(): number {
    return this.flightNumber;
  }

  /**
   * Mutateur de l'attribut flightNumber
   * @param flightNumber Le numero du flight
   */
  public setFlightNumber(flightNumber: number): void {
    this.flightNumber = flightNumber;
  }

  /**
   * Assesseur de l'attribut matchsList
   * @returns matchsList Retourne la liste des matches dans le fligth
   */
  public getMatchsList(): Match[] {
    return this.matchsList;
  }

  /**
   * Mutateur de l'attribut matchsList
   * @param matchsList La liste des matches dans le fligth
   */
  public setMatchsList(matchsList: Match[]): void {
    this.matchsList = matchsList;
  }

  /**
   * Assesseur de l'attribut matchesList
   * @returns matchesList Retourne le debut de la course
   */
  public getStartDateTime(): string {
    return this.startDateTime;
  }

  /**
   * Mutateur de l'attribut startDateTime
   * @param startDateTime Le debut de la course
   */
  public setStartDateTime(startDateTime: string): void {
    this.startDateTime = startDateTime;
  }

  /**
   * Assesseur de l'attribut hiddenContent
   * @returns hiddenContent Retourne l'état d'affichage du contenu
   */
  public getHiddenContent(): boolean {
    return this.hiddenContent;
  }

  /**
   * Mutateur de l'attribut hiddenContent
   * @param hiddenContent L'état d'affichage du contenu
   */
  public setHiddenContent(value: boolean): void {
    this.hiddenContent = value;
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
