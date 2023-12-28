class Media {
	constructor(data) {
		this.id = data.id;
		this.photographerId = data.photographerId;
		this.title = data.title;
		this.likes = data.likes;
		this.date = data.date;
		this.price = data.price;

		if ('image' in data) {
			this.content = data.image;
			this.isVideo = false;
		} else if ('video' in data) {
			this.content = data.video;
			this.isVideo = true;
		}
	}

	get getId() {
		return this.id;
	}

	get getPhotographId() {
		return this.photographerId;
	}

	get getTitre() {
		return this.title;
	}

	get getContent() {
		return this.content;
	}

	get getDate() {
		return this.date;
	}

	get getLikes() {
		return this.likes;
	}

	get getisVideo() {
		return this.isVideo;
	}

	ajouterLike() {
		this.likes += 1;
	}

	getMediaFactory(photograph) {
		let code = '';
		if (this.isVideo === false) {
			code += `<img src = '../assets/images/${photograph.getFirstNamePhotograph}/${this.getContent}' title = 'Photo ${this.getTitre}' alt = 'alt: ${this.getTitre}' class = 'media' data-id = '${this.getId}' data-photographId = '${this.getPhotographId}' aria-label = 'Photo ${this.getTitre}. Cliquez ou appuyez sur la touche Entrée pour ouvrir le lightBox'/>`;
		} else if (this.isVideo === true) {
			code += `
			<video class = 'media' data-id = '${this.getId}' data-photographId = '${this.getPhotographId}' aria-label = 'Vidéo ${this.getTitre}. Cliquez ou appuyez sur la touche Entrée pour ouvrir le lightBox'> 
				<source src = '../assets/images/${photograph.getFirstNamePhotograph}/${this.getContent}' type = 'video/mp4'>
				Sorry, your browser doesn't support embedded videos.
			</video>
			`;
		}

		return code;
	}
}
export default Media;
