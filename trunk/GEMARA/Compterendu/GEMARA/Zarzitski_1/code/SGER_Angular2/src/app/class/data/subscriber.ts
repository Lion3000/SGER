/*
* \file subscriber.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-01 13:08:00 +0100 $

Projet : GEMARA - SGER
*/
import { Crew } from './crew';

/**
 * Représentation d'un participant
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-01 13:08:00 +0100
 */
export class Subscriber extends Crew {
  private letter: string;

  /**
   * Constructeur qui initialise les attributs d'un participant
   * @param id L'identifiant de l'entité
   * @param name Le nom de l'équipage
   * @param country Le pays de l'équipage
   * @param isaf Le code ISAF de l'équipage
   * @param ranking Le classement de l'équipage
   * @param letter La letter du participant
   *
   */
  constructor(id: number, name: string, country: string, isaf: string, ranking: number, letter: string) {
    super(id, name, country, isaf, ranking); // Appel du constructeur Crew
    this.letter = letter;
  }

  /**
   * Assesseur de l'attribut letter
   * @returns letter Retourne la letter du participant
   */
  public getLetter(): string {
    return this.letter;
  }

  /**
   * Mutateur de l'attribut letter
   * @param letter La letter du participant
   */
  public setLetter(letter: string): void {
    this.letter = letter;
  }
}
