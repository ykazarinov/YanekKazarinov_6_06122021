class LikesCounter {
    constructor() {
        
        this._$wishCount = document.querySelector('.total-likes__count')
        this._count = Number(this._$wishCount.textContent)
    }

    update(action) {
        // let totalValue = Number(this._$wishCount.textContent)
        if (action === 'INC') {
            this._count += 1
        } else if (action === 'DEC') {
            this._count -= 1
        } else {
            throw "Unknow action" 
        }

        this._$wishCount.innerHTML = this._count 
    }
}