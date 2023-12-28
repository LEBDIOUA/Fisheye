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
		const h2Element = this.modal.querySelectorAll('h2')[0];
		h2Element.setAttribute('aria-hidden', 'false');
		const nom = document.createElement('h2');
		nom.setAttribute('class', 'nomPhotographCtc');
		nom.setAttribute('tabindex', '0');
		nom.textContent = nomPhotograph;
		this.modal.insertBefore(nom, this.form);

		const content = `
            <div class = 'formData'>
                <label for='prenom'>Prénom</label>
                <input type='text' id='prenom' aria-label = 'Saisir votre prénom. Vous devez saisir au moins deux caractères'/>
            </div>
            <div class = 'formData'>
                <label for='nom'>Nom</label>
                <input type='text' id='nom' aria-label = 'saisir votre nom. Vous devez saisir au moins deux caractères'/>
            </div class = 'formData'>
            <div class = 'formData'>
                <label for='email'>Email</label>
                <input type='email' id='email' aria-label = 'Saisir un mail valide'/>
            </div class = 'formData'>
            <div class = 'formData'>
                <label for='msg'>Votre message</label>
                <textarea name='msg' id='msg' cols='30' rows='10' aria-label = 'Saisir votre message, au moins deux caractères'></textarea>
            </div>
            <button class='btnContact fermerModal envoyer' aria-label = 'Cliquez ou appuyez sur la touche Entrée pour envoyer votre message'>Envoyer</button>
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
			if(this.modal.querySelectorAll('h2')[0]){
				this.modal.querySelectorAll('h2')[0].focus();
			}
			else{
				this.modal.querySelector('.msg').focus();
			}
		});
		this.btnOuvrir.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				this.modal.style.display = 'flex';
				document.querySelector('main').classList.add('peuVisible');
				this.body.classList.add('bodydesactive');
				document.querySelector('main').setAttribute('tabindex', '-1');
				document.querySelector('main').setAttribute('aria-hidden', 'true');
				if(this.modal.querySelectorAll('h2')[0]){
					this.modal.querySelectorAll('h2')[0].focus();
				}
				else{
					this.modal.querySelector('.msg').focus();
				}
			}			
		});
	}

	chargerModal(nomPhotograph) {
		if (this.modal.contains(this.nomPhotograph)) {
			this.modal.removeChild(this.nomPhotograph);
		}

		this.construireModal(nomPhotograph);
		this.ouvrirModal();
		
		this.ecouteurClicEnvoyer();
		this.ecouteurClicFermer();
	}

	ecouteurClicEnvoyer() {
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
	}

	ecouteurClicFermer() {
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
		let submit = true;
		const formData = this.form.querySelectorAll('.formData')
		formData.forEach((Element) => {
			let inputElement;
			if (Element.querySelector("input")) {
				inputElement = Element.querySelector("input");
			}
			else {
				inputElement = Element.querySelector("textarea");
			}
			//Supprimer tous les msgs d'erreurs
			if(Element.querySelector('.msgErreur')){
				Element.removeChild(Element.querySelector('.msgErreur'));
				inputElement.style.border = "0";
			}
			// Récupérez et vérifier la valeur de l'élément input
			let detectErreur = this.validerDonnees(inputElement); 
			if (detectErreur[0]){
				//Créer une balise p et l'insérer pour afficher msg d'erreur 
				this.afficherMsgErreur(Element, inputElement, detectErreur[1]);
				submit = false;
			}
		});
		
		const msg = this.form.querySelectorAll('.msgErreur')[0];
		if (msg) {
			msg.focus();
		}

		if(submit == true){
			const info = `${document.querySelector('#prenom').value}  ${document.querySelector('#nom').value}\n${document.querySelector('#email').value}\nMessage:\n${document.querySelector('#msg').value}
			`;
			console.log(info);
			this.confirmerEnvoie(document.querySelector('#prenom').value, document.querySelector('#nom').value);	
		}
	}

	confirmerEnvoie(prenom, nom) {
		const content = `
            <div class = 'conteneur'>
				<p tabindex = '0' class = 'msg' aria-label = '${prenom} ${nom} Votre message a bien été envoyé'>${prenom} ${nom}<br/>Votre message a bien été envoyé</p>
				<button class='btnContact btnFermer' aria-label = 'Cliquez ou appuyez sur la touche Entrée pour fermer le modal'>Fermer</button>
			</div>
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
		document.querySelector('main').querySelector('.btnContact').focus();
	}

	afficherMsgErreur(conteneur, inputElement, msg){
		const msgErreur = document.createElement('p');
		msgErreur.setAttribute('class', 'msgErreur');
		msgErreur.setAttribute('tabindex', '0');
		msgErreur.setAttribute('aria-label', 'Erreur ' + inputElement.getAttribute('id') + ' ' + msg);
		msgErreur.textContent = msg;
		conteneur.appendChild(msgErreur);
		inputElement.style.border = "5px solid red";
	}

	validerDonnees(element){
		let msg = [false, ""];
		let fonction = "verifier";
		if (element.type === 'textarea'){
			fonction += 'Text';
		}
		else {
			fonction += this.premiereMajuscule(element.type);
		}
		try {
		  if(typeof this[fonction] === "function") {
			// Appeler la fonction correspondante avec l'événement en tant qu'argument
			msg = this[fonction].bind(this)(element);
		  }
		  else{
			throw new Error("La fonction n'existe pas :" + fonction);
		  }
		}
		catch (error){
		  console.error("Erreur lors de l'appel de la fonction :", error);
		}
		return msg;
	}
	//Fonction permet à transformer la première lettre du mot en majuscule
	premiereMajuscule(mot){
		let temp = mot[0].toUpperCase();
		for(let i=1; i<mot.length; i++){
		  temp += mot[i];
		}
		return temp;
	}

	verifierText(element){
		let msg = [false, ""];
		if (element.value === ""){
		  msg[0] = true;
		  msg[1] = "Veuillez fournir une valeur";
		}
		else if(element.value.length<2){
		  msg[0] = true;
		  msg[1] = "Veuillez allonger ce texte pour qu'il comporte au moins 2 caractères. il en compte acctuellement un seul";
		}
		return msg;
	}

	verifierEmail(element){
		let msg = [false, ""];
		let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (element.value === ""){
		  msg[0] = true;
		  msg[1] = "Veuillez fournir une valeur";
		}
		else if(!element.value.match(emailFormat)){
		  msg[0] = true;
		  msg[1] = "La valeur que vous avez fournie est érronée";
		}
		return msg; 
	}
}
export default ModalContact;
