
class Photographer {
	constructor(photograph) {
		this.id = photograph.id;
		this.name = photograph.name;
		this.city = photograph.city;
		this.country = photograph.country;
		this.tagline = photograph.tagline;
		this.price = photograph.price;
		this.portrait = photograph.portrait;
	}

	get getId() {
		return this.id;
	}

	get getName() {
		return this.name;
	}

	get getFirstNamePhotograph() {
		let firstName = '';
		let i = 0;
		let trouv = false;

		while (trouv === false) {
			if (this.getName[i] === ' ') {
				trouv = true;
			} else {
				firstName += this.getName[i];
				i++;
			}
		}

		return firstName;
	}

	get getAdresse() {
		return this.city + ', ' + this.country;
	}

	get getTagline() {
		return this.tagline;
	}

	get getPrice() {
		return this.price + '€';
	}

	get getPortrait() {
		return this.portrait;
	}
}
export default Photographer;
