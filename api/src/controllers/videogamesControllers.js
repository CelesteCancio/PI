const {Videogame, Genre} = require ('../db');
const axios = require ('axios');
const { Op } = require('sequelize');
const {
    API_KEY,
} = process.env;


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

        console.log(`estoy en getAllvdFromAPI`)
        let URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
        let videogames100 = [];
        for (let i = 0; i < 5; i++) {
            let videogamesComplete20 = (await axios(URL)).data; 
            URL = videogamesComplete20.next;
            console.log(i,URL);
            let videogames20 = videogamesComplete20.results.map(videogame => ({
                name: videogame.name,             
                image: videogame["background_image"],
                genres: videogame.genres.map (genre => genre.name),
                rating: videogame.rating,
                id: videogame.id,
                platforms: videogame.platforms.map (p => p.platform.name),
                released: videogame.released,
            }));
            console.log(videogames20[0]);
            videogames100 = [...videogames100, ...videogames20];           
        }
        return videogames100;
    } catch (error) {
        throw new Error (`No se pudieron obtener los videojuegos de la API, ${error}`);
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
            genres: foundVideogame.Genres.map (genre => genre.name),
            rating: foundVideogame.rating,
            id: foundVideogame.id,
            platforms: foundVideogame.platforms,
            released: foundVideogame.released,
        }));        
        return foundVideogames;        
    } catch (error) {
        throw new Error (`No se encontraron videojuegos cargados en la base de datos, ${error}`);
    }     
}

//ANDA OK y devuelve solo 15
async function getVideogamesByName (name){
    
    try {
        
        const videogamesByNameFromDB = await getVideogamesByNameFromDB (name);        
        const videogamesByNameFromAPI = await getVideogamesByNameFromAPI (name);         
        const allVideogamesByName = [...videogamesByNameFromDB, ...videogamesByNameFromAPI]; 

        if (allVideogamesByName.length>15){            
            const allVideogamesByName15 = allVideogamesByName.slice(0,15)            
            return allVideogamesByName15;            
        } 

        if (allVideogamesByName.length>0) return allVideogamesByName; 
        else return `No se encontraron videojuegos con el nombre ${name}`;
    } catch (error) {
        throw new Error (`No se encontraron videojuegos con el nombre ${name}, ${error}`);
    }
    
}

//ANDA OK:
async function getVideogamesByNameFromAPI (name){

        try {
            let foundVideogamesComplete = (await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data.results; 
            let foundVideogames = foundVideogamesComplete.map(videogame => ({
            name: videogame.name,             
            image: videogame["background_image"],
            genres: videogame.genres.map (genre => genre.name),
            rating: videogame.rating,
            id:videogame.id
            }));
            return foundVideogames;  
        } catch (error) {
            throw new Error (`No se encontraron videojuegos en la API con el nombre ${name}, ${error}`);
        }
}

//ANDA OK
async function getVideogamesByNameFromDB (name){
    
    try {
        const foundVideogamesName = await Videogame.findAll({
            where: {
                name: {                    
                    [Op.iLike]: `%${name}%`,
                }
            }
        });
        return foundVideogamesName;
    } catch (error) {
        throw new Error (`No se encontraron videojuegos en la DB con el nombre ${name}, ${error}`);
    }

}


//Ruta POST, agregar videojuego a la DB
//ANDA OK
async function addVideogame (videogame){
    const genresId = videogame.genresId; //tiene q ser un arreglo y llamarse igual en el envio de info desde front
    console.log(genresId);
    console.log(typeof genresId[0]);
    try {
        const newVideogame = await Videogame.create({...videogame});        
        const game = await Videogame.findByPk(newVideogame.dataValues.id);
        await game.addGenres (genresId);   
        return "ok";
    } catch (error) {
        throw new Error (`No se pudo agregar el videojuego la base de datos, ${error}`);
    }
}


async function getPlatforms (){
    try {
        const videogames = await getAllVideogamesFromAPI ();
        let platforms = [];
        videogames.forEach(videogame => videogame.platforms.forEach(platform => {
                    if (!platforms.includes(platform)) platforms.push(platform)
                }));
        return platforms;
    } catch (error) {
        throw new Error (`No se pudieron obtener las plataformas, ${error}`);
    }

}

module.exports = { 
    getVideogames,
    addVideogame,
    getAllVideogamesFromAPI,
    getAllVideogamesFromDB,
    getPlatforms
 }