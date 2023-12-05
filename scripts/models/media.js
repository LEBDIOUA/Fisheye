class Media{
    constructor(data){
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
        this.isVideo;

        if("image" in data){
            this.content = data.image;
            this.isVideo = false;
        }
        else if("video" in data){
            this.content = data.video;
            this.isVideo = true;
        }
    }  
    
    get getPhotographId(){
        return this.photographerId;
    }

    get getTitre(){
        return this.title;
    }

    get getContent(){
        return this.content;
    }

    get getDate(){
        return this.date;
    }

    get getLikes(){
        return this.likes;
    }

    get getTitre(){
        return this.title;
    }

    get getisVideo(){
        return this.isVideo;
    }

    ajouterLike(){
        this.likes += 1;
    }

    getMediaFactory(photograph){
        let content = "";
        if(this.isVideo === false){
            content += `<img src="../assets/images/${photograph.getFirstNamePhotograph}/${this.getContent}" alt="${this.getTitre}" class="media"/>`;
        }

        else if(this.isVideo === true){
            content += `<video controls class="media"> <source src="../assets/images/${photograph.getFirstNamePhotograph}/${this.getContent}" type="video/mp4"> </video>`;
        }
        return content;
    }
}
export default Media;