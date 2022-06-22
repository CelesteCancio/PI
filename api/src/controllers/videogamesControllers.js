const {Videogame} = require ('../db');

async function addVideogame (videogame){
    const newVideogame = await Videogame.create({...videogame});
    //return `addVideogame, y... buenas noticias: Videojuego agregado con los siguientes datos: ${newVideogame}`; 
    return newVideogame;
    // Quiero ver si puedo acceder y devolver el UUID
}

function getVideogames (){
    return 'getVideogames';
}

function getVideogamesByName (name){
    return `getVideogamesByName, quien acaba de recibir el nombre ${name}`;
}

module.exports = { 
    addVideogame,
    getVideogames,
    getVideogamesByName
 }