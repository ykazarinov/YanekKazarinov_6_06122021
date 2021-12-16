class photographerTemplate{
    constructor(data){
        this.name = data.name,
        this.id = data.id,
        this.city = data.city,
        this.country = data.country,
        this.tagline = data.tagline,
        this._price = data.price,
        this.portrait = data.portrait
    }

     get price(){ return this._price}

    getUserCardDOM(){
        const article = document.createElement( 'article' )
        article.id = this.id
        let content = `
        <a href="photographer.html?id=${article.id}"><img class="img_link" alt="${this.name}" src="assets/photographers/${this.portrait}"></a>
        <h2><a class="title_link" href="photographer.html?id=${article.id}">${this.name}</a></h2>
        <div class="infoPlus">
            <div class="place">${this.city}, ${this.country}</div>
            <div class="tagline">${this.tagline}</div>
            <div class="price">${this.price}€/jour</div>
        </div>
    `
    article.innerHTML = content
    return (this.price, article);
    }

    getCurrentUserCardDOM(totalLikes){
        const article = document.createElement( 'article' )
        article.classList.add('photograph-header__info')
        let content = `
        <section>
            <h1>${this.name}</h1>
            <div class="infoPlus">
                <div class="place">${this.city}, ${this.country}</div>
                <div class="tagline">${this.tagline}</div>
               
            </div>
        </section>
        <section>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        </section>
        <section>
            <img class="img_link" alt="" src="assets/photographers/${this.portrait}">
        </section>

        <aside class='mark-container'>
            <div class='total-likes'>
                <span class='total-likes__count'> ${totalLikes}</span>
        
                <i class="fas fa-heart"></i>
        
            </div>
            <div class='price'>
                ${this.price} €/jour
            </div>
        </aside>
    `

    article.innerHTML = content
    return (this.price, article)

    }

}

