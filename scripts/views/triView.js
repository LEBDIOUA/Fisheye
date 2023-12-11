class TriView {
	constructor() {
		this.position = 0;
	}

	construireListeTri() {
		const main = document.querySelector('main');
		const content = `
        <section class='triSection'>
            <p class='tri'>Trier par : </p>
            <ul class = 'listeTri' role="listbox" tabindex='0'>
                <li role='option' id='populaire' name='popularite'>
					Popularité
					<i class='fa-solid fa-chevron-down iconTri'></i>
				</li>
				<li role='separateur' id='1' class="liCache"></li>
                <li role='option' id='date' name='date' class="liCache">Date</li>
				<li role='separateur' id='2' class="liCache"></li>
                <li role='option' id='titre' name='titre' class="liCache">Titre</li>
            </ul>
        </section>`;
		main.innerHTML += content;
	}

	genererFonction(element) {
		if (element === null) {
			const liElements = document.querySelectorAll('.listeTri li');
			element = liElements[0];
		}

		let fonction;
		switch (element.textContent) {
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
				if (index > 0) {
					// Changer l'icone
					icon.classList.remove('fa-chevron-down');
					icon.classList.add('fa-chevron-up');
				}
			} else if (element.classList.contains('liNonCache')  && (index > 0)) {
				element.classList.remove('liNonCache');
				element.classList.add('liCache');
				if (index > 0) {
					// Changer l'icone
					icon.classList.remove('fa-chevron-up');
					icon.classList.add('fa-chevron-down');
				}
			}
		});
	}

	// Changer le premier Texte de la liste
	choisirTri(index, direction) {
		const liElements = document.querySelectorAll('.listeTri li');
		const icon = document.querySelector('.fa-solid ');

		if (index !== null && index > 0 &&  index % 2 === 0) {
			const tempContent = liElements[index].textContent;
			const tempId = liElements[index].getAttribute('id');
			const tempName = liElements[index].getAttribute('name');
			liElements[0].removeChild(icon);

			for (let i = index; i > 0; i-=2) {
				if (i >= 2) {
					liElements[i].textContent = liElements[i - 2].textContent;
					liElements[i].setAttribute('id', liElements[i - 2].getAttribute('id'));
					liElements[i].setAttribute('name', liElements[i - 2].getAttribute('name'));
				}
			}

			liElements[0].textContent = tempContent;
			liElements[0].innerHTML += '<i class=\'fa-solid fa-chevron-down iconTri\'></i>'
			liElements[0].setAttribute('id', tempId);
			liElements[0].setAttribute('name', tempName);
		}

		else if (index === null) {
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
			this.choisirTri(this.position);
		}
		
	}
}
export default TriView;
