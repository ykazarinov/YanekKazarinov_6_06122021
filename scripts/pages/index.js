

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section"); 
        photographers.forEach((photographer) => {
            const photographerModel = new photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);

                       
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();

    // click on one photograph

    document.addEventListener('click',e => {
        if(e.target.classList.contains('img_link') || e.target.classList.contains('title_link')){
            const currentId = e.target.parentElement.parentElement.id // get photographer id
            localStorage.setItem( 'id', currentId ) // set id to localStorage
        }
      })
    