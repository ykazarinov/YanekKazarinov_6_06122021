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
        let mediaElem = document.querySelector('.lightbox__slider figure')
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
                        let mediaTitle = portfolio.find(media => media.id === nextId).title

                        
                        if(portfolio.find(media => media.id === nextId).image){
                            let photoName = portfolio.find(media => media.id === nextId).image
                            mediaElem.innerHTML = `<img alt='${mediaTitle}' src='assets/portfolio/${authorName}/${photoName}'>
                            <figcapture title='${mediaTitle}'>${mediaTitle}</figcapture>`
                        }else if(portfolio.find(media => media.id === nextId).video){
                            let videoName = portfolio.find(media => media.id === nextId).video
                            let videoTitle = videoName.split('_').join(' ').split('.')[0]
                            mediaElem.innerHTML = `<video alt='${videoTitle}' controls>
                            <source src="assets/portfolio/${authorName}/${videoName}" type="video/mp4">
                            Your browser does not support the video tag.
                            </video>
                            <figcapture title='${videoTitle}'>
                            ${videoTitle}</figcapture>`
                        }
                        titleElem.textContent = mediaTitle
                        
                    }
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
                        let mediaTitle = portfolio.find(media => media.id === prevId).title
                        
                        if(portfolio.find(media => media.id === prevId).image){
                            let photoName = portfolio.find(media => media.id === prevId).image
                            mediaElem.innerHTML = `<img alt='${mediaTitle}' src='assets/portfolio/${authorName}/${photoName}'>
                            <figcapture title='${mediaTitle}'>${mediaTitle}</figcapture>`
                        }else if(portfolio.find(media => media.id === prevId).video){
                            let videoName = portfolio.find(media => media.id === prevId).video
                            let videoTitle = videoName.split('_').join(' ').split('.')[0]
                            mediaElem.innerHTML = `<video alt='${videoTitle}' controls>
                            <source src="assets/portfolio/${authorName}/${videoName}" type="video/mp4">
                            Your browser does not support the video tag.
                            </video>
                            <figcapture title='${videoTitle}'>
                            ${videoTitle}</figcapture>`
                        }

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