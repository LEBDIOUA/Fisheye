
class Photographer{
    constructor(id, name, city, country, tagline, price, portrait){
        this.id = id
        this.name = name
        this.city = city
        this.country = country
        this.tagline = tagline
        this.price = price
        this.portrait = portrait
    }

    get getId(){
        return this.id;
    }

    get getName(){
        return this.name;
    }

    get getFirstNamePhotograph(){
        let firstName = "";
        let i = 0;
        let trouv = false;
        
        while(trouv === false){
            if(this.getName[i] == " "){
                trouv = true;
            }
            else{
                firstName += this.getName[i];
                i++;
            }
        }
        return firstName;
    }

    get getAdresse(){
        return this.city + ", "+this.country;
    }

    get getTagline(){
        return this.tagline;
    }

    get getPrice(){
        return this.price + "€/jour";
    }

    get getPortrait(){
        return this.portrait;
    }
}
export default Photographer;