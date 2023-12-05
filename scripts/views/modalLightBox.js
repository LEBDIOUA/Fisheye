import Modal from "./modal.js"

class ModalLightBox extends Modal{

    constructor(lightBox, btnOuvrir, btnFermer, photograph, listeMedias, position){
        super(lightBox, btnOuvrir, btnFermer);
        this.photograph = photograph;
        this.listeMedias = listeMedias;
        this.main = document.querySelector("main");
        this.lightBoxContent = document.querySelector('.lightBoxContent');
        this.position = position;        
        this.precedent = document.querySelector('.precedent');
        this.suivant = document.querySelector('.suivant');
    }

    static construireLightBox(){
        //Supprimer lightbox s'il existe
        const main = document.querySelector("main");
        const modal = main.querySelector(".lightBox");
        if (modal) {
            main.removeChild(modal);
        }

        const lbContent = document.createElement("div");
        lbContent.classList = "lightBox";
        lbContent.innerHTML = `
                <div class="maGrid">
                    <i class="fa-solid fa-xmark fermerLightBox"></i>
                    <i class="fa-solid fa-angle-left precedent active"></i>
                    <div class="lightBoxContent">
                    </div>
                    <h2></h2>
                    <i class="fa-solid fa-chevron-right suivant active"></i>
                </div>
        `;
        main.appendChild(lbContent);   
    }

    afficherLightBox(){
        //charger lightBox
        this.chargerLigthBox(this.position);         
        this.ouvrirModal();

        if(this.position == 0){
            this.precedent.classList.add("desactive");
            this.precedent.classList.remove("active");
        }
        else if(this.position == this.listeMedias.length-1){
            this.suivant.classList.add("desactive");            
            this.suivant.classList.remove("active");
        }
                
        //programmer clic de suivant et precedent
        this.precedent.addEventListener("click", () => {
            if(!this.precedent.classList.contains("desactive")){
                this.mediaPrecedent();
            }
        });

        this.suivant.addEventListener("click", () => {
            if(!this.suivant.classList.contains("desactive")){
                this.mediaSuivant();
            }
        });  
        
        addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                if (!this.precedent.classList.contains("desactive")) {
                    this.mediaPrecedent();
                }
            }
            else if (event.key === "ArrowRight") {
                event.preventDefault();
                if (!this.suivant.classList.contains("desactive")) {
                    this.mediaSuivant();
                }
            }
        });           
    }

    chargerLigthBox(){
        if(this.position >= 0){
            const titre = this.modal.querySelector('h2');
            this.lightBoxContent.innerHTML = this.listeMedias[this.position].getMediaFactory(this.photograph);
            titre.textContent = this.listeMedias[this.position].getTitre;
        }
    }

    mediaPrecedent(){
        this.position -=1;
        this.chargerLigthBox();

        if(this.position === 0){
            this.precedent.classList.add("desactive");
            this.precedent.classList.remove("active");
        }
        else if(this.position == this.listeMedias.length-2){
            this.suivant.classList.add("active");
            this.suivant.classList.remove("desactive");
        } 
    }

    mediaSuivant(){
        this.position +=1;
        this.chargerLigthBox();

        if(this.position == 1){      
            this.precedent.classList.add("active");
            this.precedent.classList.remove("desactive");
        }
        else if(this.position == this.listeMedias.length-1){
            this.suivant.classList.add("desactive");
            this.suivant.classList.remove("active");
        }
    }
}

export default ModalLightBox;