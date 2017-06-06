/*
* \file home.component.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-02 00:26:00 +0100 $

Projet : GEMARA - SGER
*/
import { Component, OnInit } from '@angular/core';
import { Event } from '../../class/data/event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EventService]
})

/**
 * Environnement de la page d'accueil
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-13 18:15:00 +0100
 */
export class HomeComponent implements OnInit {
  protected events: {ref: Event[]};

  /**
   * Constructeur qui initialise les attributs
   * @param eventService persistance des événements
   */
  constructor(protected eventService: EventService) {
    this.events = {ref: []};
  }

  /**
   * Méthode qui initialise eventService au chargement du HomeComponent
   */
  ngOnInit() {
    this.eventService.read(this.events);
  }

}
