const {Videogame, Genre} = require ('../db');
const axios = require ('axios');
const {
    API_KEY,
} = process.env;

//Ruta GET, con parametro ID:

//ANDA OK la parte de API peor no la de DB
async function getVideogameById (id){
    const regex = /[a-zA-Z]/;
        if (regex.test(id)){
            console.log(`db`);
            const foundVideogameByIdFromDB = await getVideogameByIdFromDB(id);
            console.log(foundVideogameByIdFromDB);
            if (foundVideogameByIdFromDB) return foundVideogameByIdFromDB; 
            else return `No se encontraron videojuegos en la DB con el id ${id}`; 
        }
        else{
            console.log(`api`);
            const foundVideogameByIdFromAPI = await getVideogameByIdFromAPI(id);
            if (foundVideogameByIdFromAPI) return foundVideogameByIdFromAPI; 
            else return `No se encontraron videojuegos en la API con el id ${id}`;             
        }
}

//anda OK, solo falta q traiga unicamente los datos q necesito para el front
async function getVideogameByIdFromAPI (id){
    try {
        console.log(`en getVideogamesByIdFromAPI, id ${id}`);

        //si anda:
        let foundVideogameByIdComplete = (await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;         

        // si anda:
        // let foundVideogameByIdComplete = axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        // .then(response => response.data);

        let foundVideogameById = {
            name: foundVideogameByIdComplete.name,             
            image: foundVideogameByIdComplete["background_image"],
            genres: foundVideogameByIdComplete.genres.map (genre => genre.name)
        };
        return foundVideogameById;
   
    } catch (error) {
        //throw new Error (`No se pudo obtener el videojuego de id ${id} de la API, ${error}`);
        return false;
    }
}

//NO ANDA, tira siempre falso
async function getVideogameByIdFromDB (id){
    try {
        const foundVideogame = await Videogame.findByPk(id,{
            include: Genre
        });
        //if(foundVideogame) 
        return foundVideogame;
        //else return `No se encontraron videojuegos de DB con el id ${id}`;
    } catch (error) {
        //throw new Error (`No se pudo encontrar el videojuego en la base de datos, ${error}`);
        return false;
    }
}

module.exports = {
    getVideogameById
};