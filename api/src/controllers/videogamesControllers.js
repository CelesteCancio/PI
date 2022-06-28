const {Videogame, Genre} = require ('../db');
const axios = require ('axios');
const { Op } = require('sequelize');
const {
    API_KEY,
} = process.env;


//Ruta GET, con parametro ID:

//ANDA OK
function getVideogameById (id){
    const regex = /[a-zA-Z]/;
        if (regex.test(id)){
            console.log(`db`);
            return getVideogameByIdFromDB(id);
        }
        else{
            console.log(`api`);
            return getVideogameByIdFromAPI(id);
        }
}

//anda OK, solo falta q traiga unicamente los datos q necesito para el front
async function getVideogameByIdFromAPI (id){
    try {
        console.log(`en getVideogamesByIdFromAPI, id ${id}`)

        //si anda:
        let videogame = (await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data; 
        return videogame;

        //si anda:
        // let videogame = axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        // .then(response => response.data);
        // return videogame;

        //no anda:
        // let videogame = fetch.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        // .then(response => response.json())
        // .then(game => {game.results.name, game.results.id, game.results.genres, game.results["background_image"], game.results.rating});
        // return videogame;
    
    } catch (error) {
        throw new Error (`No se pudo obtener el videojuego de id ${id} de la API, ${error}`);
    }
}

//anda OK, solo falta q traiga unicamente los datos q necesito para el front
async function getVideogameByIdFromDB (id){
    try {
        const foundVideogame = await Videogame.findByPk(id,{
            include: Genre
        });
        return foundVideogame;
    } catch (error) {
        throw new Error (`No se pudo encontrar el videojuego en la base de datos, ${error}`);
    }
}

//Ruta GET, con y sin query. Para traer todos los videojuegos o solo los del nombre, de DB y de API.

function getVideogames (name){
    if (name){
        return getVideogamesByName (name);
    }
    else{
        return getAllVideogames ();
    }
}

//ESTA OK:
async function getAllVideogames (){
    try {
        const allVideogamesFromAPI = await getAllVideogamesFromAPI ();
        const allVideogamesFromDB = await getAllVideogamesFromDB ();

        const allVideogames = [...allVideogamesFromDB, ...allVideogamesFromAPI];
        return allVideogames;
    } catch (error) {
        throw new Error (`No se pudieron cargar todos los videojuegos, ${error}`);
    }
}

//ESTA OK, trae solo los primeros 100 juegos, y solo la informacion necesaria para el front
async function getAllVideogamesFromAPI (){
    try {
        //ASI NO anda:
        // let videogames = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        // .then(response => response.data.map (videogame => ({
        //    name: videogame.name,             
        //     image: videogame["background_image"],
        //     genres: videogame.genres.map (genre => genre.name)
        // })))
                
        //ASI SI, pero trae solo 20 xq es un solo llamado
        // let videogamesComplete = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results; 
        // let videogames = videogamesComplete.map(videogame => ({
        //     name: videogame.name,             
        //     image: videogame["background_image"],
        //     genres: videogame.genres.map (genre => genre.name)
        // }));
        // return videogames;

        // let videogamesComplete1 = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results; 
        // let videogamesComplete1 = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results;

    
        let URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
        let videogames100 = [];
        for (let i = 0; i < 5; i++) {
            let videogamesComplete20 = (await axios(URL)).data; 
            URL = videogamesComplete20.next;
            console.log(i,URL);
            let videogames20 = videogamesComplete20.results.map(videogame => ({
                name: videogame.name,             
                image: videogame["background_image"],
                genres: videogame.genres.map (genre => genre.name)
            }));
            console.log(videogames20[0]);
            videogames100 = [...videogames100, ...videogames20];           
        }
        return videogames100;
    } catch (error) {
        throw new Error (`No se pudieron obtener los generos de la API, ${error}`);
    }    
}

//ESTA OK: trae nombre, genero e imagen (hay q ver si queda y si la pido en el post del front)
async function getAllVideogamesFromDB (){
    try {
        const foundVideogamesComplete = await Videogame.findAll({
            include: Genre
        });
        const foundVideogames = foundVideogamesComplete.map(foundVideogame => ({
            name: foundVideogame.name,
            image: foundVideogame.image,
            genres: foundVideogame.Genres.map (genre => genre.name)
        }));        
        return foundVideogames;        
    } catch (error) {
        throw new Error (`No se encontraron videojuegos cargados en la base de datos, ${error}`);
    }     
}

function getVideogamesByName (name){
    
    console.log(`Soy getVideogamesByName, quien acaba de recibir el nombre ${name}`);
    const videogamesByNameFromDB = getVideogamesByNameFromDB (name);
    //getVideogamesByNameFromAPI (name);    
    return videogamesByNameFromDB;
}

function getVideogamesByNameFromAPI (name){

}

async function getVideogamesByNameFromDB (name){
    
    try {
        const foundVideogamesName = await Videogame.findAll({
            // where: {
            //     name: {
            //         //no anda la regexp
            //         [Op.regexp]: `/(${name})/i`
            //     }
            // }
        });
        return foundVideogamesName;
    } catch (error) {
        throw new Error (`No se pudieron obtener los videojuegos con el nombre ${name} de la DB, ${error}`);
    }

}




//Ruta POST, agregar videojuego a la DB
//ANDA OK
async function addVideogame (videogame){
    const genresId = videogame.genresId; //tiene q ser un arreglo y llamarse igual en el envio de info desde front
    try {
        const newVideogame = await Videogame.create({...videogame});
        await newVideogame.addGenre (genresId);    
        return newVideogame;
    } catch (error) {
        throw new Error (`No se pudo agregar el videojuego la base de datos, ${error}`);
    }
}

module.exports = { 
    getVideogameById,
    getVideogames,
    addVideogame
 }