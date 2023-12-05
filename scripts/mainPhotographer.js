import Controller from "./controller/controller.js"
let controller = new Controller();

// Récupérer les paramètres de l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(window.location.search);

//afficher photograph
controller.afficherPhotograph(urlParams.get("id"));

//afficher Liste de tri
controller.chargerListeTri(urlParams.get("id"));

//afficher la liste des medias
controller.afficherListeMedias(urlParams.get("id"));

//Chargement du modal contact
controller.afficherModalContact(".contact_modal", ".modal", ".ouvrirModal", ".fermerModal", urlParams.get("id"));