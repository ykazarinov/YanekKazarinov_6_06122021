class mediaConstructor{
    constructor(data){
        this.id = data.id,
        this.photographerId = data.photographerId,
        this.title = data.title,
        this.image = data.image,
        this.video = data.video,
        this.likes = data.likes,
        this.date = data.date,
        this.price = data.price
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
}

class imageConstructor extends mediaConstructor {
    constructor(id, photographerId, title, image, likes, date, price){
        super(id, photographerId, title, image, likes, date, price);
    }

    getCharsBefore(str, chr) {
        return super.getCharsBefore(str, chr)
    }

    async getCurrentPhotographName() {
        return super.getCurrentPhotographName()
    }



    async getMediaCardDOM(){

        const figure = document.createElement( 'figure' )
        figure.id = this.id
        const PhotographName = await this.getCurrentPhotographName()
        let content =  `
        <a href="#">
            <img alt="" src="assets/portfolio/${PhotographName}/${this.image}">
            <span class='date'>${this.date}</span>
        </a>
        <figcaption>
            <div class='media-name'>
                ${this.title}
            </div>
            <div class='media-likes'>
                <span class='media-likes__count'> ${this.likes}</span>
            
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z"/>
                </svg>
            
            </div>
        </figcaption>
        
    `
    figure.innerHTML = content
    return (figure);
    }
}

// ----- video -----

class videoConstructor extends mediaConstructor {
    constructor(id, photographerId, title, video, likes, date, price){
        super(id, photographerId, title, video, likes, date, price);
    }

    getCharsBefore(str, chr) {
        return super.getCharsBefore(str, chr)
    }

    async getCurrentPhotographName() {
        return super.getCurrentPhotographName()
    }

    async getMediaCardDOM(){
        const figure = document.createElement( 'figure' )
        figure.id = this.id
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
            <div class='media-name'>
                ${this.video.split('_').join(' ').split('.')[0]}
            </div>
            <div class='media-likes'>
                <span class='media-likes__count'> ${this.likes}</span>
            
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z"/>
                </svg>
            
            </div>
        </figcaption>
        
    `
    figure.innerHTML = content
    return (figure);
    }
}



