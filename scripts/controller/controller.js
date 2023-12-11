import Model from '../models/model.js';
import ListePhotographsView from '../views/listePhotographsView.js';
import ListeMediasView from '../views/listeMediasView.js';
import TriView from '../views/triView.js';
import ModalContact from '../views/modalContact.js';
import ModalLightBox from '../views/modalLightBox.js';

class Controller {
	model = Model.getInstance();
	listePhotographsView = new ListePhotographsView();

	async afficherListePhotographs() {
		const photographers = await this.model.getPhotographers();
		this.listePhotographsView.render(photographers);
	}

	async afficherPhotograph(id) {
		const photograph = await this.model.getPhotographById(id);
		this.listePhotographsView.headerPhotograph(photograph);
	}

	async afficherNomPhotograph(id) {
		const photograph = await this.model.getPhotographById(id);
		return photograph.getName;
	}

	// Async getMediaFactory(id, position) {
	//     const photograph = await this.model.getPhotographById(id);
	//     const listeMediasView = new ListeMediasView(photograph, null);
	//     const mediaResult = await listeMediasView.getMediaFactory(position);
	//     return mediaResult;
	// }

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
	}

	chargerListeTri(id) {
		const listeTri = new TriView();
		listeTri.construireListeTri();
		const maliste = document.querySelector('.listeTri');
		const liElements = document.querySelectorAll('.listeTri li');

		maliste.addEventListener('click', () => {
			listeTri.cacherAfficherListeTri();
		});
		for (let i = 2; i < liElements.length; i+=2) {
			liElements[i].addEventListener('click', () => {
				this.afficherListeMedias(id, listeTri.genererFonction(liElements[i]));
				listeTri.choisirTri(i);
			});
		}

		addEventListener('keydown', event => {
			if (event.key === 'ArrowUp') {
				event.preventDefault();
				listeTri.choisirTri(null, 'up');
			} else if (event.key === 'ArrowDown') {
				event.preventDefault();
				listeTri.choisirTri(null, 'down');
			} else if (event.key === 'Enter') {
				event.preventDefault();
				this.afficherListeMedias(id, listeTri.genererFonction(null));
			}
		});
	}

	afficherModalContact(sousModal, photographId) {
		const monModal = new ModalContact(sousModal, photographId);
		monModal.chargerModal();
	}

	static async afficherModalLightBox(photograph, medias, position) {
		const monModal = new ModalLightBox(photograph, medias, position);
		monModal.afficherLightBox();
	}
}
export default Controller;
