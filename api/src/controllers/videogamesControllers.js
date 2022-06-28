const {Videogame, Genre} = require ('../db');
const axios = require ('axios');
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
        console.log(getVideogamesByName (name));
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

function getVideogamesByName (name){
    
    getVideogamesByNameFromAPI (name);
    getVideogamesByNameFromDB (name);
    return `Soy getVideogamesByName, quien acaba de recibir el nombre ${name}`;
}

function getVideogamesByNameFromAPI (name){

}

function getVideogamesByNameFromDB (name){
    
}

//ESTA OK, pero falta q traiga solo 100 juegos
async function getAllVideogamesFromAPI (){
    try {
        //ASI NO:
        // let videogames = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        // .then(response => response.data.map (videogame => ({
        //    name: videogame.name,             
        //     image: videogame["background_image"],
        //     genres: videogame.genres.map (genre => genre.name)
        // })))
                
        let videogamesComplete = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results; 
        let videogames = videogamesComplete.map(videogame => ({
            name: videogame.name,             
            image: videogame["background_image"],
            genres: videogame.genres.map (genre => genre.name)
        }));
        return videogames;
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


//Ruta POST, agregar videojuego a la DB
//ANDA OK pero creo q hay q agregar el campo imagen
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