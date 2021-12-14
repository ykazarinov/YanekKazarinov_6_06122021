class lightBox extends mediaConstructor{
    constructor(id, photographerId, title, image){
        super(id, photographerId, title, image)
        
        this.lightBox = document.createElement( 'div' )
        this.photographName = ''
        
    }

    getCharsBefore(str, chr) {
        return super.getCharsBefore(str, chr)
    }

    async getCurrentPhotographName(photographerId) {
        const { photographers } = await getPhotographers()
        .then(function(result) {
            const currentPhotographer =  result.photographers.find(photographer => photographer.id == photographerId)
            // const PhotographerName = this.getCharsBefore(currentPhotographer.name, ' ')
            const PhotographerName = currentPhotographer.name.replace(/\s+/g, '')
            console.log(PhotographerName)
           
            return PhotographerName
        }
        
       
  
        )}

    async getLightBox(id, photographerId, title, image){
        const PhotographName = await this.getCurrentPhotographName(photographerId)
        console.log(PhotographName)
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
    }
}