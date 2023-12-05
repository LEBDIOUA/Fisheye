class TriView{
    chargerListeTri(){
        const main = document.querySelector("main");
        let content = `
        <section class="triSection">
            <p class="tri">Trier par : </p>
            <ul class = "listeTri">
                <li id="element1"><p id="val">Popularité</p> <i class="fa-solid fa-chevron-down iconTri"></i></li>
                <li id="element2"><hr/>Date</li>
                <li id="element3"><hr/>Titre</li>
            </ul>
        </section>`
        main.innerHTML += content;
    }

    cacherAfficherListeTri(){;
        const liElements = document.querySelectorAll(".listeTri li");        
        const icon = document.querySelector('.iconTri');
        liElements.forEach((element, index) => {
            //Tester si mes éléments de la liste sans cacher ou non aprés chaque clic
            if (window.getComputedStyle(element).getPropertyValue('display') == "none" && (index === 1 || index ===2)){
                element.style.display = "block";
                if(index === 1 || index === 2){
                    //Changer l'icone
                    icon.classList.remove("fa-chevron-down"); 
                    icon.classList.add("fa-chevron-up");
                }
            }
            else if (window.getComputedStyle(element).getPropertyValue('display') == "block" && (index === 1 || index ===2)){
                if(index == 1 || index === 2){
                    element.style.display = "none";
                    //Changer l'icone
                    icon.classList.remove("fa-chevron-up");
                    icon.classList.add("fa-chevron-down");   
                }
            }  
        });
    }
    
    //Changer le premier Texte de la liste
    choisirTri(){
        this.cacherAfficherListeTri();
        const liElements = document.querySelectorAll(".listeTri li");      
        const element1 = document.querySelector("#val");
        const icon = document.querySelector('.iconTri');
        liElements.forEach((element, index) => {
            element.addEventListener("click", function() {
                if(index !== 0){
                    let temp = element.textContent;
                    element.innerHTML = "<hr/>" + element1.textContent;
                    element1.textContent = temp;
                    //this.genererFonction;
                }
            });
        });
        return this.genererFonction();
    }

    genererFonction(){
        const valeur = document.querySelector("#val").textContent;
        let fonction = "afficherListeMediasBy";
        switch (valeur){
            case "Titre":
                fonction += "Titre";
                break;
            case "Popularité":
                fonction += "Likes";
                break;
            case "Date":
                fonction += "Date";
                break;
        }
        return fonction;
    }
}
export default TriView;