class tabIndex{
    constructor(){
        this.tabElementsOfPhotographerPage = {
            'header a' : 1,
             '.author-page-title' : 2,
             '.infoPlus' : 3,
             '#open-modal-form' : 4,
             '.img_link' : 5,
            '.total-likes' : 6,
             '.price' : 6,
             '.sorting_label' : 7,
             '.current-value' : 8,
             '.sorting__options__value' : 8,
             '.portfolio_img' : 9,
             'video' : 9,
             '.media-name' : 9,
             '.media-likes' : 9,
        }

    }
    deleteTabindex(){
        let tabElems = this.tabElementsOfPhotographerPage
        Object.keys(tabElems).forEach(function(key, id) {
            let oldValue = tabElems[key]
            tabElems[key] = -1
            let allElemsOfClass = document.querySelectorAll(key)
            for (var i=0; i < allElemsOfClass.length; i++) {
                allElemsOfClass[i].setAttribute('tabindex', tabElems[key])
            }
            tabElems[key] = oldValue
            // console.log('id: '+id); // id
            // console.log('key: '+ key); // key
            // console.log(tabElems[key]); //value
            // console.log('----------')
        });
    }

    setTabIndex(){
        let newTabElems = this.tabElementsOfPhotographerPage
        Object.keys(newTabElems).forEach(function(key, id) {
            let allElemsOfClass = document.querySelectorAll(key)
            for (var i=0; i < allElemsOfClass.length; i++) {
                allElemsOfClass[i].setAttribute('tabindex', newTabElems[key])
            }
        })
    }
}