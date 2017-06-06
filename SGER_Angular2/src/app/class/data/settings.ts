/*
* \file settings.ts
* $Author: Zarzitski$
* $Rev: 2 $
* $Date: 2017-04-01 19:25:00 +0100 $

Projet : GEMARA - SGER
*/

/**
 * Représentation de la configuration de l'application SGER
 * Author: Zarzitski
 * Version: 2
 * Date: 2017-04-01 19:25:00 +0100
 */
export class Settings {
  private organization: string;
  private phone: string;
  private email: string;
  private address: string;
  private addressSupplement: string;
  private country: string;
  private postalCode: string;
  private location: string;
  private amountBoats: number;
  private timeManagement: boolean;

  /**
   * Constructeur qui initialise les attributs
   * @param organization Le nom de l'organisation
   * @param phone Le numero de téléphone de l'organisation
   * @param email Le courriel de l'organisation
   * @param address L'adresse de l'organisation
   * @param addressSupplement Le complément adresse de l'organisation
   * @param country Le pays de l'organisation
   * @param postalCode Le code postal de l'organisation
   * @param logo La présence du logo de l'organisation
   * @param location Lieu de déroulement de l'épreuve
   * @param amountBoats Le nombre de bateaux dans l'épreuve
   * @param timeManagement Inclusion du gestionnaire de départ
   */
  constructor(organization: string, phone: string, email: string, address: string, addressSupplement: string,
              country: string, postalCode: string, location: string, amountBoats: number, timeManagement: boolean
  ) {
    this.organization = organization;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.addressSupplement = addressSupplement;
    this.country = country;
    this.postalCode = postalCode;
    this.location = location;
    this.amountBoats = amountBoats;
    this.timeManagement = timeManagement;
  }

  /**
   * Assesseur de l'attribut organization
   * @returns organization Retourne le nom de l'organisation
   */
  public getOrganization(): string {
    return this.organization;
  }

  /**
   * Mutateur de l'attribut organization
   * @param organization Le nom de l'organisation
   */
  public setOrganization(value: string): void {
    this.organization = value;
  }

  /**
   * Assesseur de l'attribut phone
   * @returns phone Retourne le numero de téléphone de l'organisation
   */
  public getPhone(): string {
    return this.phone;
  }

  /**
   * Mutateur de l'attribut phone
   * @param phone Le numero de téléphone de l'organisation
   */
  public setPhone(value: string): void {
    this.phone = value;
  }

  /**
   * Assesseur de l'attribut email
   * @returns email Retourne le courriel de l'organisation
   */
  public getEmail(): string {
    return this.email;
  }

  /**
   * Mutateur de l'attribut email
   * @param email Le courriel de l'organisation
   */
  public setEmail(value: string): void {
    this.email = value;
  }

  /**
   * Assesseur de l'attribut address
   * @returns address Retourne l'adresse de l'organisation
   */
  public getAddress(): string {
    return this.address;
  }

  /**
   * Mutateur de l'attribut address
   * @param address L'adresse de l'organisation
   */
  public setAddress(value: string): void {
    this.address = value;
  }

  /**
   * Assesseur de l'attribut addressSupplement
   * @returns addressSupplement Retourne le complément adresse de l'organisation
   */
  public getAddressSupplement(): string {
    return this.addressSupplement;
  }

  /**
   * Mutateur de l'attribut addressSupplement
   * @param addressSupplement Le complément adresse de l'organisation
   */
  public setAddressSupplement(value: string): void {
    this.addressSupplement = value;
  }

  /**
   * Assesseur de l'attribut country
   * @returns country Retourne le pays de l'organisation
   */
  public getCountry(): string {
    return this.country;
  }

  /**
   * Mutateur de l'attribut country
   * @param country Le pays de l'organisation
   */
  public setCountry(value: string): void {
    this.country = value;
  }

  /**
   * Assesseur de l'attribut postalCode
   * @returns postalCode Retourne le code postal de l'organisation
   */
  public getPostalCode(): string {
    return this.postalCode;
  }

  /**
   * Mutateur de l'attribut postalCode
   * @param postalCode Le code postal de l'organisation
   */
  public setPostalCode(value: string): void {
    this.postalCode = value;
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
   * Assesseur de l'attribut amountBoats
   * @returns amountBoats Retourne le nombre de bateaux dans l'épreuve
   */
  public getAmountBoats(): number {
    return this.amountBoats;
  }

  /**
   * Mutateur de l'attribut amountBoats
   * @param amountBoats Le nombre de bateaux dans l'épreuve
   */
  public setAmountBoats(value: number): void {
    this.amountBoats = value;
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

}
