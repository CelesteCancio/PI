const {Videogame} = require ('../db');

async function addVideogame (videogame){
    const genresId = videogame.genresId; //tiene q ser un arreglo y llamarse igual en el envio de info desde front
    const newVideogame = await Videogame.create({...videogame});
    await newVideogame.addGenre (genresId);    
    return newVideogame;
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