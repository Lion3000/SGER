/*
* \file
* $Author: Zarzitski$
* $Rev: 2 $
* $Date: 2017-05-12 12:33:00 +0100 $

Projet : GEMARA - SGER
*/

/**
 * Représentation de la class se la barre de recherche
 * Author: Zarzitski
 * Version: 2
 * Date: 2017-04-11 21:54:00 +0100
 */
export abstract class SearchBar {

  /**
   * Constructeur qui initialise les attributs du bateau
   * @param title Le mot-clé à identifié
   * @returns Retourne le résultat de la recherche
   */
  public resultSearchBar(title: string): boolean {
    var result = true;
    const tagsString = document.getElementById("searchBar").innerHTML;
    if(tagsString != ''){
      var arrayTags = tagsString.split(' ');
      for(var i = 0; i < arrayTags.length; i++){
        if(arrayTags[i] != '' && arrayTags[i] != ' ')
          result = result&&(title.search(new RegExp(arrayTags[i], "i")) != -1)?true:false;
      }
    }
    return result;
  }
}
