import Modal from './modal.js';
import Controller from '../controller/controller.js';

class ModalContact extends Modal {
	constructor(sousModal, id) {
		super('.contact_modal', '.ouvrirModal', '.fermerModal');
		this.sousModal = document.querySelector(sousModal);
		this.form = document.querySelector('form');
		this.nomPhotograph = this.modal.querySelector('.nomPhotographCtc');
		this.photographId = id;
		this.controller = new Controller();
	}

	async chargerModal() {
		if (this.sousModal.contains(this.nomPhotograph)) {
			this.sousModal.removeChild(this.nomPhotograph);
		}

		super.ouvrirModal();
		const nom = document.createElement('h2');
		nom.setAttribute('class', 'nomPhotographCtc');
		nom.textContent = await this.controller.afficherNomPhotograph(this.photographId);
		this.sousModal.insertBefore(nom, this.form);

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
            <button class='contact_button fermerModal envoyer' tabindex = '0'>Envoyer</button>
        `;
		this.form.innerHTML = content;
		console.log(this.form.querySelectorAll('input')[0])
		this.form.querySelectorAll('input')[0].setAttribute('autofocus', '');
		const btn = document.querySelector('.envoyer');
		btn.addEventListener('click', event => {
			event.preventDefault();
			this.envoyerMsg();
		});
		btn.addEventListener('keydown', event => {
			if(event.key === 'Enter') {
				event.preventDefault();
				this.envoyerMsg();
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
            <p>${prenom} ${nom}<br/>Votre message a bien été envoyé</p>
            <button class='contact_button btnFermer'>Fermer</button>
        `;
		this.sousModal.innerHTML = content;
		const btnFermer = this.sousModal.querySelector('.btnFermer');
		btnFermer.addEventListener('click', super.fermerModal.bind(this));
		btnFermer.addEventListener('keydown', event => {
			if(event.key === 'Enter') {
				super.fermerModal();
			}
			event.stopPropagation();
		});
	}
}
export default ModalContact;
