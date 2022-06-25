const {Genre} = require ("../db");
const axios = require ("axios");
const {
    API_KEY,
} = process.env;


function getGenresFromAPI (){
    try {
        axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        .then(response => response.data.results.map(genre => insertGenresIntoDb (genre.id, genre.name)));
    } catch (error) {
        throw new Error (`No se pudieron obtener los generos de la API, ${error}`);
    }
}

async function insertGenresIntoDb (genreId, genreName){
    try {
        await Genre.create({
            id: genreId, 
            name: genreName
        });
    } catch (error) {
        throw new Error (`No se pudieron agregar los generos de la API en la base de datos, ${error}`);
    }
}

async function showGenres (){
    try {
        const foundGenres = await Genre.findAll();
        return foundGenres;
    } catch (error) {
        throw new Error (`No se encontraron generos cargados en la base de datos, ${error}`);
    }
};

module.exports = {
    getGenresFromAPI,
    showGenres
}