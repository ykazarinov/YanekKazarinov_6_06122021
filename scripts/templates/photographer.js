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
        <a href="photographer.html"><img class="img_link" alt="" src="assets/photographers/${this.portrait}"></a>
        <h2><a class="title_link" href="photographer.html">${this.name}</a></h2>
        <div class="infoPlus">
            <div class="place">${this.city}, ${this.country}</div>
            <div class="tagline">${this.tagline}</div>
            <div class="price">${this.price}€/jour</div>
        </div>
    `
    article.innerHTML = content
    return (this.price, article);
    }

    getCurrentUserCardDOM(){
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
                <span class='total-likes__count'> likes count</span>
        
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z"/>
                </svg>
        
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

