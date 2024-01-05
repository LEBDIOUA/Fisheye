class TriView {
	constructor() {
		this.position = 0;
	}

	construireListeTri() {
		const main = document.querySelector('main');
		const content = `
        <section class='triSection'>
            <h2 class='tri'>Trier par : </h2>
            <ul class = 'listeTri' role = 'listbox' tabindex = '0' aria-label='Liste contenant trois options. Cliquez ou appuyez sur la touche Entrée pour ouvrir la liste'>
                <li role = 'option' id = 'populaire' name = 'popularite' aria-label = 'Tri par popularité. Cliquez ou appuyez sur la touche Entrée pour trier la liste des medias par popularité'>
					Popularité
					<i class = 'fa-solid fa-chevron-down iconTri'></i>
				</li>
				<li role = 'separateur' id = '1' class = 'liCache' aria-hidden = 'true'></li>
                <li role = 'option' id = 'date' name = 'date' class = 'liCache' aria-label = 'Tri par date. Cliquez ou appuyez sur la touche Entrée pour trier la liste des medias par date'>Date</li>
				<li role = 'separateur' id = '2' class = 'liCache' aria-hidden = 'true'></li>
                <li role = 'option' id = 'titre' name = 'titre' class = 'liCache' aria-label = 'Tri par titre. Cliquez ou appuyez sur la touche Entrée pour trier la liste des medias par titre'>Titre</li>
            </ul>
        </section>`;
		main.innerHTML += content;
		const maListe = document.querySelector('.listeTri');

		maListe.addEventListener('click', () => {
			this.cacherAfficherListeTri();
		});
		maListe.addEventListener('keydown', event => {
			if (event.key === 'Enter') {
				this.cacherAfficherListeTri();
			}
		});
	}

	genererFonction() {
		const liElements = document.querySelectorAll('.listeTri li');
		const element = liElements[0].textContent.replace(/\s/g, '');
		let fonction;
		switch (element) {
			case 'Titre':
				fonction = 'getMediasByTitle';
				break;
			case 'Popularité':
				fonction = 'getMediasByLikes';
				break;
			case 'Date':
				fonction = 'getMediasByDate';
				break;
			default:
				fonction = 'getMedias';
				break;
		}

		return fonction;
	}

	cacherAfficherListeTri() {
		const liElements = document.querySelectorAll('.listeTri li');
		const icon = document.querySelector('.iconTri');
		liElements.forEach((element, index) => {
			// Tester si mes éléments de la liste sans cacher ou non aprés chaque clic
			if (element.classList.contains('liCache') && (index > 0)) {
				element.classList.remove('liCache');
				element.classList.add('liNonCache');
				element.setAttribute('tabindex', '0');
				icon.classList.remove('fa-chevron-down');
				icon.classList.add('fa-chevron-up');
			} else if (element.classList.contains('liNonCache') && (index > 0)) {
				element.classList.remove('liNonCache');
				element.classList.add('liCache');
				element.removeAttribute('tabindex');
				icon.classList.remove('fa-chevron-up');
				icon.classList.add('fa-chevron-down');
				document.querySelector('.listeTri').focus();
			}

			if (liElements[0].hasAttribute('tabindex')) {
				liElements[0].removeAttribute('tabindex');
			} else {
				liElements[0].setAttribute('tabindex', '0');
				liElements[0].focus();
			}
		});
	}

	// Changer le premier Texte de la liste
	deplacerEnHaut(index, direction) {
		const liElements = document.querySelectorAll('.listeTri li');
		const icon = document.querySelector('.fa-solid ');

		if (index !== null && index > 0 && index % 2 === 0) {
			const tempContent = liElements[index].textContent;
			const tempId = liElements[index].getAttribute('id');
			const tempName = liElements[index].getAttribute('name');
			liElements[0].removeChild(icon);

			for (let i = index; i > 0; i -= 2) {
				if (i >= 2) {
					liElements[i].textContent = liElements[i - 2].textContent;
					liElements[i].setAttribute('id', liElements[i - 2].getAttribute('id'));
					liElements[i].setAttribute('name', liElements[i - 2].getAttribute('name'));
				}
			}

			liElements[0].textContent = tempContent;
			liElements[0].innerHTML += '<i class=\'fa-solid fa-chevron-down iconTri\'></i>';
			liElements[0].setAttribute('id', tempId);
			liElements[0].setAttribute('name', tempName);
		} else if (index === null) {
			this.modifierPosition(direction);
			this.deplacerEnHaut(this.position);
		}
	}

	modifierPosition(direction) {
		const liElements = document.querySelectorAll('.listeTri li');
		if (direction === 'up') {
			if (this.position > 2) {
				this.position -= 2;
			} else {
				this.position = liElements.length - 1;
			}
		}

		if (direction === 'down') {
			if (this.position < liElements.length - 1) {
				this.position += 2;
			} else {
				this.position = 2;
			}
		}
	}
}
export default TriView;
