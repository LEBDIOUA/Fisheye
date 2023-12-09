import Controller from './controller/controller.js';
const controller = new Controller();

// Récupérer les paramètres de l'URL
const urlParams = new URLSearchParams(window.location.search);

// Afficher photograph
controller.afficherPhotograph(urlParams.get('id'));

// Afficher Liste de tri
controller.chargerListeTri(urlParams.get('id'));
// Controller.appliquerTri();

// afficher la liste des medias
controller.afficherListeMedias(urlParams.get('id'), 'getMedias');

// Chargement du modal contact
controller.afficherModalContact('.modal', urlParams.get('id'));

addEventListener('keydown', event => {
    if (event.key === 'Backspace') {
        window.location.href = '../';
    } 
});