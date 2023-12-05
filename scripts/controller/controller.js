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
        switch (filtre){
            case "afficherListeMediasByTitre":
                medias = await this.model.getMediasByTitle(photographId);
                break;
            case "afficherListeMediasByLikes":
                medias = await this.model.getMediasByLikes(photographId);
                break;
            case "afficherListeMediasByDate":
                medias = await this.model.getMediasByDate(photographId);
                break;
            default:
                medias = await this.model.getMedias(photographId);
                break;
        }
        let photograph = await this.model.getPhotographById(photographId);
        let listeMediasView = new ListeMediasView(photograph, medias);
        listeMediasView.render(false, -1); 
    }
    
    chargerListeTri(id){
        let listeTri = new TriView();
        listeTri.chargerListeTri();
        const liste = document.querySelector(".listeTri");
        liste.addEventListener("click", () => {
            this.afficherListeMedias(id, listeTri.choisirTri());
        }); 
    }

    afficherModalContact(modal, sousModal, btnOuvrir, btnFermer, photographId){
        const monModal = new ModalContact(modal, sousModal, btnOuvrir, btnFermer, photographId);
        monModal.chargerModal();
    }

    async afficherModalLightBox(modal, btnOuvrir, btnFermer, photograph, medias, position){
        ModalLightBox.construireLightBox()
        const monModal = new ModalLightBox(modal, btnOuvrir, btnFermer, photograph, medias, position);
        monModal.afficherLightBox();
    }
}
export default Controller;