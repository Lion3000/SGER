/*
* \file event.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-01 11:20:00 +0100 $

Projet : GEMARA - SGER
*/
import { Entity } from './entity';
import { Crew } from './crew';
import { Subscriber } from './subscriber';
import { Boat } from './boat';
import { Phase } from './phase';

/**
 * Représentation d'une épreuve
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-01 11:20:00 +0100
 */
export class Event extends Entity {
  private name: string;
  private organization: string;
  private location: string;
  private ranking: number;
  private numberBoats: number;
  private date: string;

  private subscribers: Subscriber[];
  private phasesList: Phase[];
  private boatsList: Boat[];
  private timeManagement: boolean;
  private hiddenContent: boolean;

  /**
   * Constructeur qui initialise les attributs de l'épreuve
   * @param id L'identifiant de l'entité
   * @param name Le nom de l'épreuve
   * @param organization Le nom de l'organisation qui réalise l'épreuve
   * @param location Lieu de déroulement de l'épreuve
   * @param ranking Le grade de l'épreuve
   * @param numberBoats Le nombre de bateaux dans l'épreuve
   * @param date La date de déroulement du l'épreuve
   * @param subscribers La liste des participants de l'épreuve
   * @param phasesList La liste des phases de l'épreuve
   * @param timeManagement Inclusion du gestionnaire de départ
   */
  constructor(id: number, name: string, organization: string, location: string, ranking: number, numberBoats: number, date: string,
              subscribers: Subscriber[], phasesList: Phase[], timeManagement: boolean
  ) {
    super(id); // Appel du constructeur Entity
    this.name = name;
    this.organization = organization;
    this.location = location;
    this.ranking = ranking;
    this.numberBoats = numberBoats;
    this.date = date;
    this.subscribers = subscribers;
    this.phasesList = phasesList;
    this.boatsList = [];
    this.timeManagement = timeManagement;
    this.hiddenContent = true;
  }

  /**
   * Assesseur de l'attribut name
   * @returns name Retourne le nom de l'épreuve
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Mutateur de l'attribut name
   * @param name Le nom de l'épreuve
   */
  public setName(value: string): void {
    this.name = value;
  }

  /**
   * Assesseur de l'attribut organization
   * @returns organization Retourne le nom de l'organisation qui réalise l'épreuves
   */
  public getOrganization(): string {
    return this.organization;
  }

  /**
   * Mutateur de l'attribut organization
   * @param organization Le nom de l'organisation qui réalise l'épreuve
   */
  public setOrganization(value: string): void {
    this.organization = value;
  }

  /**
   * Assesseur de l'attribut location
   * @returns location Retourne le lieu de déroulement de l'épreuve
   */
  public getLocation(): string {
    return this.location;
  }

  /**
   * Mutateur de l'attribut location
   * @param location Lieu de déroulement de l'épreuve
   */
  public setLocation(value: string): void {
    this.location = value;
  }

  /**
   * Assesseur de l'attribut ranking
   * @returns ranking Retourne le grade de l'épreuve
   */
  public getRanking(): number {
    return this.ranking;
  }

  /**
   * Mutateur de l'attribut ranking
   * @param ranking Le grade de l'épreuve
   */
  public setRanking(value: number): void {
    this.ranking = value;
  }

  /**
   * Assesseur de l'attribut numberBoats
   * @returns numberBoats Retourne le nombre de bateaux dans l'épreuve
   */
  public getNumberBoats(): number {
    return this.numberBoats;
  }

  /**
   * Mutateur de l'attribut numberBoats
   * @param numberBoats Le nombre de bateaux dans l'épreuve
   */
  public setNumberBoats(value: number): void {
    this.numberBoats = value;
  }

  /**
   * Assesseur de l'attribut date
   * @returns date Retourne la date du déroulement de l'épreuve
   */
  public getDate(): string {
    return this.date;
  }

  /**
   * Mutateur de l'attribut date
   * @param date La date du déroulement de l'épreuve
   */
  public setDate(value: string): void {
    this.date = value;
  }

  /**
   * Assesseur de l'attribut subscribers
   * @returns subscribers Retourne la liste des participants de l'épreuve
   */
  public getSubscribers(): Subscriber[] {
    return this.subscribers;
  }

  /**
   * Mutateur de l'attribut subscribers
   * @param subscribers Le nom de l'épreuve
   */
  public setSubscribers(value: Subscriber[]): void {
    this.subscribers = value;
  }

  /**
   * Assesseur de l'attribut phasesList
   * @returns phasesList Retourne la liste des phases de l'épreuve
   */
  public getPhasesList(): Phase[] {
    return this.phasesList;
  }

  /**
   * Mutateur de l'attribut phasesList
   * @param phasesList La liste des phases de l'épreuve
   */
  public setPhasesList(value: Phase[]): void {
    this.phasesList = value;
  }

  /**
   * Assesseur de l'attribut boatsList
   * @returns boatsList Retourne la liste des bateaux
   */
  public getBoatsList(): Boat[] {
    return this.boatsList;
  }

  /**
   * Mutateur de l'attribut boatsList
   * @param boatsList La liste des bateaux
   */
  public setBoatsList(value: Boat[]): void {
    this.boatsList = value;
  }

  /**
   * Assesseur de l'attribut timeManagement
   * @returns phasesList Retourne l'état inclusion du gestionnaire de départ
   */
  public getTimeManagement(): boolean {
    return this.timeManagement;
  }

  /**
   * Mutateur de l'attribut phasesList
   * @param timeManagement Inclusion du gestionnaire de départ
   */
  public setTimeManagement(value: boolean): void {
    this.timeManagement = value;
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

}
