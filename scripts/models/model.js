import Photographer from './photographer.js';
import Media from './media.js';
class Model {
	static instance = null;

	static getInstance() {
		if (this.instance === null) {
			this.instance = new Model();
		}

		return (this.instance);
	}

	get(url) {
		return fetch(url)
			.then(httpBodyResponse => {
				// HttpBodyResponse contient la réponse dans son entièreté, avec le header & le reste.
				// Du coup, avec .json, on réccupère la partie 'json' de la réponse, qui est ce dont
				// on a réellement besoin.
				const response = httpBodyResponse.json();
				return response;
			})
			.catch(error => {
				// Gestion basique des erreurs.
				console.log('Une erreur s\'est produite :');
				console.log(error);
			});
	}

	async getData() {
		const url = '../data/photographers.json';
		const linkExists = await this.verifierLien(url);

		if (linkExists) {
			this.data = await this.get(url);
		} else {
			this.data = await this.get('/Fisheye/data/photographers.json');
		}

		return this.data;
	}

	async verifierLien(url) {
		try {
			const response = await fetch(url);
			return response.ok;
		} catch (error) {
			console.error('Erreur lors de la vérification du lien :', error);
			return false;
		}
	}

	async getPhotographers() {
		const data = await this.getData();
		const listPhotographers = [];

		for (let i = 0; i < data.photographers.length; i++) {
			listPhotographers.push(new Photographer(data.photographers[i]));
		}

		return listPhotographers;
	}

	async getPhotographById(id) {
		const data = await this.getData();
		let photograph;
		let i = 0;
		let trouv = false;

		do {
			if (parseInt(id, 10) === parseInt(data.photographers[i].id, 10)) {
				photograph = new Photographer(data.photographers[i]);
				trouv = true;
			} else {
				i++;
			}
		} while (i < data.photographers.length && trouv === false);

		return photograph;
	}

	async getFirstNamePhotograph(id) {
		const photograph = await this.getPhotographById(id);
		let trouv = false;
		let firstName = '';
		let i = 0;

		while (trouv === false) {
			if (photograph.getName[i] === ' ') {
				trouv = true;
			} else {
				firstName += photograph.getName[i];
				i++;
			}
		}

		return firstName;
	}

	async getMedias(photographId) {
		const data = await this.getData();
		const listMedia = [];
		for (let i = 0; i < data.media.length; i++) {
			if (parseInt(data.media[i].photographerId, 10) === parseInt(photographId, 10)) {
				listMedia.push(new Media(data.media[i]));
			}
		}

		return listMedia;
	}

	async getMediasByTitle(photographId) {
		const data = await this.getMedias(photographId);
		/* Let temp;
		let trouv;
		do {
			trouv = false;
			for (let i = 1; i < data.length; i++) {
				if (data[i].getTitre < data[i - 1].getTitre) {
					temp = data[i];
					data[i] = data[i - 1];
					data[i - 1] = temp;
					trouv = true;
				}
			}
		} while (trouv === true); */

		data.sort((a, b) => a.getTitre.localeCompare(b.getTitre));
		return data;
	}

	async getMediasByDate(photographId) {
		const data = await this.getMedias(photographId);

		let temp;
		let trouv;
		do {
			trouv = false;
			for (let i = 1; i < data.length; i++) {
				if (data[i].getDate > data[i - 1].getDate) {
					temp = data[i];
					data[i] = data[i - 1];
					data[i - 1] = temp;
					trouv = true;
				}
			}
		} while (trouv === true);

		return data;
	}

	async getMediasByLikes(photographId) {
		const data = await this.getMedias(photographId);
		let temp;
		let trouv;
		do {
			trouv = false;
			for (let i = 1; i < data.length; i++) {
				if (data[i].getLikes > data[i - 1].getLikes) {
					temp = data[i];
					data[i] = data[i - 1];
					data[i - 1] = temp;
					trouv = true;
				}
			}
		} while (trouv === true);

		// Data.sort(function (a, b) {
		// 	return b.getLikes - a.getLikes;
		// });
		return data;
	}
}
export default Model;
