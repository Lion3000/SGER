/*
* \file settings.component.ts
* $Author: Zarzitski$
* $Rev: 1 $
* $Date: 2017-04-12 16:13:00 +0100 $

Projet : GEMARA - SGER
*/
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../class/data/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [SettingsService]
})

/**
 * Environnement de configuration général de SGER
 * Author: Zarzitski
 * Version: 1
 * Date: 2017-04-12 16:13:00 +0100
 */
export class SettingsComponent implements OnInit {
  protected settings: {ref: Settings};

  /**
   * Constructeur qui initialise les attributs
   * @param settingsService La persistance de la configuration
   */
  constructor(private settingsService: SettingsService) {
    this.settings = {ref: new Settings('', '', '', '', '', '', '', '', 0, false)};
  }

  /**
   * Méthode qui lit les données la configuration
   */
  ngOnInit(): void {
    this.settingsService.read(this.settings);
  }

  /**
   * Méthode qui sauvegarde les modifications si elles sont conformes
   */
  public saveSettings(): void {
    if(this.testSettingsPanel()){
      this.settingsService.update(this.settings.ref);
      alert('Settings was successfully updated');
    }
  }

  /**
   * Test les champs du formulaire SettingsPanel et affiche les erreurs
   * @returns Retourne le resultat du test
   */
  public testSettingsPanel(): boolean {
    var testResult = true;
    if(!/^[A-Za-z0-9-]{2,}[A-Za-z0-9-]*$/.test(this.settings.ref.getOrganization())){
      testResult = false;
      alert('The organization contains unauthorized characters, please correct it with the allowed characters ("A-Z", "a-z", "0-9", "-").');
    }
    if(!/^[+0-9]*$/.test(this.settings.ref.getPhone()) && this.settings.ref.getPhone() != ''){
      testResult = false;
      alert('The phone number contains unauthorized characters or is incorrect, please correct it with the allowed characters ("+", "-", " ", "0-9").');
    }
    if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.settings.ref.getEmail()) && this.settings.ref.getEmail() != ''){
      testResult = false;
      alert('The E-mail contains unauthorized characters or is incorrect, please correct it with the allowed characters ("@", ",", ".", "_", "-", "0-9", "a-z", "A-Z").');
    }
    if(!/^[A-Za-z0-9-,.]*$/.test(this.settings.ref.getAddress())){
      testResult = false;
      alert('The Address contains unauthorized characters, please correct it with the allowed characters ("A-Z", "a-z", "0-9", "-", ".", ",").');
    }
    if(!/^[A-Za-z0-9-,.]*$/.test(this.settings.ref.getAddressSupplement())){
      testResult = false;
      alert('The Address Supplement contains unauthorized characters, please correct it with the allowed characters ("A-Z", "a-z", "0-9", "-", ".", ",").');
    }
    if(!/^[A-Z]{2}$/.test(this.settings.ref.getCountry()) && this.settings.ref.getCountry() != ''){
      testResult = false;
      alert('The Country contains unauthorized country.');
    }
    if(!/^[0-9]{6}$/.test(this.settings.ref.getPostalCode()) && this.settings.ref.getPostalCode() != ''){
      testResult = false;
      alert('The Postal Code contains unauthorized characters, please use numbers');
    }
    if(!/^[A-Za-z0-9-,.]*$/.test(this.settings.ref.getLocation())){
      testResult = false;
      alert('The Location contains unauthorized characters, please correct it with the allowed characters ("A-Z", "a-z", "0-9", "-", ".", ",").');
    }
    if(!/^[1-9]{1,}[0-9]*$/.test(this.settings.ref.getAmountBoats().toString()) && this.settings.ref.getAmountBoats().toString() != ''){
      testResult = false;
      alert('The Number of Boats contains unauthorized number');
    }
    return testResult;
  }

  /**
   * Méthode qui annule les modifications en rechargeant le contenu précédent
   */
  public cancelSettings(): void {
    this.settingsService.read(this.settings);
  }

}
