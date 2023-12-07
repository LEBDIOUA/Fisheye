import Controller from "../controller/controller.js";
class ListeMediasView{  
    constructor(photograph, medias){
        this.nbMedias = 0;
        this.photograph = photograph;
        this.listeMedias = medias;
        //this.controller = new Controller();
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

    async render(){  
        this.nbMedias=0;

        //Supprimer la section dont la classe .mediaSection s'il existe
        const main = document.querySelector("main");
        //this.ecouterClicsMedias(main);  

        const oldMediaSection = main.querySelector(".mediaSection");
        if (oldMediaSection) {
            main.removeChild(oldMediaSection);
        }

        //Creer une section et la remplir avec les medias
        const newMediaSection = document.createElement("section");
        newMediaSection.setAttribute("class", "mediaSection");
        for (let i=0; i<this.listeMedias.length; i++){
            newMediaSection.innerHTML += this.afficherMedia(i);
        }
        main.appendChild(newMediaSection);

        this.aimerMedia(main);
        this.ecouterClicsMedias(); 
    }
    // ecouterClicsMedias(container) {
    //     container.addEventListener('click', (event) => {
    //         if (event.target.classList.contains('media')) {
    //             const mediaElements = container.querySelectorAll('.media');
    //             const index = Array.from(mediaElements).indexOf(event.target);
    //             console.log(index);
    //             event.stopPropagation();
    //         }
    //     });
    // }
    
    ecouterClicsMedias(){
        const medias = document.querySelectorAll(".media");
        medias.forEach((media, index) => {
            media.addEventListener("click", (event)=>{
                if (this.listeMedias[index].isVideo){
                    event.preventDefault();
                }
                Controller.afficherModalLightBox(".lightBox", null, ".fermerLightBox", this.photograph, this.listeMedias, index);
            })
        });
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
}

export default ListeMediasView;