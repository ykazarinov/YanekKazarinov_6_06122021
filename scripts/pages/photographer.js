//Mettre le code JavaScript lié à la page photographer.html

let currentId = localStorage['id']
    // localStorage.removeItem( 'id' )

async function getCurrentPhotograph() {
    const { photographers } = await getPhotographers()
    const currentPhotographer = await photographers.find(photographer => photographer.id == currentId)
    return currentPhotographer
}

async function getPortfolio(){
    const { media } = await getPhotographers()
    const portfolio = await media.filter(media => media.photographerId == currentId)
    return portfolio
}

async function displayPortfolio(media, MyLikesSubject) { 




 
    let portfolioContainer = document.querySelector('.portfolio-container')

    media.forEach((media) => {
        
        const mediaModel = new mediaFactory(media, MyLikesSubject);
        
        const mediaCardDOM = mediaModel.getMediaCardDOM()
        .then(response => {
            portfolioContainer.appendChild(response)
        })
        
           
    });
}

async function totalLikes(){
    let total = 0
    const arrCounts = await getPortfolio()
    
    arrCounts.forEach( (media) =>{
       total = total + media.likes
    })


    return total
}

async function init() {
    
    let total = await totalLikes()
    
    // Preparing and filling in information about the current photographer
    const currentPhotographerElem = document.querySelector('.photograph-header')
    let currentPhotographArray = await getCurrentPhotograph()
    const currentPhotographer = new photographerTemplate(currentPhotographArray)
   
    let photographInfo = await currentPhotographer.getCurrentUserCardDOM(total)
    currentPhotographerElem.innerHTML = photographInfo.outerHTML

    const selectContainer = document.querySelector('.select-container')

   

    // Preparing and filling portfolio of current photographer

    const media  = await getPortfolio()
            // likes
    
            let MyLikesSubject = new LikesSubject()
        
            const MyLikesCounter = new LikesCounter()
          
            MyLikesSubject.subscribe(MyLikesCounter) 
    displayPortfolio(media, MyLikesSubject)
    
    
    // sorting
    const main = document.getElementById('main')
    
    const sorting = new sortingTemplate(media, MyLikesSubject)
      
    let selectForm = sorting.getSortingDOM()

    selectContainer.innerHTML = selectForm
    sorting.hover()
    sorting.openCloseSelect()
    sorting.chooseSelectValue(total, MyLikesSubject)


}

init()




