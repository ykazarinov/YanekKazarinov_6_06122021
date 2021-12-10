class sortingTemplate{
    constructor(Medias){
        this.sortingValues = ['Popularité', 'Date', 'Titre']
        this.Medias = Medias

        this.$portfolioContainer = document.querySelector('.portfolio-container')
        this.ProxyRatingSorter = new ProxyRatingSorter()
       
    }

    clearPortfolioContainer(){
      
        this.$portfolioContainer.innerHTML = ''
    }

    // select-sorting
    async openCloseSelect() {
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




    async sorterMedias(sorter) {
        this.clearPortfolioContainer() 
       
        if (!!sorter) {
            // Vous pourrez supprimer cette ligne
            //  const sortedData = await RatingSorterApi.sorter(this.Medias, sorter)

            const sortedData = await this.ProxyRatingSorter.sorter(this.Medias, sorter)

            const SortedMedias = sortedData.data 

            SortedMedias.forEach(Media => {
                const Template = new imageConstructor(Media)
                const mediaCardDOM = Template.getImageCardDOM()
                .then(response => {
                    this.$portfolioContainer.appendChild(response)
                })
               
            })
            } 
            else {
                this.Medias.forEach(Media => {
                    const Template = new imageConstructor(Media)
                    this.$portfolioContainer.appendChild(Template.getImageCardDOM())
                })
            }
    }


    //choosing value in select-sorting
    chooseSelectValue(){
        document.addEventListener('click',e => {
            e.preventDefault()
            if(e.target.classList.contains('sorting__options__value')){
                const currentElem = document.querySelector('.current-value__span')
                const oldTextValue = currentElem.textContent
                const newTextValue = e.target.textContent

                e.target.textContent = oldTextValue
                e.target.setAttribute('value', oldTextValue)

                currentElem.textContent = newTextValue
                currentElem.setAttribute('value', newTextValue)

                // console.log(currentElem.getAttribute('value'))
                this.sorterMedias(currentElem.getAttribute('value'))
            }
        })
    }

    getSortingDOM(){
        
        // this.selectContainer.classList.add('select-container')
        let content = `
            <label for="sorting">Trier par</label>


            <ul id='sorting' class='sorting sorting--closed'>
                <li class='current-value'> 
                    <span class='current-value__span' value='${this.sortingValues[0]}'>${this.sortingValues[0]}</span>
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.88 10.5466L8 4.43996L14.12 10.5466L16 8.66663L8 0.66663L1.64355e-07 8.66663L1.88 10.5466Z" fill="white"/>
                    </svg>
                    <ul class='sorting__options hidden'>
                        <li class='sorting__options__value' value='${this.sortingValues[1]}'>${this.sortingValues[1]}</li>
                        <li class='sorting__options__value' value='${this.sortingValues[2]}'>${this.sortingValues[2]}</li>
                    </ul>
                </li>
               
            </ul>
        `
        
        // this.selectContainer.innerHTML = content
        return content
    }

  


}