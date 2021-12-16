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
            return PhotographerName
  
        }

    async getAllMediaOfCurrentAuthor(currentId){
        const { media } = await getPhotographers()
        const portfolio = await media.filter(media => media.photographerId == currentId)
        return portfolio
    }

    async arrowClick(id, authorId, authorName){
        let rightArrow = document.querySelector('.fa-chevron-right')
        let photoElem = document.querySelector('.lightbox__slider figure img')
        let titleElem = document.querySelector('.lightbox__slider figure figcapture')
        let currentId = id
        let nextId
        let portfolio = await this.getAllMediaOfCurrentAuthor(authorId)
        let leftArrow = document.querySelector('.fa-chevron-left')
        let prevId


        // set initial values
        portfolio.forEach(function(item, index) {
            if(item.id === currentId){
                if(index > 0){
                    prevId = portfolio[index - 1].id;
                }
                if(index < portfolio.length-1){
                    nextId = portfolio[index + 1].id;
                }
                if(index === 0){
                    leftArrow.classList.add('hidden')
                }
                if(index === portfolio.length-1){
                    rightArrow.classList.add('hidden')
                }
            }
        })


        rightArrow.addEventListener('click', async function(){
            prevId = currentId

            portfolio.forEach(function(item, index) {
                if(item.id === currentId){
                    if (index > 0) {
                    }
                    if (index < portfolio.length - 1) {
                        nextId = portfolio[index + 1].id
                        let photoName = portfolio.find(media => media.id === nextId).image
                        let photoTitle = portfolio.find(media => media.id === nextId).title
                        photoElem.setAttribute('src', `assets/portfolio/${authorName}/${photoName}`)
                        titleElem.textContent = photoTitle
                    }
                    // if(index + 2 == portfolio.length){
                    //     rightArrow.classList.add('hidden')
                    // }else{
                    //     if(rightArrow.classList.contains('hidden')){
                    //         rightArrow.classList.remote('hidden')
                    //     }
                    // }
                    if(index === portfolio.length-2){
                        rightArrow.classList.add('hidden')
                    }
                    else{
                        if(leftArrow.classList.contains('hidden')){
                            
                            leftArrow.classList.remove('hidden')
                        }
                    }
                }
            });
            if(nextId){
                currentId = nextId
            }
        })

        leftArrow.addEventListener('click', async function(){
                nextId = currentId

           
           

            portfolio.forEach(function(item, index) {
                if(item.id === currentId){
                    if (index > 0) {
                        prevId = portfolio[index - 1].id
                        let photoName = portfolio.find(media => media.id === prevId).image
                        let photoTitle = portfolio.find(media => media.id === prevId).title
                        photoElem.setAttribute('src', `assets/portfolio/${authorName}/${photoName}`)
                        titleElem.textContent = photoTitle
                    }
                    if (index < portfolio.length - 1) {
                    }

                    if(index-1 == 0){
                        leftArrow.classList.add('hidden')
                    }else{
                        if(rightArrow.classList.contains('hidden')){
                            rightArrow.classList.remove('hidden')
                        }
                    }
                }
            });
            if(prevId){
                
                currentId = prevId
            }
        })
       
    } 



    closeLightbox(){
        const closeBtn = document.querySelector('.lightbox__close')
        const lightBox = document.querySelector('.for-lightbox')
        closeBtn.addEventListener('click', function(e){
            lightBox.innerHTML = ''
        })
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
       
        return [this.lightBox, PhotographName];

    })
    return result;
    }
}