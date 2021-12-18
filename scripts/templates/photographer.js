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
        <span>
            <a href="photographer.html?id=${article.id}" title='${this.name}'  tabindex='3'>
                <img class="img_link" alt="" src="assets/photographers/${this.portrait}">
            
            <h2 class="title_link">${this.name}</h2>
            </a>
        </span>
        <div class="infoPlus" tabindex='3'>
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
            <h1  tabindex="2">${this.name}</h1>
            <div class="infoPlus"  tabindex="3">
                <div class="place">${this.city}, ${this.country}</div>
                <div class="tagline">${this.tagline}</div>
               
            </div>
        </section>
        <section>
            <button id='open-modal-form' class="contact_button" tabindex="4" title='Contact Me'>Contactez-moi</button>
        </section>
        <section>
            <img class="img_link" alt="${this.name}" src="assets/photographers/${this.portrait}"  tabindex="5">
        </section>

        <aside class='mark-container'>
            <div class='total-likes' tabindex="6">
                <span class='total-likes__count' title='${totalLikes} likes'> ${totalLikes}</span>
        
                <i class="fas fa-heart" aria-label='likes' ></i>
        
            </div>
            <div class='price' tabindex="6">
                ${this.price} €/jour
            </div>
        </aside>
    `

    article.innerHTML = content
    return (this.price, article)

    }

}

