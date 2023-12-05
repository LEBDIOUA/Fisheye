import Controller from "../controller/controller.js";
class ListeMediasView{
    constructor(photograph, medias){
        this.nbMedias = 0;
        this.photograph = photograph;
        this.listeMedias = medias;
        this.controller = new Controller();
    }
    
    afficherMedia(position){
        let media = this.listeMedias[position];
        let content = "<article>";
        content += media.getMediaFactory(this.photograph);
        content += `
            <div class="mediaInfo">
                <h2 class="titreMedia">${media.getTitre}</h2>
                <p>${media.getLikes} <i class='fa-solid fa-heart btnLike'></i></p>
            </div></article>`;

        this.nbMedias += media.getLikes;
        return content;
    }

    static modifierListe(liste){
        console.log(this.listeMedias)
        console.log(liste)
        this.listeMedias = liste;
        this.render(false, -1); 
    }
    async render(){  
        this.nbMedias=0;

        //Supprimer la section dont la classe .mediaSection s'il existe
        const main = document.querySelector("main"); 
        const mediaSection = main.querySelector(".mediaSection");
        if (mediaSection) {
            main.removeChild(mediaSection);
        }

        //Creer une section et la remplir avec les medias
        const mediasSection = document.createElement("section");
        mediasSection.setAttribute("class", "mediaSection");
        for (let i=0; i<this.listeMedias.length; i++){
            mediasSection.innerHTML += this.afficherMedia(i);
        }
        main.appendChild(mediasSection);

        this.aimerMedia(main);
        this.afficherLightBox();
    }

    afficherTotal(main){
        const total = main.querySelector(".total");
        const content = document.createElement("div");

        if (total) {
            main.removeChild(total);
        }

        content.setAttribute("class", "total");
        content.innerHTML = `
            <p>${this.nbMedias} <i class='fa-solid fa-heart'></i></p>
            <p>${this.photograph.getPrice}</p>
        `;

        main.appendChild(content);
    }

    //Aimer un media en augmentant le nombre de like à 1
    aimerMedia(main){
        this.afficherTotal(main);
        
        const btnLike = document.querySelectorAll(".btnLike");
        for (let i=0; i<this.listeMedias.length; i++){
            btnLike[i].addEventListener("click", () =>{
                if(!btnLike[i].classList.contains("liked")){
                    this.listeMedias[i].ajouterLike();
                    this.render();
                    this.initialiserBtnLikes(i);
                }
            });
        }
    }
    
    initialiserBtnLikes(i){
        const btnLike = document.querySelectorAll(".btnLike");
        btnLike[i].classList.add("liked");
    }

    afficherLightBox(){
        const medias = document.querySelectorAll(".media");
        for (let i=0; i<medias.length; i++){
            medias[i].addEventListener("click", (event) =>{
                if (this.listeMedias[i].isVideo){
                    //event.preventDefault();
                }
                this.controller.afficherModalLightBox(".lightBox", null, ".fermerLightBox", this.photograph, this.listeMedias, i);
            });
        }
    }
}

export default ListeMediasView;