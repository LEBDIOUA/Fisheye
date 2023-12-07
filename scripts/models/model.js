import Photographer from "./photographer.js";
import Media from "./media.js";
class Model{
    static instance = null;

    static getInstance(){
        if (this.instance == null){
            this.instance = new Model();
        }
        return(this.instance);
    }

    get(url) {
        return fetch(url)
            .then(function(httpBodyResponse) {
                // httpBodyResponse contient la réponse dans son entièreté, avec le header & le reste. 
                // Du coup, avec .json, on réccupère la partie "json" de la réponse, qui est ce dont
                // on a réellement besoin. 
                let response = httpBodyResponse.json();
                return response;
            })
            .catch(function(error) {
                // gestion basique des erreurs. 
                console.log("Une erreur s'est produite :");
                console.log(error);
            })
    }

    getData(){
        this.data = this.get("/Fisheye/data/photographers.json");
        return this.data;
    }

    async getPhotographers(){
        let data = await this.getData();
        let listPhotographers = [];

        for(let i=0; i<data.photographers.length; i++){
            listPhotographers.push(new Photographer(data.photographers[i].id, data.photographers[i].name, data.photographers[i].city, data.photographers[i].country, data.photographers[i].tagline, data.photographers[i].price, data.photographers[i].portrait));
        }
        return listPhotographers;
    }

    async getPhotographById(id){
        
        let data = await this.getData();
        let photograph;
        let i = 0;
        let trouv = false;

       do{
            if(id == data.photographers[i].id){
                photograph = new Photographer(data.photographers[i].id, data.photographers[i].name, data.photographers[i].city, data.photographers[i].country, data.photographers[i].tagline, data.photographers[i].price, data.photographers[i].portrait);
                trouv = true;
            }
            else{
                i++;
            }
        }while (i<data.photographers.length && trouv==false);
        
        return photograph;
    }

    async getFirstNamePhotograph(id){
        let photograph = await this.getPhotographById(id);
        let trouv = false;
        let firstName = "";
        let i = 0;
        
        while(trouv === false){
            if(photograph.getName[i] == " "){
                trouv = true;
            }
            else{
                firstName += photograph.getName[i];
                i++;
            }
        }
        return firstName;
    }

    async getMedias(photographId){
        let data = await this.getData();

        let listMedia = [];

        for(let i=0; i<data.media.length; i++){
            if(data.media[i].photographerId == photographId){
                listMedia.push(new Media(data.media[i]));
            }
        }

        return listMedia;
    }
    
    async getMediasByTitle(photographId){
        
        let data = await this.getMedias(photographId);
        let temp;
        let trouv;
        do{
            trouv = false;
            for (let i=1; i<data.length; i++){
                if(data[i].getTitre < data[i-1].getTitre){
                    temp = data[i];
                    data[i] = data[i-1];
                    data[i-1] = temp;
                    trouv  = true;
                }
            }
        }while(trouv == true);

        return data;
    }

    async getMediasByDate(photographId){
        let data = await this.getMedias(photographId);
        
        let temp;
        let trouv;
        do{
            trouv = false;
            for (let i=1; i<data.length; i++){
                if(data[i].getDate > data[i-1].getDate){
                    temp = data[i];
                    data[i] = data[i-1];
                    data[i-1] = temp;
                    trouv  = true;
                }
            }
        }while(trouv == true);

        return data;
    }

    async getMediasByLikes(photographId){
        let data = await this.getMedias(photographId);
        let temp;
        let trouv;
        do{
            trouv = false;
            for (let i=1; i<data.length; i++){
                if(data[i].getLikes > data[i-1].getLikes){
                    temp = data[i];
                    data[i] = data[i-1];
                    data[i-1] = temp;
                    trouv  = true;
                }
            }
        }while(trouv == true);

        return data;
    }
}
export default Model;
