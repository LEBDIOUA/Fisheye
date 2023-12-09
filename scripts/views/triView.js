class TriView {
	constructor() {
		this.position = 0;
	}

	construireListeTri() {
		const main = document.querySelector('main');
		const content = `
        <section class='triSection'>
            <p class='tri'>Trier par : </p>
            <ul class = 'listeTri'>
                <li id='element1' name='popularite'><p id='val'>Popularité</p><i class='fa-solid fa-chevron-down iconTri'></i></li>
                <li id='element2' name='date'><hr/>Date</li>
                <li id='element3' name='titre'><hr/>Titre</li>
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
			// Tester si mes éléments de la liste sans cacher ou non aprés chaque clic index === 1 || index ===2
			if (window.getComputedStyle(element).getPropertyValue('display') === 'none' && (index > 0)) {
				element.style.display = 'block';
				if (index > 0) {
					// Changer l'icone
					icon.classList.remove('fa-chevron-down');
					icon.classList.add('fa-chevron-up');
				}
			} else if (window.getComputedStyle(element).getPropertyValue('display') === 'block' && (index > 0)) {
				if (index > 0) {
					element.style.display = 'none';
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
		const element1 = document.querySelector('#val');

		if (index > 0 && index !== null) {
			const temp = liElements[index].textContent;
			for (let i = index; i > 0; i--) {
				if (i > 1) {
					liElements[i].innerHTML = '<hr/>' + liElements[i - 1].textContent;
				} else if (i === 1) {
					liElements[i].innerHTML = '<hr/>' + element1.textContent;
				}
			}

			element1.textContent = temp;
		} else if (index === null) {
			if (direction === 'up') {
				if (this.position > 0) {
					this.position -= 1;
				} else if (this.position === 0) {
					this.position = liElements.length - 1;
				}
			}

			if (direction === 'down') {
				if (this.position < liElements.length - 1) {
					this.position += 1;
				} else if (this.position === liElements.length - 1) {
					this.position = 0;
				}
			}

			// Console.log(this.position)
			this.choisirTri(this.position);
		}
	}
}
export default TriView;
