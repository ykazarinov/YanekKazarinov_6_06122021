class sortingTemplate{
    constructor(){
        this.sortingValues = ['Popularité', 'Date', 'Titre']
       
    }

    getSortingDOM(){
        const selectContainer = document.createElement( 'div' )
        selectContainer.classList.add('select-container')
        let content = `
            <label for="sorting">Trier par</label>


            <ul id='sorting' class='sorting sorting--closed'>
                <li class='current-value'> 
                    <span class='current-value__span'>${this.sortingValues[0]}</span>
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.88 10.5466L8 4.43996L14.12 10.5466L16 8.66663L8 0.66663L1.64355e-07 8.66663L1.88 10.5466Z" fill="white"/>
                    </svg>
                    <ul class='sorting__options hidden'>
                        <li class='sorting__options__value'>${this.sortingValues[1]}</li>
                        <li class='sorting__options__value'>${this.sortingValues[2]}</li>
                    </ul>
                </li>
               
            </ul>
        `
        
        selectContainer.innerHTML = content
        return selectContainer
    }
}