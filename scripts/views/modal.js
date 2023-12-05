class Modal{

    constructor(modal, btnOuvrir, btnfermer){
        this.modal = document.querySelector(modal);
        if(btnOuvrir !== null){
            this.btnOuvrir = document.querySelector(btnOuvrir);
        }
        this.btnfermer = document.querySelector(btnfermer);
        this.btnfermer.addEventListener("click", this.fermerModal.bind(this));
        this.body = document.querySelector("body");
    }

    get getModal(){
        return this.modal;
    }

    ouvrirModal(){
        if(this.modal.classList.contains("contact_modal")){
            this.btnOuvrir.addEventListener("click", () => {
                this.modal.style.display = "block";
                main.classList.add("peuVisible");
                this.body.classList.add("bodydesactive");
            });
        }
        else if(this.modal.classList.contains("lightBox")){
            this.modal.style.display = "block";
            this.body.classList.add("bodydesactive");
        }
        this.fermerModal;
    }
    
    fermerModal(){
        this.modal.style.display = "none";
        main.classList.remove("peuVisible");
        this.body.classList.remove("bodydesactive");
    }
}
export default Modal;