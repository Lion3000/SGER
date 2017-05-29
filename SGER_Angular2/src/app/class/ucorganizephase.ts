/*
* \file ucorganizephase.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-17 13:51:00 +0100 $

Projet : GEMARA - SGER
*/
import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { PhaseService } from '../services/phase.service';

import { Event } from './data/event';
import { Phase } from './data/phase';

declare const TIME_TO_WAIT;

/**
 * UcOrganiserPhase
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-13 21:34:00 +0100
 */
export class UcOrganizePhase {
  private phaseService: PhaseService;
  private events: {ref: Event[]};
  private event: {ref: Event};
  private phase: {ref: Phase};
  private phasePanelIhm: {ref: boolean};
  private deletePhasePanelIhm: {ref: boolean};
  private editMode: {ref: boolean};

  /**
   * Constructeur qui initialise les attributs passés par référence et récupère les informations concernant les phases
   * @param phaseService La persistance des phases
   * @param events Liste des événements
   * @param event Evénement selectionné
   * @param phase phase sélectionné
   * @param phasePanelIhm booleen qui indique le comportement de l'IHM phase
   * @param editMode booleen qui indique si le mode édition est sélectionné ou non
   * @param deleteEventPanelIhm booleen qui indique si une suppression est demandée
   */
  constructor(
    phaseService: PhaseService, events: {ref: Event[]}, event: {ref: Event}, phase: {ref: Phase},
    phasePanelIhm: {ref: boolean}, editMode: {ref: boolean}, deletePhasePanelIhm: {ref: boolean}
  ) {
    this.phaseService = phaseService;
    this.events = events;
    this.event = event;
    this.phase = phase;
    this.phasePanelIhm = phasePanelIhm;
    this.editMode = editMode;
    this.deletePhasePanelIhm = deletePhasePanelIhm;
    this.read(this.read, this.phaseService, this.events);
  }

  /**
   * Créer une phase
   */
  public create(): void {
    if(this.testPhasePanel()){
      const index = this.events.ref.findIndex(x => x.getId() == this.event.ref.getId());
      var phases = this.event.ref.getPhasesList().slice(0);
      this.phase.ref.setId(this.phaseService.getNewID());
      phases.push(new Phase(this.phase.ref.getId(), this.phase.ref.getName(), this.phase.ref.getRoundRobin(), this.phase.ref.getFlightsList()));
      this.events.ref[index].setPhasesList(phases.slice(0));
      this.phaseService.create(this.phase.ref);
      this.phaseService.setEventID(this.phase.ref, this.event.ref);
      this.phasePanelShowHide();
    }
  }

  /**
   * Met à jour la phase selectionnée
   */
  public update(): void {
    if(this.testPhasePanel()){
      const indexEvent = this.events.ref.findIndex(x => x.getId() == this.event.ref.getId());
      var phases = this.event.ref.getPhasesList().slice(0);
      const indexPhases = phases.findIndex(x => x.getId() == this.phase.ref.getId());
      phases[indexPhases] = new Phase(this.phase.ref.getId(), this.phase.ref.getName(), this.phase.ref.getRoundRobin(), this.phase.ref.getFlightsList());
      this.events.ref[indexEvent].setPhasesList(phases.slice(0));
      this.phaseService.update(this.phase.ref);
      this.phasePanelShowHide();
    }
  }

  /**
   * Test les champs du formulaire testPhasePanel et affiche les erreurs
   * @returns testResult Retourne le resultat du test
   */
  public testPhasePanel(): boolean {
    var testResult = true;
    if(!/^[A-Za-z0-9-]{2,}[A-Za-z0-9- ]*$/.test(this.phase.ref.getName())){
      alert('The phase name contains unauthorized characters, please correct it with the allowed characters ("A-Z", "a-z", "0-9", "-", " ").');
      testResult = false;
    }
    return testResult;
  }

  /**
   * Initialise toutes les phases sauvegardés
   */
  public read(read, phaseService, events): void {
    if(events.ref == []){
      setTimeout(read.bind(null, read, phaseService, events), TIME_TO_WAIT);
    }
    else{
      phaseService.read(events);
    }
  }

  /**
   * Supprime la phase selectionnée
   */
  public delete(): void {
    const indexEvent = this.events.ref.findIndex(x => x.getId() == this.event.ref.getId());
    var phases = this.event.ref.getPhasesList().slice(0);
    const indexPhases = phases.findIndex(x => x.getId() == this.phase.ref.getId());
    phases.splice(indexPhases, 1);
    this.events.ref[indexEvent].setPhasesList(phases.slice(0));
    this.phaseService.delete(this.phase.ref);
    this.deletePanelHide();
  }

  /**
   * Ajoute une phase
   */
  protected createPhasePanel(event: Event): void {
    this.phasePanelShowHide();
    this.event.ref = new Event(
      event.getId(), event.getName(), event.getOrganization(), event.getLocation(), event.getRanking(), event.getNumberBoats(), event.getDate(),
      event.getSubscribers(), event.getPhasesList(), event.getTimeManagement()
    );
    this.editMode.ref = false;
  }

  /**
   * Modifie une phase
   * @param phase phase selectionné pour la modification
   * @param event événement dans lequel se trouve la phase sélectionnée
   */
  protected editPhasePanel(phase: Phase, event: Event): void {
    this.phasePanelShowHide();
    this.event.ref = new Event(
      event.getId(), event.getName(), event.getOrganization(), event.getLocation(), event.getRanking(), event.getNumberBoats(), event.getDate(),
      event.getSubscribers(), event.getPhasesList(), event.getTimeManagement()
    );
    this.phase.ref = new Phase(phase.getId(), phase.getName(), phase.getRoundRobin(), phase.getFlightsList());
    this.editMode.ref = true;
  }

  /**
   * Affiche et cache l'IHM phasePanel et vide la variable phase
   */
  protected phasePanelShowHide(): void {
    this.phase.ref = new Phase(0, '', false, []);
    this.phasePanelIhm.ref = this.phasePanelIhm.ref ? false : true;
  }

  /**
   * \fn    deletePanelShow(): void
   * Supprime une phase
   * @param phase phase selectionné pour la suppression
   * @param event événement dans lequel se trouve la phase selectionné pour la suppression
   */
  protected deletePanelShow(phase: Phase, event: Event): void {
    this.event.ref = new Event(
      event.getId(), event.getName(), event.getOrganization(), event.getLocation(), event.getRanking(), event.getNumberBoats(), event.getDate(),
      event.getSubscribers(), event.getPhasesList(), event.getTimeManagement()
    );
    this.phase.ref = new Phase(phase.getId(), phase.getName(), phase.getRoundRobin(), phase.getFlightsList());
    this.deletePhasePanelIhm.ref = true;
  }

  /**
   * Cache l'IHM deletePanel et vide la variable phase
   */
  protected deletePanelHide(): void {
    this.phase.ref = new Phase(0, '', false, []);
    this.deletePhasePanelIhm.ref = false;
  }
}
