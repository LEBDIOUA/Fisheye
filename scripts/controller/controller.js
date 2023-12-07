import Model from "../models/model.js";
import ListePhotographsView from "../views/listePhotographsView.js";
import ListeMediasView from "../views/listeMediasView.js";
import TriView from "../views/triView.js";
import ModalContact from "../views/modalContact.js"
import ModalLightBox from "../views/modalLightBox.js";

class Controller{
    model = Model.getInstance();
    listePhotographsView = new ListePhotographsView();

    async afficherListePhotographs(){
        let photographers = await this.model.getPhotographers();
        this.listePhotographsView.render(photographers);  
    }

    async afficherPhotograph(id){
        let photographer = await this.model.getPhotographById(id);
        this.listePhotographsView.headerPhotograph(photographer);
    }

    async afficherNomPhotograph(id){
        let photographer = await this.model.getPhotographById(id);
        return photographer.getName;
    }

    async getMediaFactory(position){
        let listeMediasView = new ListeMediasView(photograph, null);
        const mediaResult = await listeMediasView.getMediaFactory(position);
        return mediaResult;
    }

    async afficherListeMedias(photographId, filtre){
        let medias;
        if (typeof this.model[filtre] === 'function') {
            medias = await this.model[filtre](photographId);
        } 
        else {
            console.error(`La méthode ${filtre} n'est pas une fonction dans le modèle.`);
        }

        let photograph = await this.model.getPhotographById(photographId);
        let listeMediasView = new ListeMediasView(photograph, medias);
        listeMediasView.render(); 
    }
    
    chargerListeTri(id){
        let listeTri = new TriView();
        listeTri.construireListeTri();
        const maliste = document.querySelector(".listeTri"); 
        const liElements = document.querySelectorAll(".listeTri li"); 

        maliste.addEventListener("click", () => {
            listeTri.cacherAfficherListeTri();
        }); 
        for(let i=1; i<liElements.length; i++){
            liElements[i].addEventListener("click", () =>{
                this.afficherListeMedias(id, listeTri.genererFonction(liElements[i]));
                listeTri.choisirTri(i);
            }); 
        }
        addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
                event.preventDefault();
                listeTri.choisirTri(null, "up");
            }
            else if (event.key === "ArrowDown") {
                event.preventDefault();
                listeTri.choisirTri(null, "down");
            }
            else if (event.key === "Enter") {
                event.preventDefault();
                this.afficherListeMedias(id, listeTri.genererFonction(null));
            }
        }); 
    }

    afficherModalContact(modal, sousModal, btnOuvrir, btnFermer, photographId){
        const monModal = new ModalContact(modal, sousModal, btnOuvrir, btnFermer, photographId);
        monModal.chargerModal();
    }

    static async afficherModalLightBox(modal, btnOuvrir, btnFermer, photograph, medias, position){
        const monModal = new ModalLightBox(modal, btnOuvrir, btnFermer, photograph, medias, position);
        monModal.afficherLightBox();
    }
}
export default Controller;