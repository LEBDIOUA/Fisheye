import Modal from './modal.js';

class ModalLightBox{
	static  ecouteurEscapeAjoute = false;

	constructor(photograph, listeMedias, position) {
		ModalLightBox.construireLightBox();
		this.body = document.querySelector('body');
		this.main = document.querySelector('main');
		this.modal = document.querySelector('.lightBox');
		this.photograph = photograph;
		this.listeMedias = listeMedias;
		this.position = position;
		this.btnPrecedent = document.querySelector('.precedent');
		this.btnSuivant = document.querySelector('.suivant');
		this.btnFermer = document.querySelector('.fermerLightBox');
	}

	static construireLightBox() {
		// Supprimer lightbox s'il existe
		const body = document.querySelector('body');
		const modal = body.querySelector('.lightBox');
		if (modal) {
			body.removeChild(modal);
		}
		//Construire lightBox
		const lbContent = document.createElement('div');
		lbContent.classList = 'lightBox';
		lbContent.innerHTML = `
				<div class = 'fermerLightBox' tabindex = '0' role= 'button' aria-label = 'Cliquez ou appuyez pour fermer le lightBox'><i class='fa-solid fa-xmark'></i></div>
				<div class = 'precedent' tabindex = '0' role= 'button' aria-label = 'Cliquez ou appuyez pour afficher le média précedente'><i class='fa-solid fa-angle-left active'></i></div>
				<div class='lightBoxContent'>
				</div>
				<h2 class = 'titre' tabindex = '0'></h2>
				<div class = 'suivant' tabindex = '0' role= 'button' aria-label = 'Cliquez ou appuyez pour afficher le média suivante'><i class='fa-solid fa-chevron-right active'></i></div>
        `;
		body.appendChild(lbContent);
	}

	chargerLigthBox() {
		const lightBoxContent = this.modal.querySelector('.lightBoxContent');
		const titre = this.modal.querySelector('.titre');
		titre.textContent = this.listeMedias[this.position].getTitre;
		titre.removeAttribute('aria-label');
		titre.setAttribute('aria-label', 'Le titre de média. '+this.listeMedias[this.position].getTitre);
		lightBoxContent.innerHTML = this.listeMedias[this.position].getMediaFactory(this.photograph);
		if(this.listeMedias[this.position].getMediaFactory(this.photograph).includes('video')){
			// const maVideo = lightBoxContent.querySelector('video');
			// maVideo.setAttribute('controls', '');
			lightBoxContent.innerHTML += `
			<div class = 'controls'>
				<button aria-label="Lecture/Pause, Cliquez ou appuyez sur la touche Entrée pour lire la vidéo" class = 'lirePause'><i class="fa-solid fa-play"></i><i class="fa-solid fa-pause"></i></button>
				<button aria-label="Stop. Cliquez ou appuyez sur la touche Entrée pour arrêter la vidéo" class = 'arreter'><i class="fa-solid fa-stop"></i></button>
				<button aria-label="Volume. Appuyez sur les touches fléchées haut et bas du clavier pour ajuster le son de la vidéo." class = 'volume'><i class="fa-solid fa-volume-high"></i></button>
			</div>`;
			this.controlerVideo();
			lightBoxContent.style.height = 'auto';
		}
		else {
			lightBoxContent.style.height = '100%';
		}
		lightBoxContent.querySelector('.media').removeAttribute('aria-label');
		lightBoxContent.querySelector('.media').setAttribute('aria-label', 'Média '+ this.listeMedias[this.position].getTitre);
		lightBoxContent.querySelector('.media').setAttribute('data-position', this.position);
		lightBoxContent.querySelector('.media').setAttribute('aria-hidden', 'false');
		lightBoxContent.querySelector('.media').setAttribute('tabindex', '0');
	}
	
	ouvrirModal(){
		this.modal.style.display = 'grid';
		this.body.classList.add('bodydesactive');
		this.main.setAttribute('tabindex', '-1');
		this.main.setAttribute('aria-hidden', 'true');

		if (this.modal.querySelector('video')) {
			this.modal.querySelector('.media').focus();
		}
		else {
			this.btnPrecedent.focus();
		}
	}

	afficherLightBox() {
		this.ouvrirModal();
		this.chargerLigthBox();
		console.log(this.position)
		if (this.position === 0) {
			this.changerEtatBtnPrecedent('desactiver');
		} else if (this.position === this.listeMedias.length - 1) {
			this.changerEtatrBtnSuivant('desactiver');
		}

		this.ajouterEcouteurClics();
	}

	ajouterEcouteurClics(){
		this.ecouteurClicPrecedent();
		this.ecouteurClicSuivant();
		this.ecouteurClicFermer();
		this.ecouteurClicNaviguer();
	}

	controlerVideo(){
		this.modal.querySelector(".lirePause").addEventListener('click', this.lirePauseVideo.bind(this));
		this.modal.querySelector(".arreter").addEventListener('click', this.arreterVideo.bind(this));
		this.modal.querySelector(".volume").addEventListener('keydown', (event) => this.volumeVideo(event));
	}

	ecouteurClicPrecedent() {
		this.btnPrecedent.addEventListener('click', () => {
			if (!this.btnPrecedent.classList.contains('desactive')) {
				this.mediaPrecedent();
			}
		});
		this.btnPrecedent.addEventListener('keydown', event => {
			if ((!this.btnPrecedent.classList.contains('desactive')) && (event.key === 'Enter')) {
				this.mediaPrecedent();
			}
		});
	}

	ecouteurClicSuivant() {
		this.btnSuivant.addEventListener('click', () => {
			if (!this.btnSuivant.classList.contains('desactive')) {
				this.mediaSuivant();
			}
		});
		this.btnSuivant.addEventListener('keydown', event => {
			if ((!this.btnSuivant.classList.contains('desactive')) && (event.key === 'Enter')) {
				this.mediaSuivant();
			}
		});
	}

	ecouteurClicFermer() {
		this.btnFermer.addEventListener("click", () => {
			this.fermerModal();
		});
		
		addEventListener('keydown', event => {
			if (event.key === "Escape") {
			  this.fermerModal();
			}
		});

		this.btnFermer.addEventListener('keydown', event => {
			if (event.key === 'Enter') {
				this.fermerModal();
			}
		});
	}

	ecouteurClicNaviguer() {
		addEventListener('keydown', event => {
			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				if (!this.btnPrecedent.querySelector('.fa-solid').classList.contains('desactive')) {
					this.mediaPrecedent();
				}
			} else if (event.key === 'ArrowRight') {
				event.preventDefault();
				if (!this.btnSuivant.querySelector('.fa-solid').classList.contains('desactive')) {
					this.mediaSuivant();
				}
			}
		});
	}

	changerEtatBtnPrecedent(etat) {
		if (etat === 'desactiver') {
			this.btnPrecedent.querySelector('.fa-solid').classList.add('desactive');
			this.btnPrecedent.querySelector('.fa-solid').classList.remove('active');
			this.btnPrecedent.removeAttribute('aria-label');
			this.btnPrecedent.setAttribute('aria-label', 'C\'est le premier média');
		}
		else if(etat === 'activer') {
			this.btnPrecedent.querySelector('.fa-solid').classList.add('active');
			this.btnPrecedent.querySelector('.fa-solid').classList.remove('desactive');
			this.btnPrecedent.removeAttribute('aria-label');
			this.btnPrecedent.setAttribute('aria-label', 'Cliquez ou appuyez pour afficher le média précedente');
		}
	}

	changerEtatrBtnSuivant(etat) {
		if (etat === 'desactiver') {
			this.btnSuivant.querySelector('.fa-solid').classList.add('desactive');
			this.btnSuivant.querySelector('.fa-solid').classList.remove('active');
			this.btnSuivant.removeAttribute('aria-label');
			this.btnSuivant.setAttribute('aria-label', 'C\'est le dernier média');
		}
		else if (etat === 'activer'){			
			this.btnSuivant.querySelector('.fa-solid').classList.add('active');
			this.btnSuivant.querySelector('.fa-solid').classList.remove('desactive');
			this.btnSuivant.removeAttribute('aria-label');
			this.btnSuivant.setAttribute('aria-label', 'Cliquez ou appuyez pour afficher le média suivante');
		}
		
	}

	mediaPrecedent() {
		if( this.position > 0){
			this.position -= 1;
			this.chargerLigthBox();
		}
		if (this.position === 0) {
			this.changerEtatBtnPrecedent('desactiver');
		} else if (this.position === this.listeMedias.length - 2) {
			this.changerEtatrBtnSuivant('activer');
		}
	}

	mediaSuivant() {
		if( this.position < this.listeMedias.length - 1){
			this.position += 1;
			this.chargerLigthBox();
		}
		if (this.position === 1) {
			this.changerEtatBtnPrecedent('activer');
		} else if (this.position === this.listeMedias.length - 1) {
			this.changerEtatrBtnSuivant('desactiver')
		}
	}

	ecouteurClicFermer() {
		this.btnFermer.addEventListener("click", () => {
			this.fermerModal();
		});

		addEventListener("keydown", event => {
			if (event.key === 'Escape') {
				this.fermerModal();
			}
		});

		this.btnFermer.addEventListener('keydown', event => {
			if (event.key === 'Enter') {
				this.fermerModal();
			}
		});
	}

	fermerModal() {
		if (this.modal.parentNode) {
			this.modal.parentNode.removeChild(this.modal);
		}
		this.main.classList.remove('peuVisible');
		this.main.removeAttribute('tabindex');
		this.main.removeAttribute('aria-hidden');
		this.body.classList.remove('bodydesactive');

		let position = 0;
		if (this.modal.querySelector('.media')) {
			position = this.modal.querySelector('.media').getAttribute('data-position');
		}
		this.main.querySelectorAll('.media')[position].focus();
	}

	lirePauseVideo(){
		const video = this.modal.querySelector("video");
		const btn = this.modal.querySelector(".lirePause");
		if (video.paused || video.ended) {
			video.play();
			btn.removeAttribute('aria-label');
			btn.setAttribute('aria-label', 'Lecture/Pause, Cliquez ou appuyez sur la touche Entrée pour mettre en pause la vidéo');
		} else {
			video.pause();
			btn.removeAttribute('aria-label');
			btn.setAttribute('aria-label', 'Lecture/Pause, Cliquez ou appuyez sur la touche Entrée pour lire la vidéo');
		}
	}

	arreterVideo(){
		const video = this.modal.querySelector("video");
		video.pause();
  		video.currentTime = 0;
	}

	volumeVideo(event){
		const video = this.modal.querySelector("video");
		const btn = this.modal.querySelector(".volume");
			if (event.key === 'ArrowDown') {
				if(video.volume > 0){
					video.volume -= 0.25;
				}
			}
			else if (event.key === 'ArrowUp') {
				if(video.volume < 1){
					video.volume += 0.25;
				}
			}
			btn.removeChild(btn.querySelector('i'));
			btn.innerHTML = this.getEtatSonIcon(video.volume);
	}

	getEtatSonIcon(son) {
		let icon;
		if(son === 0){
			icon = '<i class="fa-solid fa-volume-xmark"></i>';
		}
		else if(son > 0 && son < 0.75){
			icon = '<i class="fa-solid fa-volume-low"></i>';
		}
		else if(son >= 0.75){
			icon = '<i class="fa-solid fa-volume-high"></i>';
		}	
		return icon;
	}
}

export default ModalLightBox;
