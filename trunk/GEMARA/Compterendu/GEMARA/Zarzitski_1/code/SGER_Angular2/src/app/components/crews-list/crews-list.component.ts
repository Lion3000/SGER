/*
* \file crews-list.component.ts
* $Author: Zarzitski$
* $Rev: 2 $
* $Date: 2017-04-01 22:53:00 +0100 $

Projet : GEMARA - SGER
*/
import { Component, OnInit } from '@angular/core';
import { CrewService } from '../../services/crew.service';

import { SearchBar } from '../../class/searchbar';
import { Crew } from '../../class/data/crew';
import { UcManageCrews } from '../../class/ucmanagecrews';

@Component({
  selector: 'app-crews-list',
  templateUrl: './crews-list.component.html',
  styleUrls: ['./crews-list.component.css'],
  providers: [CrewService]
})

/**
 * Environnement de gestion des équipages
 * Author: Zarzitski
 * Version: 3
 * Date: 2017-04-01 22:53:00 +0100
 */
export class CrewsListComponent extends SearchBar implements OnInit {
  protected crews: {ref: Crew[]};
  protected crew: {ref: Crew};
  protected crewPanelIhm: {ref: boolean};
  protected deletePanelIhm: {ref: boolean};
  protected editMode: {ref: boolean};
  protected ucmanagecrews: UcManageCrews;

  /**
   * Constructeur qui initialise les attributs
   * @param crewsService persistance des équipages
   */
  constructor(private crewService: CrewService) {
    super();
    this.crews = {ref: []};
    this.crew = {ref: new Crew(0, '', '', '', 0)};
    this.editMode = {ref: true};
    this.deletePanelIhm = {ref: false};
    this.crewPanelIhm = {ref: true};
  }

  /**
   * Méthode qui initialise ucmanagecrews au chargement du CrewsListComponent
   */
  ngOnInit(): void {
    this.ucmanagecrews = new UcManageCrews(
      this.crewService, this.crews, this.crew, this.crewPanelIhm, this.editMode, this.deletePanelIhm
    );
  }

}
