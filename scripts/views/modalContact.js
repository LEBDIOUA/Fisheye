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
                <input type='text' id='prenom'/>
            </div>
            <div>
                <label for='nom'>Nom</label>
                <input type='text' id='nom'/>
            </div>
            <div>
                <label for='email'>Email</label>
                <input type='email' id='email'/>
            </div>
            <div>
                <label for='msg'>Votre message</label>
                <textarea name='msg' id='msg' cols='30' rows='10'></textarea>
            </div>
            <button class='contact_button fermerModal envoyer'>Envoyer</button>
        `;
		this.form.innerHTML = content;
		const btn = document.querySelector('.envoyer');
		btn.addEventListener('click', event => {
			event.preventDefault();
			this.envoyerMsg();
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
            <p>${prenom} ${nom}<br/>Votre message a bien été envoyer</p>
            <button class='contact_button btnFermer'>Fermer</button>
        `;
		this.sousModal.innerHTML = content;
		const btnFermer = this.sousModal.querySelector('.btnFermer');
		btnFermer.addEventListener('click', this.fermerModal.bind(this));
	}
}
export default ModalContact;
