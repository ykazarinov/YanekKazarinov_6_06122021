class sortingTemplate{
    constructor(Medias){
        this.sortingValues = ['Popularité', 'Date', 'Titre']
        this.Medias = Medias

        this.$portfolioContainer = document.querySelector('.portfolio-container')
        this.ProxyRatingSorter = new ProxyRatingSorter()

       
       
    }

    async hover(){
        let hoveredElem = await document.querySelector('.current-value__span')
        let arrow = await document.querySelector('.sorting-arrow')
        hoveredElem.addEventListener('mouseover', function(){
            arrow.classList.add('black-text')
        })
        hoveredElem.addEventListener('mouseout', function(){
            arrow.classList.remove('black-text')
        })
    }

    clearPortfolioContainer(){
      
        this.$portfolioContainer.innerHTML = ''
    }

    // select-sorting
    async openCloseSelect() {
        const sorterTitle = await document.querySelector('.current-value')
        const sortingOptions = await document.querySelector('.sorting__options')
        const sorting = await document.querySelector('.sorting')

        const arrow = await document.querySelector('.sorting-arrow')

        sorterTitle.addEventListener('click', function(e) {
            sortingOptions.classList.contains('hidden') ? sortingOptions.classList.remove('hidden') : sortingOptions.classList.add('hidden')
            if(sorting.classList.contains('sorting--closed')){
                sorting.classList.remove('sorting--closed')
                sorting.classList.add('sorting--opened')

                arrow.classList.remove('fa-chevron-down')
                arrow.classList.add('fa-chevron-up')
            } else{
                sorting.classList.remove('sorting--opened')
                sorting.classList.add('sorting--closed')

                arrow.classList.add('fa-chevron-down')
                arrow.classList.remove('fa-chevron-up')
            }
            
        })
    }




    async sorterMedias(sorter, LikesSubject) {
        this.clearPortfolioContainer() 

        const MyLikesSubject = LikesSubject
        console.log(MyLikesSubject)
        MyLikesSubject.unsubscribe(LikesCounter)

        const MyLikesCounter = new LikesCounter()
        
        MyLikesSubject.subscribe(MyLikesCounter) 
       
        if (!!sorter) {
            // Vous pourrez supprimer cette ligne
            //  const sortedData = await RatingSorterApi.sorter(this.Medias, sorter)

            const sortedData = await this.ProxyRatingSorter.sorter(this.Medias, sorter)

            const SortedMedias = sortedData.data 



            SortedMedias.forEach(Media => {
                const Template = new mediaFactory(Media, MyLikesSubject)
                const mediaCardDOM = Template.getMediaCardDOM()
                .then(response => {
                    this.$portfolioContainer.appendChild(response)
                })
               
            })
            } 
            else {
                this.Medias.forEach(Media => {
                    const Template = new mediaFactory(Media, MyLikesSubject)
                    this.$portfolioContainer.appendChild(Template.getMediaCardDOM())
                })
            }
    }


    //choosing value in select-sorting
    chooseSelectValue(total, LikesSubject){
       
        // console.log(LikesSubject)

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
                document.querySelector('.total-likes__count').innerHTML = total
                this.sorterMedias(currentElem.getAttribute('value'), LikesSubject)

                
            }
        })
    }

    getSortingDOM(){

        // this.selectContainer.classList.add('select-container')
        let content = `
            <label for="sorting">Trier par</label>


            <ul id='sorting' class='sorting sorting--closed'>
                <li class='current-value'> 
                    <i class="sorting-arrow fas fa-chevron-down"></i>
                    <span class='current-value__span' value='${this.sortingValues[0]}'>${this.sortingValues[0]}</span>
                    

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