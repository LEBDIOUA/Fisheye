
class ListeMediasView {
	constructor(photograph, medias) {
		this.sommeLikes = 0;
		this.photograph = photograph;
		this.listeMedias = medias;
	}

	afficherMedia(position) {
		const media = this.listeMedias[position];
		let content = '<article>';
		content += media.getMediaFactory(this.photograph);
		content += `
            <div class='mediaInfo'>
                <h2 class='titreMedia'>${media.getTitre}</h2>
                <p class= 'infoLike' tabindex = '0' aria-label = 'Ce média a été apprécié ${this.listeMedias[position].getLikes} fois. 
				Cliquez ou appuyez sur la touche Entrée pour ajouter un like'>${media.getLikes} <i class='fa-solid fa-heart'></i></p>
            </div></article>`;

		this.sommeLikes += media.getLikes;
		return content;
	}

	async render() {
		this.sommeLikes = 0;

		// Supprimer la section dont la classe .mediaSection s'il existe
		const main = document.querySelector('main');
		const oldMediaSection = main.querySelector('.mediaSection');
		if (oldMediaSection) {
			main.removeChild(oldMediaSection);
		}

		// Creer une section et la remplir avec les medias
		const newMediaSection = document.createElement('section');
		newMediaSection.setAttribute('class', 'mediaSection');
		for (let i = 0; i < this.listeMedias.length; i++) {
			newMediaSection.innerHTML += this.afficherMedia(i);
		}
		main.appendChild(newMediaSection);
		
		this.afficherTotal(main);
		this.aimerMedia(main);

		const media = main.querySelectorAll('.media');
		for (let i = 0; i < media.length - 1; i++) {
			media[i].setAttribute('tabindex', '0');
		}
	}

	afficherTotal(main) {
		const total = main.querySelector('.total');
		const newTotal = document.createElement('div');

		if (total) {
			main.removeChild(total);
		}

		newTotal.setAttribute('class', 'total');
		newTotal.innerHTML = `
            <p tabindex = '0' aria-label = 'Tous les médias ont été appréciés ${this.sommeLikes} fois'>${this.sommeLikes} <i class='fa-solid fa-heart'></i></p>
            <p tabindex = '0' aria-label = 'Le prix demandé est ${this.photograph.getPrice} par jour'>${this.photograph.getPrice}/jour</p>
        `;

		main.appendChild(newTotal);
	}

	// Aimer un media en augmentant le nombre de like à 1
	aimerMedia(main) {
		const infoLike = document.querySelectorAll('.infoLike');
		infoLike.forEach((Element, index) => {
			Element.addEventListener('click', () => {
					this.listeMedias[index].ajouterLike();
					this.majMedia(index);
					this.initialiserBtnLikes(index);
			});
			Element.addEventListener('keydown', (event) => {
				if (event.key === 'Enter'){
					this.listeMedias[index].ajouterLike();
					this.majMedia(index);
					this.initialiserBtnLikes(index);
				}
			});
		});
	}

	initialiserBtnLikes(position) {
		const infoLike = document.querySelectorAll('.infoLike');
		infoLike[position].classList.add('liked');
	}

	majMedia(position){
		const mediaInfo = document.querySelectorAll(".mediaInfo")[position];
		const nbLikes = mediaInfo.querySelector("p");
		const remplacerPar = `
			<p class= 'infoLike'- tabindex = '0' 
			aria-label = 'Ce média a été apprécié ${this.listeMedias[position].getLikes} fois. 
			Cliquez ou appuyez sur la touche Entrée pour ajouter un like'>
				${this.listeMedias[position].getLikes} <i class='fa-solid fa-heart'></i>
			</p>`;
		mediaInfo.removeChild(nbLikes);
		mediaInfo.innerHTML += remplacerPar;
		nbLikes.innerHTML = remplacerPar;
		this.sommeLikes++;
		this.afficherTotal(main);
	}
}

export default ListeMediasView;
