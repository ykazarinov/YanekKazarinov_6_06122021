class lightBox extends mediaConstructor{
    constructor(id){
        super(id)
        
        this.lightBox = document.createElement( 'div' )
        
        this.ProxyRatingSorter = new ProxyRatingSorter()

        this.tabElementsOfPhotographerPage = {
            'header a' : 1,
             '.author-page-title' : 2,
             '.infoPlus' : 3,
             '#open-modal-form' : 4,
             '.img_link' : 5,
            '.total-likes' : 6,
             '.price' : 6,
             '.sorting_label' : 7,
             '.current-value' : 8,
             '.sorting__options__value' : 8,
             '.portfolio_img' : 9,
             'video' : 9,
             '.media-name' : 9,
             '.media-likes' : 9,
        }

    
        
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
        let myPortfolio = ''
       
        // Place the images in the currently selected order
        if (sorterOrderBy){
           myPortfolio = await this.ProxyRatingSorter.sorter(portfolio, sorterOrderBy)
           return myPortfolio.data
        }
        // If the order is not selected, then we take the data directly from the source (in an unsorted form)
        else{
            return portfolio
        }
        

        
    }

    deleteTabindex(){
        let tabElems = this.tabElementsOfPhotographerPage
        Object.keys(tabElems).forEach(function(key, id) {
            let oldValue = tabElems[key]
            tabElems[key] = -1
            let allElemsOfClass = document.querySelectorAll(key)
            for (var i=0; i < allElemsOfClass.length; i++) {
                allElemsOfClass[i].setAttribute('tabindex', tabElems[key])
            }
            tabElems[key] = oldValue
            // console.log('id: '+id); // id
            // console.log('key: '+ key); // key
            // console.log(tabElems[key]); //value
            // console.log('----------')
        });
    }

    setTabIndex(){
        let newTabElems = this.tabElementsOfPhotographerPage
        Object.keys(newTabElems).forEach(function(key, id) {
            let allElemsOfClass = document.querySelectorAll(key)
            for (var i=0; i < allElemsOfClass.length; i++) {
                allElemsOfClass[i].setAttribute('tabindex', newTabElems[key])
            }
        })
    }




    closeLightbox(){
        const lightBox = document.querySelector('.for-lightbox')
        lightBox.innerHTML = ''
        this.setTabIndex()
    }


    async arrowClick(id, authorId, authorName){
        let rightArrow = document.querySelector('.fa-chevron-right')
        let leftArrow = document.querySelector('.fa-chevron-left')

        let currentId = id
        let nextId
        let prevId

        let portfolio = await this.getAllMediaOfCurrentAuthor(authorId)
        console.log(portfolio)

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

        function rightOrLeftClick(secondId){
            let mediaElem = document.querySelector('.lightbox__slider figure')
            let mediaTitle = portfolio.find(media => media.id === secondId).title
            if(portfolio.find(media => media.id === secondId).image){
                let photoName = portfolio.find(media => media.id === secondId).image
                mediaElem.innerHTML = `<img tabindex='2' alt='${mediaTitle}' src='assets/portfolio/${authorName}/${photoName}'>
                <figcapture tabindex='3' title='${mediaTitle}'>${mediaTitle}</figcapture>`
            }else if(portfolio.find(media => media.id === secondId).video){
                let videoName = portfolio.find(media => media.id === secondId).video
                let videoTitle = videoName.split('_').join(' ').split('.')[0]
                mediaElem.innerHTML = `<video tabindex='2' alt='${videoTitle}' controls>
                <source src="assets/portfolio/${authorName}/${videoName}" type="video/mp4">
                Your browser does not support the video tag.
                </video>
                <figcapture tabindex='3' title='${videoTitle}'>
                ${videoTitle}</figcapture>`
            }
        }

        function rightClick(){
            prevId = currentId
            portfolio.forEach(function(item, index) {
                if(item.id === currentId){
                    if (index < portfolio.length - 1) {
                        nextId = portfolio[index + 1].id
                        rightOrLeftClick(nextId)
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
        }

        function leftClick(){
            nextId = currentId
            portfolio.forEach(function(item, index) {
                if(item.id === currentId){
                    if (index > 0) {
                        prevId = portfolio[index - 1].id
                        rightOrLeftClick(prevId)
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
        }

        function keysDown(){
            document.addEventListener("keyup", (key) => {
                if(key.code == "ArrowLeft" ){
                    leftClick()
                }else if (key.code == "ArrowRight"){
                    rightClick()
                }
            })
        }

        keysDown()

        rightArrow.addEventListener('click', function(){
            rightClick()
        })
        rightArrow.addEventListener('keypress', function(key){
            if(key.code == 'Enter'){
               rightClick() 
            }
        })

        leftArrow.addEventListener('click', function(){
            leftClick()
        })
        leftArrow.addEventListener('keypress', function(key){
            if(key.code == 'Enter'){
               leftClick() 
            }
        })
       
    } 



   

    async getLightBox(id, photographerId, title, image){
        this.deleteTabindex()
        let result = this.getCurrentPhotographName(photographerId)
        .then(reponse => {
            
            let PhotographName = reponse
            
        
        
        this.lightBox.classList.add('lightbox')
        let content = `
        <div class='lightbox__container' tabindex = '1' autofocus aria-label='image closeup view'>
            <div class='lightbox__close'><i class="fas fa-times" tabindex='6' aria-label='Close dialog'></i></div>
            <div class='lightbox__slider'>
                <div class='left_arrow'><i class="fas fa-chevron-left" tabindex='4' aria-label='Previous image'></i></div>
                <figure>
                    <img alt='${title}' tabindex='2' src='assets/portfolio/${PhotographName}/${image}'>
                    <figcapture tabindex='3'>
                        ${title}
                    </figcapture>
                </figure>
                <div class='right_arrow'><i class="fas fa-chevron-right" tabindex='5' aria-label='Next image'></i></div>
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