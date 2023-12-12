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
			code += `<img src = '../assets/images/${photograph.getFirstNamePhotograph}/${this.getContent}' alt = '${this.getTitre}' class = 'media'  tabindex = '0' data-id = '${this.getId}'  data-photographId = '${this.getPhotographId}'/>`;
		} else if (this.isVideo === true) {
			code += `<video class = 'media' data-id = '${this.getId}' data-photographId = '${this.getPhotographId}'> <source src = '../assets/images/${photograph.getFirstNamePhotograph}/${this.getContent}' type = 'video/mp4'  tabindex = '0'> </video>`;
		}

		return code;
	}
}
export default Media;
