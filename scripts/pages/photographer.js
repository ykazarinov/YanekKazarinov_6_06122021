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

async function displayPortfolio(media) { 
    // const portfolioContainer = document.querySelector(".portfolio-container"); 
    let portfolioContainer = document.createElement('section')
    portfolioContainer.classList.add('portfolio-container')
    document.getElementById('main').appendChild(portfolioContainer)

    media.forEach((media) => {
         const mediaModel = new imageConstructor(media);
        const mediaCardDOM = mediaModel.getImageCardDOM()
        .then(response => {
            portfolioContainer.appendChild(response)
        })
                 
        // photographersSection.appendChild(userCardDOM);

                   
    });
}

// select-sorting
async function openCloseSelect() {
    const sorterTitle = await document.querySelector('.current-value')
    const sortingOptions = await document.querySelector('.sorting__options')
    const sorting = await document.querySelector('.sorting')

    sorterTitle.addEventListener('click', function(e) {
        sortingOptions.classList.contains('hidden') ? sortingOptions.classList.remove('hidden') : sortingOptions.classList.add('hidden')
        if(sorting.classList.contains('sorting--closed')){
            sorting.classList.remove('sorting--closed')
            sorting.classList.add('sorting--opened')
        } else{
            sorting.classList.remove('sorting--opened')
            sorting.classList.add('sorting--closed')
        }
        
    })
}



//choosing value in select-sorting
function chooseSelectValue(){
    document.addEventListener('click',e => {
        if(e.target.classList.contains('sorting__options__value')){
            const currentElem = document.querySelector('.current-value__span')
            const oldValue = currentElem.textContent
            const newValue = e.target.textContent
            e.target.textContent = oldValue
            currentElem.textContent = newValue
        }
      })
}

async function init() {
    // Preparing and filling in information about the current photographer
    const currentPhotographerElem = document.querySelector('.photograph-header')
    let currentPhotographArray = await getCurrentPhotograph()
    const currentPhotographer = new photographerTemplate(currentPhotographArray)
    let photographInfo = await currentPhotographer.getCurrentUserCardDOM()
    currentPhotographerElem.innerHTML = photographInfo.outerHTML

    // sorting
    const main = document.getElementById('main')
    const sorting = new sortingTemplate()

    let getSorting = sorting.getSortingDOM()
    main.appendChild(getSorting)

    

    // Preparing and filling portfolio of current photographer

    const media  = await getPortfolio()
    displayPortfolio(media)

    openCloseSelect()
     chooseSelectValue()
}

init()




