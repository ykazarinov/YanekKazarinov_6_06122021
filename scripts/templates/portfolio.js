class mediaConstructor{
    constructor(data, LikesSubject){
        this.id = data.id,
        this.photographerId = data.photographerId,
        this.title = data.title,
        this.image = data.image,
        this.video = data.video,
        this.likes = data.likes,
        this.date = data.date,
        this.price = data.price,
        this.alt = data.alt,

        this.LikesSubject = LikesSubject

        this.figure = document.createElement( 'figure' )
    }

    getCharsBefore(str, chr) {
        var index = str.indexOf(chr);
        if (index != -1) {
            return(str.substring(0, index));
        }
        return("");
    }

    async getCurrentPhotographName() {
        const { photographers } = await getPhotographers()
        const currentPhotographer = await photographers.find(photographer => photographer.id == this.photographerId)
        
        const PhotographerName = this.getCharsBefore(currentPhotographer.name, ' ')
        return PhotographerName
    }

    handleLikeButton() {
        const that = this
        
        this.figure
            .querySelector('.like-btn')
            .addEventListener('click', function() {
                if (this.classList.contains('liked')) {
                    this.classList.remove('liked')
                    this.classList.add('far')
                    this.classList.remove('fas')
                    that.LikesSubject.fire('DEC')
                    let howMutchlikes =  Number(this.parentElement.querySelector('.media-likes__count').textContent)
                    howMutchlikes -= 1
                    this.parentElement.querySelector('.media-likes__count').textContent = howMutchlikes
                } else {
                    this.classList.add('liked')
                    this.classList.add('fas')
                    this.classList.remove('far')
                    that.LikesSubject.fire('INC')
                    let howMutchlikes =  Number(this.parentElement.querySelector('.media-likes__count').textContent)
                    howMutchlikes += 1
                    this.parentElement.querySelector('.media-likes__count').textContent = howMutchlikes
                }
            })
    }
}

class imageConstructor extends mediaConstructor { 
    constructor(id, photographerId, title, image, likes, date, price, LikesSubject, figure){
        super(id, photographerId, title, image, likes, date, price, LikesSubject, figure);
        
    }

    getCharsBefore(str, chr) {
        return super.getCharsBefore(str, chr)
    }

    async getCurrentPhotographName() {
        return super.getCurrentPhotographName()
    }

    handleLikeButton() {
        return super.handleLikeButton()
    }

    openLightBox(id, photographerId, title, image){

        let myOpen = async function(e){
            if(e.target.parentElement.id === this.id){
                e.target.blur()
                document.activeElement.blur()
                const lightbox = new lightBox(id)
                // lightbox.deleteTabindex()
                let forLightBox = document.querySelector('.for-lightbox')
                let content = await lightbox.getLightBox(id, photographerId, title, image)
                .then(reponse => {
                    forLightBox.innerHTML = reponse[0].innerHTML
                    let authorName = reponse[1]
                    const closeBtn = document.querySelector('.lightbox__close')
                    
                    closeBtn.addEventListener('click', function(e){
                        lightbox.closeLightbox()
                        e.target.focus()
                    })
                    
                    document.addEventListener("keyup", (key) => {
                        if(key.code == "Escape"){
                            lightbox.closeLightbox()
                            e.target.focus()
                        }
                    })
                    
                    closeBtn.addEventListener('keypress', function(key){
                        if(key.code == 'Enter'){
                            lightbox.closeLightbox()
                            e.target.focus()
                        }
                    })

                    lightbox.arrowClick(id, photographerId, authorName)
                })
            }
            else{
                console.log('e.target.id != this.id')
            }
        }
        let figureLink = this.figure.querySelector('a img')
        figureLink.addEventListener('click', myOpen)
        figureLink.addEventListener('keypress', myOpen)


       
    }



    async getMediaCardDOM(){
        this.figure.id = this.id
        const PhotographName = await this.getCurrentPhotographName()
        let content =  `
        <a href="#" tabindex='-1'>
            <img alt="${this.title}" class='portfolio_img' tabindex="9" src="assets/portfolio/${PhotographName}/${this.image}">
            <span class='date'>${this.date}</span>
        </a>
        <figcaption>
            <div class='media-name' title='${this.title}' tabindex="9">
                ${this.title}
            </div>
            <div class='media-likes' tabindex="9">
                <span class='media-likes__count'> ${this.likes}</span>
                <i class="far fa-heart like-btn" aria-label='likes'></i>
            </div>
        </figcaption>
    `
    this.figure.innerHTML = content
    this.handleLikeButton()
    this.openLightBox(this.id, this.photographerId, this.title, this.image)
    return (this.figure);
    }
}

// ----- video -----

class videoConstructor extends mediaConstructor {
    constructor(id, photographerId, title, video, likes, date, price, alt, LikesSubject, figure){
        super(id, photographerId, title, video, likes, date, price, alt, LikesSubject, figure);
        this.figure = document.createElement( 'figure' )
    }

    getCharsBefore(str, chr) {
        return super.getCharsBefore(str, chr)
    }

    async getCurrentPhotographName() {
        return super.getCurrentPhotographName()
    }

    handleLikeButton() {
        return super.handleLikeButton()
    }

    async getMediaCardDOM(){
        
        this.figure.id = this.id
        const PhotographName = await this.getCurrentPhotographName()
        // alt='${this.video.split('_').join(' ').split('.')[0]}'
        let content =  `
        
            <video alt='${this.alt}' controls  tabindex="9">
                <source src="assets/portfolio/${PhotographName}/${this.video}" type="video/mp4">
                Your browser does not support the video tag.
            </video>

            <span class='date'>${this.date}</span>
        
        <figcaption>
            <div class='media-name' title='${this.alt}'  tabindex="9">
                ${this.alt}
            </div>
            <div class='media-likes' tabindex="9">
                <span class='media-likes__count' > ${this.likes}</span>
            
                <i class="far fa-heart like-btn"></i>
            
            </div>
        </figcaption>
        
    `
    this.figure.innerHTML = content
    this.handleLikeButton()
    // this.openLightBox(data)
    return (this.figure);
    }
}



