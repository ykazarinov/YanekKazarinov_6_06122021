class lightBox extends mediaConstructor{
    constructor(id){
        super(id)
        
        this.lightBox = document.createElement( 'div' )
        

    
        
    }

    getCharsBefore(str, chr) {
        return super.getCharsBefore(str, chr)
    }

    async getCurrentPhotographName(photographerId) {
        const { photographers } = await getPhotographers()
        
            const currentPhotographer =  photographers.find(photographer => photographer.id == photographerId)
            const PhotographerName = this.getCharsBefore(currentPhotographer.name, ' ')
            // const PhotographerName = currentPhotographer.name.replace(/\s+/g, '')
            return PhotographerName
  
        }

    async getLightBox(id, photographerId, title, image){
        let result = this.getCurrentPhotographName(photographerId)
        .then(reponse => {
            
            let PhotographName = reponse
            
        
        
        this.lightBox.classList.add('lightbox')
        let content = `
        <div class='lightbox__container'>
            <div class='lightbox__close'><i class="fas fa-times"></i></div>
            <div class='lightbox__slider'>
                <div class='left_arrow'><i class="fas fa-chevron-left"></i></div>
                <figure>
                    <img alt='${title}' src='assets/portfolio/${PhotographName}/${image}'>
                    <figcapture>
                        ${title}
                    </figcapture>
                </figure>
                <div class='right_arrow'><i class="fas fa-chevron-right"></i></div>
            </div>
        </div>
        <div class='lightbox__bg'></div>
        `


        this.lightBox.innerHTML = content
       
        return (this.lightBox);

    })
    return result;
    }
}