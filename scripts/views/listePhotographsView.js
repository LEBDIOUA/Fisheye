class ListePhotographsView {
	afficherPhotograph(photograph) {
		const content = `
            <article>
                <a class= "articleLien" href="./pages/photographer.html?id=${photograph.getId}">
                    <img class="photoPhotograph" src="./assets/images/PhotographersIDPhotos/${photograph.getPortrait}" alt= "Photo de ${photograph.getName}" >
                    <h2 class="nomPhotograph">${photograph.getName}</h2>
                </a>
                <h3 class="adrPhotograph">${photograph.getAdresse}</h3>
                <p class="slogan">${photograph.getTagline}</p>
                <p class="prix">${photograph.getPrice}</p>
            </article>`;
		return content;
	}

	headerPhotograph(photograph) {
		const header = document.querySelector(".photograph-header");
		const photographDetail = document.createElement("div");
		const nomPhotograph = document.createElement("h1");
		const photographInfo = document.createElement("div");
		const adresse = document.createElement("h2");
		const slogan = document.createElement("p");
		const photo = document.createElement("img");

		nomPhotograph.textContent = photograph.getName;
		adresse.textContent = photograph.getAdresse;
		slogan.textContent = photograph.getTagline;

		photo.setAttribute("src", "../assets/images/PhotographersIDPhotos/" + photograph.getPortrait);
		photo.setAttribute("alt", "Photo de " + photograph.getName);
		photo.setAttribute("class", "photoPhotograph");
		nomPhotograph.setAttribute("class", "nomPhotograph");
		adresse.setAttribute("class", "adrPhotograph");
		slogan.setAttribute("class", "slogan");

		photographInfo.appendChild(adresse);
		photographInfo.appendChild(slogan);

		photographDetail.appendChild(nomPhotograph);
		photographDetail.appendChild(photographInfo);

		header.prepend(photographDetail);
		header.appendChild(photo);
	}

	async render(listePhotographs) {
		const photographSection = document.querySelector(".photographer_section");

		for (let i = 0; i < listePhotographs.length; i++) {
			photographSection.innerHTML += this.afficherPhotograph(listePhotographs[i]);
		}
	}
}
export default ListePhotographsView;
