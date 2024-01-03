import Model from '../models/model.js';
import ListePhotographsView from '../views/listePhotographsView.js';
import ListeMediasView from '../views/listeMediasView.js';
import TriView from '../views/triView.js';
import ModalContact from '../views/modalContact.js';
import ModalLightBox from '../views/modalLightBox.js';

class Controller {
	constructor() {
		this.model = Model.getInstance();
		this.listePhotographsView = new ListePhotographsView();
	}

	async afficherListePhotographs() {
		const photographers = await this.model.getPhotographers();
		this.listePhotographsView.render(photographers);
	}

	async afficherPhotograph(id) {
		const photograph = await this.model.getPhotographById(id);
		this.listePhotographsView.construirePhotographEntete(photograph);
	}

	async getNomPhotograph(id) {
		const photograph = await this.model.getPhotographById(id);
		return photograph.getName;
	}

	ajouterEcouteurClicsMedias(photograph, listeMedias) {
		const section = document.querySelector('.mediaSection');
		const medias = section.querySelectorAll('.media');
		medias.forEach((media, index) => {
			media.addEventListener('click', event => {
				if (listeMedias[index].isVideo) {
					event.preventDefault();
				}

				this.afficherModalLightBox(photograph, listeMedias, index);
			});
			media.addEventListener('keydown', event => {
				if (event.key === 'Enter') {
					if (listeMedias[index].isVideo) {
						event.preventDefault();
					}

					this.afficherModalLightBox(photograph, listeMedias, index);
				}
			});
		});
	}

	async afficherListeMedias(photographId, filtre) {
		let medias;
		if (typeof this.model[filtre] === 'function') {
			medias = await this.model[filtre](photographId);
		} else {
			console.error(`La méthode ${filtre} n'est pas une fonction dans le modèle.`);
		}

		const photograph = await this.model.getPhotographById(photographId);
		const listeMediasView = new ListeMediasView(photograph, medias);
		listeMediasView.render();
		this.ajouterEcouteurClicsMedias(photograph, medias);
	}

	chargerListeTri(id) {
		const listeTri = new TriView();
		listeTri.construireListeTri();

		const maListe = document.querySelector('.listeTri');
		const liElements = maListe.querySelectorAll('li');

		for (let i = 2; i < liElements.length; i += 2) {
			liElements[i - 1].addEventListener('click', event => {
				event.preventDefault();
			});
			liElements[i].addEventListener('click', () => {
				listeTri.choisirTri(i);
				this.afficherListeMedias(id, listeTri.genererFonction(liElements[0]));
			});
			liElements[i].addEventListener('keydown', event => {
				if (event.key === 'Enter') {
					listeTri.choisirTri(i);
					this.afficherListeMedias(id, listeTri.genererFonction(liElements[0]));
					maListe.focus();
				}
			});
		}

		maListe.addEventListener('keydown', event => {
			const sign = maListe.querySelector('.fa-chevron-up');
			if (event.key === 'ArrowDown') {
				event.preventDefault();
				if (sign) {
					const index = Array.from(liElements).indexOf(document.activeElement);
					if (index === -1 || index + 2 > liElements.length - 1) {
						liElements[0].focus();
					} else {
						liElements[index + 2].focus();
					}
				}
			} else if (event.key === 'ArrowUp') {
				event.preventDefault();
				const index = Array.from(liElements).indexOf(document.activeElement);
				if (sign) {
					if (index === -1 || index - 2 < 0) {
						liElements[liElements.length - 1].focus();
					} else if (index - 2 >= 0) {
						liElements[index - 2].focus();
					}
				}
			}
		});
	}

	async afficherModalContact(photographId) {
		const monModal = new ModalContact(photographId);
		monModal.chargerModal(await this.getNomPhotograph(photographId));
	}

	async afficherModalLightBox(photograph, medias, position) {
		const monModal = new ModalLightBox(photograph, medias, position);
		monModal.afficherLightBox();

		// Console.log('AfficherLB, .precedent', document.querySelector('.precedent').getAttribute('aria-hidden'));
		// console.log('AfficherLB, .suivant', document.querySelector('.suivant').getAttribute('aria-hidden'));
		// console.log('AfficherLB, .btnFermer', document.querySelector('.fermerLightBox').getAttribute('aria-hidden'));
	}
}
export default Controller;
