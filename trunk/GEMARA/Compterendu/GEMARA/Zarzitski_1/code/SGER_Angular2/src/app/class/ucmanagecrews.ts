/*
* \file ucmanagecrews.ts
* $Author: Zarzitski$
* $Rev: 2 $
* $Date: 2017-04-01 20:53:00 +0100 $

Projet : GEMARA - SGER
*/
import { Component, OnInit } from '@angular/core';
import { Entity } from './data/entity';
import { Crew } from './data/crew';
import { CrewService } from '../services/crew.service';

/**
 * UcGererEquipage
 * Author: Zarzitski
 * Version: 3
 * Date: 2017-04-05 08:45:00 +0100
 */
export class UcManageCrews {
  private crewService: CrewService;
  private crews: {ref: Crew[]};
  private crew: {ref: Crew};
  private crewPanelIhm: {ref: boolean};
  private editMode: {ref: boolean};
  private deletePanelIhm: {ref: boolean};

  /**
   * Constructeur qui initialise les attributs passés par référence et récupère la liste des équipages
   * @param crewsService La persistance des équipages
   * @param crews Liste des équipages
   * @param crew Stockage de l'equipage selectionné
   * @param crewPanelIhm Variable qui indique le comportement de l'IHM crewPanel
   * @param editMode Variable qui indique si on est en mode édition ou création
   * @param deletePanelIhm Variable qui indique le comportement de l'IHM deletePanel
   */
  constructor(
              crewService: CrewService,
              crews: {ref: Crew[]},
              crew: {ref: Crew},
              crewPanelIhm: {ref: boolean},
              editMode: {ref: boolean},
              deletePanelIhm: {ref: boolean}
  ) {
    this.crewService = crewService;
    this.crews = crews;
    this.crew = crew;
    this.crewPanelIhm = crewPanelIhm;
    this.editMode = editMode;
    this.deletePanelIhm = deletePanelIhm;
    this.read();
  }

  /**
   * Créer un équipage
   */
  public create(): void {
    if(this.testCrewPanel()){
      this.crew.ref.setId(this.crewService.getNewID());
      this.crewService.create(this.crew.ref);
      this.crews.ref.push(
        new Crew(this.crew.ref.getId(), this.crew.ref.getName(), this.crew.ref.getCountry(), this.crew.ref.getIsaf(), +this.crew.ref.getRanking())
      );
      this.crewPanelShowHide();
    }
  }

  /**
   * Met à jour l'équipage selectionné
   */
  public update(): void {
    if(this.testCrewPanel()){
      const index = this.crews.ref.findIndex(x => x.getId() === this.crew.ref.getId());
      this.crews.ref[index] = new Crew(
        this.crew.ref.getId(), this.crew.ref.getName(), this.crew.ref.getCountry(), this.crew.ref.getIsaf(), +this.crew.ref.getRanking()
      );
      this.crewService.update(this.crew.ref);
      this.crewPanelShowHide();
    }
  }

  /**
   * Test les champs du formulaire CrewPanel et affiche les erreurs
   * @returns Retourne le resultat du test
   */
  public testCrewPanel(): boolean {
    var testResult = true;
    if(!/^[A-Za-z0-9- ]{2,}[A-Za-z0-9- ]*$/.test(this.crew.ref.getName())){
      testResult = false;
      alert('The name contains unauthorized characters, please correct it with the allowed characters ("A-Z", "a-z", "0-9", "-", " ").');
    }
    if(!/^[A-Z]{2}$/.test(this.crew.ref.getCountry())){
      testResult = false;
      alert('The Country contains unauthorized country.');
    }
    if(!/^[A-Za-z0-9- ]*$/.test(this.crew.ref.getIsaf())){
      testResult = false;
      alert('The ISAF contains unauthorized characters, please correct it with the allowed characters ("A-Z", "a-z", "0-9", "-", " ").');
    }
    if(!/^[0-5]{1}$/.test(this.crew.ref.getRanking().toString())){
      testResult = false;
      alert('The ranking contains unauthorized number, please correct it with the allowed number ("0-5")');
    }
    return testResult;
  }

  /**
   * Initialise tous les équipages sauvegardés
   */
  public read(): void {
    this.crewService.read(this.crews);
  }

  /**
   * Supprime l'équipage selectionné
   */
  public delete(): void {
    const index = this.crews.ref.findIndex(x => x.getId() === this.crew.ref.getId());
    this.crewService.delete(this.crew.ref);
    this.crews.ref.splice(index, 1);
    this.deletePanelHide();
  }

  /**
   * Affiche l'IHM crewPanel en mode création
   */
  protected createCrewPanel(): void  {
    this.crewPanelShowHide();
    this.editMode.ref = false;
  }

  /**
   * Affiche l'IHM crewPanel en mode édition en récuperant l'équipage à modifier
   * @param crew L'équipage selectionné pour la modification
   */
  protected editCrewPanel(crew: Crew): void  {
    this.crewPanelShowHide();
    this.crew.ref = new Crew(crew.getId(), crew.getName(), crew.getCountry(), crew.getIsaf(), crew.getRanking());
    this.editMode.ref = true;
  }

  /**
   * Affiche l'IHM crewPanel et vide la variable crew
   */
  protected crewPanelShowHide(): void  {
    this.crew.ref = new Crew(0, '', '', '', 0);
    this.crewPanelIhm.ref = this.crewPanelIhm.ref ? false : true;
  }

  /**
   * Affiche l'IHM deletePanel en récuperant l'équipage à supprimer
   * @param crew L'équipage selectionné pour la suppression
   */
  protected deletePanelShow(crew: Crew): void  {
    this.crew.ref = new Crew(crew.getId(), crew.getName(), crew.getCountry(), crew.getIsaf(), crew.getRanking());
    this.deletePanelIhm.ref = true;
  }

  /**
   * Cache l'IHM deletePanel et vide la variable crew
   */
  protected deletePanelHide(): void  {
    this.crew.ref = new Crew(0, '', '', '', 0);
    this.deletePanelIhm.ref = false;
  }
}
