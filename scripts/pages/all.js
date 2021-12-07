async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json

    const photographers = await fetch('data/photographers.json')
    .then(response => response.json())

    // et bien retourner le tableau photographers seulement une fois
      return photographers
}