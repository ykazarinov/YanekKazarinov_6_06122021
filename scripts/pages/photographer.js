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

async function displayPortfolio(media) {
    // const photographersSection = document.querySelector(".photographer_section"); 
    let portfolioContainer = document.createElement('section')
    portfolioContainer.classList.add('portfolio-container')
    document.getElementById('main').appendChild(portfolioContainer)

    media.forEach((media) => {
        const photographerModel = new photographerFactory(media);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);

                   
    });
};

async function init() {
    // Preparing and filling in information about the current photographer
    const currentPhotographerElem = document.querySelector('.photograph-header')
    let currentPhotographArray = await getCurrentPhotograph()
    const currentPhotographer = new photographerTemplate(currentPhotographArray)
    let photographInfo = await currentPhotographer.getCurrentUserCardDOM()
    currentPhotographerElem.innerHTML = photographInfo.outerHTML

    // Preparing and filling portfolio of current photographer
  
}

init()


// getPortfolio()

