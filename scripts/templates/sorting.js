class sortingTemplate{
    constructor(){
        this.sortingValues = ['Popularité', 'Date', 'Titre']
        this.direction = ['ascending', 'descending']
    }

    getSortingDOM(){
        const selectContainer = document.createElement( 'div' )
        selectContainer.classList.add('select-container')
        let content = `
            <label for="sorting">Trier par</label>
            <select name="sorting" id='sorting'>
                <option value="value1" selected class='${this.direction[0]}'>${this.sortingValues[0]}</option>
                <option value="value1">${this.sortingValues[1]}</option>
                <option value="value1">${this.sortingValues[2]}</option>
            </select>
        `
        
        selectContainer.innerHTML = content
        return selectContainer
    }
}