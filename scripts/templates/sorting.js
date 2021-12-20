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
        const sorterTitle = await document.querySelector('.current-value')  // element with current value
        const sortingOptions = await document.querySelector('.sorting__options') // group of elements which we choose
        const sorting = await document.querySelector('.sorting') // total element

        const arrow = await document.querySelector('.sorting-arrow')

        const sortingOptionsValue = await document.querySelectorAll('.sorting__options__value')
        const sortingOptionsValueLast = await document.querySelector('.sorting__options__value:last-child')

        let openSelect = function(){
            sortingOptions.classList.contains('hidden') ? sortingOptions.classList.remove('hidden') : sortingOptions.classList.add('hidden')

            if(sorting.classList.contains('sorting--closed')){
                 console.log('1')
                sorting.classList.remove('sorting--closed')
                sorting.classList.add('sorting--opened')

                arrow.classList.remove('fa-chevron-down')
                arrow.classList.add('fa-chevron-up')
            } else{
                 console.log('2')
                sorting.classList.remove('sorting--opened')
                sorting.classList.add('sorting--closed')

                arrow.classList.add('fa-chevron-down')
                arrow.classList.remove('fa-chevron-up')
            }
        }

        sorterTitle.addEventListener('keypress', openSelect)
  
        sorterTitle.addEventListener('click', openSelect)
      
        sortingOptionsValueLast.addEventListener('blur', function(){
            sortingOptions.classList.add('hidden')
            sorting.classList.remove('sorting--opened')
            sorting.classList.add('sorting--closed')
            arrow.classList.add('fa-chevron-down')
            arrow.classList.remove('fa-chevron-up')
        })
       
    }

   



    async sorterMedias(sorter, LikesSubject) {
        this.clearPortfolioContainer() 

        const MyLikesSubject = LikesSubject
        // console.log(MyLikesSubject)
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
    async chooseSelectValue(total, LikesSubject){
        const sortingOptions = await document.querySelector('.sorting__options') // group of elements which we choose
        const sorting = await document.querySelector('.sorting') // total element
        const arrow = await document.querySelector('.sorting-arrow')
       
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

        document.querySelector('#sorting').addEventListener('keypress', e => {
            e.preventDefault()
            if(e.key === ' ' || e.key === 'Enter'){
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
            
            }

        })
    }

    getSortingDOM(){

        // this.selectContainer.classList.add('select-container')
        let content = `
            <label for="sorting" tabindex="7" class='sorting_label'>Trier par</label>


            <ul id='sorting' class='sorting sorting--closed' >
                <li class='current-value' tabindex="8" role='listbox'>  
                    <i class="sorting-arrow fas fa-chevron-down"></i>
                    <span class='current-value__span selected' role="button"  aria-selected aria-haspopup='listbox' aria-expanded  title='${this.sortingValues[0]}' value='${this.sortingValues[0]}'>${this.sortingValues[0]}</span>
                    

                    <ul class='sorting__options hidden'>
                        <li role = "listbox" aria-activedescendant  tabindex="8" class='sorting__options__value' title='${this.sortingValues[1]}' value='${this.sortingValues[1]}'>${this.sortingValues[1]}</li>
                        <li role = "listbox" aria-activedescendant  tabindex="8" class='sorting__options__value' title='${this.sortingValues[2]}' value='${this.sortingValues[2]}'>${this.sortingValues[2]}</li>
                    </ul>
                </li>
               
            </ul>
        `
        
        // this.selectContainer.innerHTML = content
        return content
    }

  


}