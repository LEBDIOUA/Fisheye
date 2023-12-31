class ListePhotographsView {
	construirePhotographArticle(photograph) {
		const content = `
            <article>
                <a class = 'articleLien' href = './pages/photographer.html?id= ${photograph.getId}' aria-label = 'Photographe ${photograph.getName} , cliquez ou appuyez sur la touche Entrée pour voir sa galerie'>
                    <img class = 'photoPhotograph' src = './assets/images/PhotographersIDPhotos/${photograph.getPortrait}' alt = '${photograph.getName}' title = 'Photo de ${photograph.getName}'>
                    <h2 class = 'nomPhotograph'>${photograph.getName}</h2>
                </a>
                <h3 class = 'adrPhotograph' aria-label = 'Ce photographe habite à ${photograph.getAdresse}' tabindex = '0'>${photograph.getAdresse}</h3>
                <p class = 'slogan' aria-label = 'Sa description ${photograph.getTagline}' tabindex = '0'>${photograph.getTagline}</p>
                <p class = 'prix' aria-label = 'Le prix demandé est ${photograph.getPrice} par jour' tabindex = '0'>${photograph.getPrice}/jour</p>
            </article>`;
		return content;
	}

	construirePhotographEntete(photograph) {
		const header = document.querySelector(".photograph-header");
		const photographDetail = document.createElement("div");
		const nomPhotograph = document.createElement("h2");
		const photographInfo = document.createElement("div");
		const adresse = document.createElement("h3");
		const slogan = document.createElement("p");
		const photo = document.createElement("img");

		nomPhotograph.textContent = photograph.getName;
		adresse.textContent = photograph.getAdresse;
		slogan.textContent = photograph.getTagline;

		photo.setAttribute("src", "../assets/images/PhotographersIDPhotos/" + photograph.getPortrait);
		photo.setAttribute("alt", photograph.getName);
		photo.setAttribute("title", "Photo de " + photograph.getName);
		photo.setAttribute("class", "photoPhotograph");
		nomPhotograph.setAttribute("class", "nomPhotograph");
		nomPhotograph.setAttribute("aria-label", "Le ou la photographe s'appelle " + photograph.getName);
		nomPhotograph.setAttribute("tabindex", "0");
		adresse.setAttribute("class", "adrPhotograph");
		adresse.setAttribute("aria-label", "habite à " + photograph.getAdresse);
		adresse.setAttribute("tabindex", "0");
		slogan.setAttribute("class", "slogan");
		slogan.setAttribute("aria-label", "Son slogan est " + photograph.getTagline);
		slogan.setAttribute("tabindex", "0");

		photographInfo.appendChild(adresse);
		photographInfo.appendChild(slogan);

		photographDetail.appendChild(nomPhotograph);
		photographDetail.appendChild(photographInfo);

		header.prepend(photographDetail);
		header.appendChild(photo);
	}

	async render(listePhotographs) {
		const photographSection = document.querySelector("main");

		for (let i = 0; i < listePhotographs.length; i++) {
			photographSection.innerHTML += this.construirePhotographArticle(listePhotographs[i]);
		}
	}
}
export default ListePhotographsView;
