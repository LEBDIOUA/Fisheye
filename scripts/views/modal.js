class Modal {
	constructor(modal, btnOuvrir, btnfermer) {
		this.modal = document.querySelector(modal);
		this.body = document.querySelector('body');
		if (btnOuvrir !== null) {
			this.btnOuvrir = document.querySelector(btnOuvrir);
		}
		this.btnfermer = document.querySelector(btnfermer);
		this.btnfermer.addEventListener('click', this.fermerModal.bind(this));		
	}

	get getModal() {
		return this.modal;
	}

	ouvrirModal() {
		document.addEventListener('keydown', event => {
			if (event.key === 'Escape') {
				this.fermerModal();
			}
		});
		if (this.modal.classList.contains('contact_modal')) {
			this.ouvrirContactModal();
		} else if (this.modal.classList.contains('lightBox')) {
			this.ouvrirLightBoxModal();
		}
	}

	fermerModal() {
		console.log(this.modal)

		this.modal.style.display = 'none';
		document.querySelector('main').classList.remove('peuVisible');
		document.querySelector('main').removeAttribute('tabindex');
		document.querySelector('main').removeAttribute('aria-hidden');
		this.body.classList.remove('bodydesactive');

		if (this.modal.classList.contains("lightBox")) {
			let position = 0;
			if (this.modal.querySelector('.media')) {
				position = this.modal.querySelector('.media').getAttribute('data-position');
			}
			document.querySelector('main').querySelectorAll('.media')[position].focus();
		}
		else if (this.modal.classList.contains("contact_modal")) {
			document.querySelector('main').querySelector('.contact_button').focus();
		}
	}

	

	ouvrirLightBoxModal(){
		this.modal.style.display = 'block';
			this.body.classList.add('bodydesactive');

			document.querySelector('main').setAttribute('tabindex', '-1');
			document.querySelector('main').setAttribute('aria-hidden', 'true');
			if (this.modal.querySelector('video')) {
				this.modal.querySelector('.media').focus();
			}
			else if (this.modal.querySelector('.precedent')) {
				this.modal.querySelector('.precedent').focus();
			}
	}
}
export default Modal;
