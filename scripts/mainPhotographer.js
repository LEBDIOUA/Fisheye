
import Controller from './controller/controller.js';
const controller = new Controller();

// Récupérer les paramètres de l'URL
const urlParams = new URLSearchParams(window.location.search);
const idPhotograph = urlParams.get('id');

// Afficher photograph
controller.afficherPhotograph(idPhotograph);

// Afficher Liste de tri
controller.chargerListeTri(idPhotograph);
// Controller.appliquerTri();

// afficher la liste des medias
controller.afficherListeMedias(idPhotograph, 'getMedias');

// Chargement du modal contact
controller.afficherModalContact(idPhotograph);
