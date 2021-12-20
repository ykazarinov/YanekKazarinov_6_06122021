//Mettre le code JavaScript lié à la page photographer.html

//  let currentId = localStorage['id']

const urlSearchParams = new URLSearchParams(window.location.search)
const params = Object.fromEntries(urlSearchParams.entries());
let currentId = params.id

// let currentId = window.location.search.split("id=")[1];

let sorterOrderBy




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

//contact modal
async function makeContactModal(currentAuthotName){
      
    let buttonContact = await document.getElementById('open-modal-form')
    let openModal = function(e){
        
        e.target.blur()
        
        let myContactModal = new contactModal(currentAuthotName)
            myContactModal.displayModal()

            let close = document.querySelector('.modal .close')
            close.addEventListener('click', function(e){
                myContactModal.closeModal()
            })

            close.addEventListener('keypress', function(key){
                if(key.code == 'Enter'){
                    myContactModal.closeModal()
                }
                
            })

            document.addEventListener("keyup", (key) => {
                if(key.code == "Escape"){
                    myContactModal.closeModal()
                }
            })

            myContactModal.checkTheForm()
    }

     buttonContact.addEventListener('keypress',  openModal)
     buttonContact.addEventListener('click',  openModal)
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

    let authorName = await getCurrentPhotograph()
    
    makeContactModal(authorName.name)

  

}

init()




