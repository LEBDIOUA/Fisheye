
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
                <p>${media.getLikes} <i class='fa-solid fa-heart btnLike'></i></p>
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

		this.aimerMedia(main);
	}

	afficherTotal(main) {
		const total = main.querySelector('.total');
		const newTotal = document.createElement('div');

		if (total) {
			main.removeChild(total);
		}

		newTotal.setAttribute('class', 'total');
		newTotal.innerHTML = `
            <p>${this.sommeLikes} <i class='fa-solid fa-heart'></i></p>
            <p>${this.photograph.getPrice}</p>
        `;

		main.appendChild(newTotal);
	}

	// Aimer un media en augmentant le nombre de like à 1
	aimerMedia(main) {
		this.afficherTotal(main);

		const btnLike = document.querySelectorAll('.btnLike');
		for (let i = 0; i < this.listeMedias.length; i++) {
			btnLike[i].addEventListener('click', () => {
				if (!btnLike[i].classList.contains('liked')) {
					this.listeMedias[i].ajouterLike();
					this.render();
					this.initialiserBtnLikes(i);
				}
			});
		}
	}

	initialiserBtnLikes(i) {
		const btnLike = document.querySelectorAll('.btnLike');
		btnLike[i].classList.add('liked');
	}
}

export default ListeMediasView;
