import Modal from './modal.js';

class ModalLightBox extends Modal {
	constructor(photograph, listeMedias, position) {
		ModalLightBox.construireLightBox();
		super('.lightBox', null, '.fermerLightBox');
		this.photograph = photograph;
		this.listeMedias = listeMedias;
		this.position = position;
		this.main = document.querySelector('main');
		this.precedent = document.querySelector('.precedent');
		this.suivant = document.querySelector('.suivant');

		// This.listeMedias.forEach((element, index)=> {
		//     console.log(element, media)
		//     if(element === media){
		//         this.position = index;
		//     }
		// });
	}

	static construireLightBox() {
		// Supprimer lightbox s'il existe
		const main = document.querySelector('main');
		const modal = main.querySelector('.lightBox');
		if (modal) {
			main.removeChild(modal);
		}

		const lbContent = document.createElement('div');
		lbContent.classList = 'lightBox';
		lbContent.innerHTML = `
                <div class='maGrid'>
                    <i class='fa-solid fa-xmark fermerLightBox'></i>
                    <i class='fa-solid fa-angle-left precedent active'></i>
                    <div class='lightBoxContent'>
                    </div>
                    <h2></h2>
                    <i class='fa-solid fa-chevron-right suivant active'></i>
                </div>
        `;
		main.appendChild(lbContent);
	}

	afficherLightBox() {
		// Charger lightBox
		this.chargerLigthBox();
		this.ouvrirModal();

		if (this.position === 0) {
			this.precedent.classList.add('desactive');
			this.precedent.classList.remove('active');
		} else if (this.position === this.listeMedias.length - 1) {
			this.suivant.classList.add('desactive');
			this.suivant.classList.remove('active');
		}

		// Programmer clic de suivant et precedent
		this.precedent.addEventListener('click', () => {
			if (!this.precedent.classList.contains('desactive')) {
				this.mediaPrecedent();
			}
		});

		this.suivant.addEventListener('click', () => {
			if (!this.suivant.classList.contains('desactive')) {
				this.mediaSuivant();
			}
		});

		addEventListener('keydown', event => {
			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				if (!this.precedent.classList.contains('desactive')) {
					this.mediaPrecedent();
				}
			} else if (event.key === 'ArrowRight') {
				event.preventDefault();
				if (!this.suivant.classList.contains('desactive')) {
					this.mediaSuivant();
				}
			}
		});
	}

	chargerLigthBox() {
		const modal = document.querySelector('.lightBox');
		// Const lightBoxContent = modal.querySelector('.lightBoxContent');
		const titre = modal.querySelector('h2');

		console.log(this.listeMedias[this.position]);
		console.log(this.listeMedias[this.position].getMediaFactory(this.photograph));

		titre.textContent = this.listeMedias[this.position].getTitre;
		// LightBoxContent.innerHTML = this.listeMedias[this.position].getMediaFactory(this.photograph);
	}

	mediaPrecedent() {
		this.position -= 1;
		this.chargerLigthBox();

		if (this.position === 0) {
			this.precedent.classList.add('desactive');
			this.precedent.classList.remove('active');
		} else if (this.position === this.listeMedias.length - 2) {
			this.suivant.classList.add('active');
			this.suivant.classList.remove('desactive');
		}
	}

	mediaSuivant() {
		this.position += 1;
		this.chargerLigthBox();

		if (this.position === 1) {
			this.precedent.classList.add('active');
			this.precedent.classList.remove('desactive');
		} else if (this.position === this.listeMedias.length - 1) {
			this.suivant.classList.add('desactive');
			this.suivant.classList.remove('active');
		}
	}
}

export default ModalLightBox;
