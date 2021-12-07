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
    console.log(portfolio);
    return portfolio
}

async function init() {
    // Preparing and filling in information about the current user
    const currentPhotographerElem = document.querySelector('.photograph-header')
    let currentPhotographArray = await getCurrentPhotograph()
    const currentPhotographer = new photographerFactory(currentPhotographArray)
    let photographInfo = await currentPhotographer.getCurrentUserCardDOM()
    currentPhotographerElem.innerHTML = photographInfo.outerHTML
}

init()


// getPortfolio()

