class portfolioConstructor{
    constructor(data){
        this.id = data.id,
        this.photographerId = data.photographerId,
        this.title = data.title,
        // this.image = data.image,
        this.likes = data.likes,
        this.date = data.date,
        this.price = data.price
    }
}

class imageConstructor{
    constructor(data){
        this.id = data.id,
        this.photographerId = data.photographerId,
        this.title = data.title,
        this.image = data.image,
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
        // console.log(PhotographerName)
        return PhotographerName
    }

    async getImageCardDOM(){
        const figure = document.createElement( 'figure' )
        figure.id = this.id
        const PhotographName = await this.getCurrentPhotographName()
        let content =  `
        <a href="#"><img alt="" src="assets/portfolio/${PhotographName}/${this.image}"></a>
        
    `
    figure.innerHTML = content
    return (figure);
    }
}

class videoConstructor extends portfolioConstructor{
    constructor(data){
        super(data.id)
        super(data.title)
        super(data.likes)
        super(data.date)
        super(data.price)

        this.video = data.video
    }
}



