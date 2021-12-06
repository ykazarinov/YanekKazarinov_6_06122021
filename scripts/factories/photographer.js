function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait } = data; 

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        let content = `
            <a href="#"><img alt="" src="${picture}"></a>
            <h2><a href="#">${name}</a></h2>
            <div class="infoPlus">
                <div class="place">${city}, ${country}</div>
                <div class="tagline">${tagline}</div>
                <div class="price">${price}€/jour</div>
            </div>
        `

        article.innerHTML = content

        return (article);
    }
    return { name, picture, getUserCardDOM }
}


