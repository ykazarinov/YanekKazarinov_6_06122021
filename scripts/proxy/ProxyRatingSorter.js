class ProxyRatingSorter {
    constructor() {
        this.cache = []
    }

    async sorter(medias, orderBy) {
        const cachedResult = this.cache.find(elt => elt.key === orderBy)
        if (cachedResult) {
            console.log('get from cache')
            sorterOrderBy = orderBy
            return cachedResult
        }

        const data = await RatingSorterApi.sorter(medias, orderBy)
        console.log('get from db')
        this.cache.push(data)
        sorterOrderBy = orderBy
        return data
    }
}