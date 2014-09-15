// ==UserScript==
// @name        bdphile
// @namespace   bdphile
// @description Ajoute un liens vers tribulles pour avoir la disponibilité en occasion
// @include     http://www.bdphile.info/bdtheque/series/
// @version     1
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant       none
// ==/UserScript==

var CANALBD_URL = "http://www.canalbd.net/tribulles_catalogue_serieoccas_";

// trouvé sur http://www.finalclap.com/faq/257-javascript-supprimer-remplacer-accent
String.prototype.normalise = function(){
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
     
    var str = this;
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }
    str = str.replace(/ /g, "-");
    str = str.replace(/''/g, "-");
    str = str.replace(/\./g, "-");
    str = CANALBD_URL + str;
    return str;
}

var mytable = document.getElementsByClassName("listing")[0].getElementsByTagName('tbody')[0];
var teair = mytable.getElementsByTagName('tr');

for(var i=0; i < teair.length; i++)
{
    var tede = teair[i].getElementsByTagName('td');
    tede[0].innerHTML = tede[0].innerHTML + " - (<a href=\"" + tede[0].textContent.normalise() + "--Albums\"> Occasion </a>)";
}

