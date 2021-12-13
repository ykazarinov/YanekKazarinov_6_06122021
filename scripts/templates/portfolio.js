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
                  
                    that.LikesSubject.fire('DEC')
                } else {
                    this.classList.add('liked')
                    console.log('that.LikesSubject')
                  console.log(that.LikesSubject)
                    that.LikesSubject.fire('INC')
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



    async getMediaCardDOM(){

        
        this.figure.id = this.id
        const PhotographName = await this.getCurrentPhotographName()
        let content =  `
        <a href="#">
            <img alt="" src="assets/portfolio/${PhotographName}/${this.image}">
            <span class='date'>${this.date}</span>
        </a>
        <figcaption>
            <div class='media-name' title='${this.title}'>
                ${this.title}
            </div>
            <div class='media-likes'>
                <span class='media-likes__count'> ${this.likes}</span>
            
                <i class="far fa-heart like-btn"></i>
            
            </div>
        </figcaption>
        
    `
    this.figure.innerHTML = content
    this.handleLikeButton()
    return (this.figure);
    }
}

// ----- video -----

class videoConstructor extends mediaConstructor {
    constructor(id, photographerId, title, video, likes, date, price, LikesSubject, figure){
        super(id, photographerId, title, video, likes, date, price, LikesSubject, figure);
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
        let content =  `
        <a href="#">
            <video controls>
                <source src="assets/portfolio/${PhotographName}/${this.video}" type="video/mp4">
                Your browser does not support the video tag.
            </video>

            <span class='date'>${this.date}</span>
        </a>
        <figcaption>
            <div class='media-name' title='${this.video.split('_').join(' ').split('.')[0]}'>
                ${this.video.split('_').join(' ').split('.')[0]}
            </div>
            <div class='media-likes'>
                <span class='media-likes__count'> ${this.likes}</span>
            
                <i class="far fa-heart like-btn"></i>
            
            </div>
        </figcaption>
        
    `
    this.figure.innerHTML = content
    return (this.figure);
    }
}



