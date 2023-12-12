class Modal {
	constructor(modal, btnOuvrir, btnfermer) {
		this.modal = document.querySelector(modal);
		this.body = document.querySelector('body');
		if (btnOuvrir !== null) {
			this.btnOuvrir = document.querySelector(btnOuvrir);
			this.btnOuvrir.addEventListener('keydown', event => {
				if (event.key === 'Escape') {
					this.fermerModal();
				}
			});
		}
		this.btnfermer = document.querySelector(btnfermer);
		this.btnfermer.addEventListener('click', this.fermerModal.bind(this));
	}

	get getModal() {
		return this.modal;
	}

	ouvrirModal() {
		if (this.modal.classList.contains('contact_modal')) {
			this.ouvrirContactModal();
		} else if (this.modal.classList.contains('lightBox')) {
			this.modal.style.display = 'block';
			this.body.classList.add('bodydesactive');
		}
		this.modal.setAttribute('tabindex', '0');
	}

	fermerModal() {
		this.modal.style.display = 'none';
		document.querySelector('main').classList.remove('peuVisible');
		document.querySelector('main').removeAttribute('tabindex');
		this.body.classList.remove('bodydesactive');
	}

	ouvrirContactModal() {
		this.btnOuvrir.addEventListener('click', () => {
			this.modal.style.display = 'block';
			document.querySelector('main').classList.add('peuVisible');
			document.querySelector('main').setAttribute('tabindex', '-1');
			this.body.classList.add('bodydesactive');
		});
		this.btnOuvrir.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				this.modal.style.display = 'block';
				document.querySelector('main').classList.add('peuVisible');
				this.body.classList.add('bodydesactive');
			}
			event.stopPropagation();
		});
	}
}
export default Modal;
