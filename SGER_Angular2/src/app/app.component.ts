/*
* \file app.component.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-22 10:30:00 +0100 $

Projet : GEMARA - SGER
*/
/// <reference path="./class/navMenu.ts" />
import { Component } from '@angular/core';

declare const TIME_TO_WAIT;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * AppComponent
 * Author: Zarzitski
 * Version: 3
 * Date: 2017-04-22 10:30:00 +0100
 */
export class AppComponent {

  private sidenav: boolean;
  private searchBar: boolean;
  private searchBarContent: string;
  private navMenu: {ref: NavMenu[]};

  /**
   * Constructeur qui initialise les attributs
   */
  constructor() {
    this.sidenav = false;
    this.searchBar = false;
    this.searchBarContent = '';
    this.navMenu = {ref: []};
  }

  /**
   * Méthode qui lit les données la configuration
   */
  ngOnInit(): void {
    this.navMenu.ref.push({title: 'Home', link: 'home'});
    this.findMenuDescription.bind(this)();
  }

  /**
   * Méthode qui selon le lien met à jour la barre de navigation
   * @param link Lien selectioné
   */
  public pushButtonNav(link: string): void {
    this.navMenu.ref = [];
    this.searchBar = false;
    this.searchBarContent = '';
    switch(link){
      case 'home': this.navMenu.ref.push({title: 'Home', link: 'home'});
        break;
      case 'events-list':
        this.navMenu.ref.push({title: 'Event List', link: 'events-list'});
        this.searchBar = true;
        break;
      case 'crews-list':
        this.navMenu.ref.push({title: 'Crew List', link: 'crews-list'});
        this.searchBar = true;
        break;
      case 'guide': this.navMenu.ref.push({title: 'Guide', link: 'guide'});
        break;
      case 'settings': this.navMenu.ref.push({title: 'Settings', link: 'settings'});
        break;
      case 'about': this.navMenu.ref.push({title: 'About', link: 'about'});
        break;
    }
    document.getElementById('MenuData').innerHTML = '';
    this.sidenavShowHide();
  }

  /**
   * Récupère les données pour mettre la barre de navigation à jour
   */
  private findMenuDescription(): void {
    if(document.getElementById("MenuData")){
      if(document.getElementById('MenuData').innerHTML != ''){
        this.navMenu.ref = JSON.parse(document.getElementById('MenuData').innerHTML).splice(0);
      }
    }
    setTimeout(this.findMenuDescription.bind(this), TIME_TO_WAIT);
  }

  /**
   * Affiche ou cache la barre de navigation
   */
  public sidenavShowHide(): void {
    this.sidenav = this.sidenav ? false : true;
  }

}
