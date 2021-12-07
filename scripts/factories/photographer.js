class photographerFactory{
    constructor(data){
        this.name = data.name,
        this._id = data.id,
        this.city = data.city,
        this.country = data.country,
        this.tagline = data.tagline,
        this.price = data.price,
        this.portrait = data.portrait
    }

     get id(){ return this._id}

    getUserCardDOM(){
        const article = document.createElement( 'article' )
        article.id = this.id
        let content = `
        <a href="photographer.html"><img class="img_link" alt="" src="assets/photographers/${this.portrait}"></a>
        <h2><a class="title_link" href="photographer.html">${this.name}</a></h2>
        <div class="infoPlus">
            <div class="place">${this.city}, ${this.country}</div>
            <div class="tagline">${this.tagline}</div>
            <div class="price">${this.price}€/jour</div>
        </div>
    `
    article.innerHTML = content
    return (article);
    }

    getCurrentUserCardDOM(){
        const article = document.createElement( 'article' )
        let content = `
        <section>
            <h2>${this.name}</h2>
            <div class="infoPlus">
                <div class="place">${this.city}, ${this.country}</div>
                <div class="tagline">${this.tagline}</div>
                <div class="price">${this.price}€/jour</div>
            </div>
        </section>
        <section>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        </section>
        <section>
            <img class="img_link" alt="" src="assets/photographers/${this.portrait}">
        </section>
    `

    article.innerHTML = content
    return (article);

    }

}

