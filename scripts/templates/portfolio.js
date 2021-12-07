class portfolioConstructor{
    constructor(data){
        this.id = data.id,
        this.title = data.title,
        // this.image = data.image,
        this.likes = data.likes,
        this.date = data.date,
        this.price = data.price
    }
}

class imageConstructor extends portfolioConstructor{
    constructor(data){
        super(data.id)
        super(data.title)
        super(data.likes)
        super(data.date)
        super(data.price)

        this.image = data.image
    }

    getImageCardDOM(){
        const figure = document.createElement( 'figure' )
        figure.id = this.id

        let content = `
        <a href="#"><img alt="" src="assets/photographers/${this.portrait}"></a>
        
    `
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



