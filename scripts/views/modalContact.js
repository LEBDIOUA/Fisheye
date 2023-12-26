import Modal from './modal.js';

class ModalContact {
	constructor(id) {
		this.modal = document.querySelector('.contactModal');
		this.body = document.querySelector('body');
		this.btnOuvrir = document.querySelector('.ouvrirModal');
		this.btnfermer = document.querySelector('.fermerModal');
		this.form = document.querySelector('form');
		this.nomPhotograph = this.modal.querySelector('.nomPhotographCtc');
		this.photographId = id;
	}

	construireModal(nomPhotograph){
		const h2Element = this.modal.querySelectorAll('h2');
		h2Element[0].setAttribute('aria-hidden', 'false');
		const nom = document.createElement('h2');
		nom.setAttribute('class', 'nomPhotographCtc');
		nom.setAttribute('tabindex', '0');
		nom.textContent = nomPhotograph;
		this.modal.insertBefore(nom, this.form);

		const content = `
            <div>
                <label for='prenom'>Prénom</label>
                <input type='text' id='prenom' tabindex = '0'/>
            </div>
            <div>
                <label for='nom'>Nom</label>
                <input type='text' id='nom' tabindex = '0'/>
            </div>
            <div>
                <label for='email'>Email</label>
                <input type='email' id='email' tabindex = '0'/>
            </div>
            <div>
                <label for='msg'>Votre message</label>
                <textarea name='msg' id='msg' cols='30' rows='10' tabindex = '0'></textarea>
            </div>
            <button class='btnContact fermerModal envoyer' tabindex = '0'>Envoyer</button>
        `;
		this.form.innerHTML = content;
	}

	ouvrirModal() {

		this.btnOuvrir.addEventListener('click', () => {
			this.modal.style.display = 'flex';
			document.querySelector('main').classList.add('peuVisible');
			this.body.classList.add('bodydesactive');
			document.querySelector('main').setAttribute('tabindex', '-1');
			document.querySelector('main').setAttribute('aria-hidden', 'true');
			this.modal.querySelectorAll('h2')[0].focus();
		});
		this.btnOuvrir.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				this.modal.style.display = 'flex';
				document.querySelector('main').classList.add('peuVisible');
				this.body.classList.add('bodydesactive');
				document.querySelector('main').setAttribute('tabindex', '-1');
				document.querySelector('main').setAttribute('aria-hidden', 'true');
				this.modal.querySelectorAll('h2')[0].focus();
			}			
		});
	}

	chargerModal(nomPhotograph) {
		if (this.modal.contains(this.nomPhotograph)) {
			this.modal.removeChild(this.nomPhotograph);
		}

		this.construireModal(nomPhotograph);
		this.ouvrirModal();
		
		//this.form.querySelectorAll('input')[0].setAttribute('autofocus', '');
		const btnEnvoyer = document.querySelector('.envoyer');
		btnEnvoyer.addEventListener('click', event => {
			event.preventDefault();
			this.envoyerMsg();
		});
		btnEnvoyer.addEventListener('keydown', event => {
			if(event.key === 'Enter') {
				event.preventDefault();
				this.envoyerMsg();
			}
		});

		const btnFermer = document.querySelector('.fermerModal');
		btnFermer.addEventListener("click", () => {
			this.fermerModal();
		});
		
		addEventListener('keydown', event => {
			if (event.key === 'Escape') {
				this.fermerModal();
			}
		});

		btnFermer.addEventListener('keydown', event => {
			if (event.key === 'Enter') {
				this.fermerModal();
			}
		});
	}

	envoyerMsg() {
		const info
            = `${document.querySelector('#prenom').value}  ${document.querySelector('#nom').value}\n${document.querySelector('#email').value}\nMessage:\n${document.querySelector('#msg').value}`;
		console.log(info);
		this.confirmerEnvoie(document.querySelector('#prenom').value, document.querySelector('#nom').value);
	}

	confirmerEnvoie(prenom, nom) {
		const content = `
            <p tabindex = '0' class = 'msg'>${prenom} ${nom}<br/>Votre message a bien été envoyé</p>
            <button class='btnContact btnFermer' tabindex = '0'>Fermer</button>
        `;
		this.modal.innerHTML = content;
		this.modal.querySelector(".msg").focus();
		const btnFermer = this.modal.querySelector('.btnFermer');
		btnFermer.addEventListener('click', this.fermerModal.bind(this));
		btnFermer.addEventListener('keydown', event => {
			if(event.key === 'Enter') {
				this.fermerModal.bind(this);
			}
			event.stopPropagation();
		});
	}

	fermerModal() {
		this.modal.style.display = 'none';
		document.querySelector('main').classList.remove('peuVisible');
		document.querySelector('main').removeAttribute('tabindex');
		document.querySelector('main').removeAttribute('aria-hidden');
		this.body.classList.remove('bodydesactive');
		document.querySelector('main').querySelector('.contact_button').focus();
	}
}
export default ModalContact;
