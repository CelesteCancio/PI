const express = require ("express");
const router = express.Router();
const {Genre} = require ("../db");
const {getGenresFromAPI, showGenres} = require ("../controllers/genresControllers");

//esta ruta va a ser llamada por unica vez, asociada al boton de ingreso, llamada hasta q haga el front
router.get('/fromAPI', (req,res) => {
    try {
        getGenresFromAPI();
        return res.send(`Generos cargados correctamente desde API`);
    } catch (error) {
        return res.send(`No se pudieron obtener los generos de la API, ${error}`);
    }
});

router.get('/', (req,res) => {    
    try {        
        showGenres().then(genres => 
            typeof videogame === "object" ? res.json(genres) : res.status(404).json(genres));

        // Si no uso showGenres, lo puedo llamar desde aca, pero no es tan prolijo:
        // Genre.findAll().then (foundGenres => 
        //     foundGenres.length > 0 
        //     ? res.json(foundGenres) 
        //     : res.status(404).send("No se encontraron generos cargados"));        
    } catch (error) {
        return res.send(error);
    }
});

//creo genres solo para ver si funciona el add. BORRAR ANTES DE ENTREGAR

router.post('/', async (req,res) => {
    const {id, name} = req.body;
    try {
        console.log("holu post genre");
        let genre = await Genre.create({...req.body});
        console.log(genre);
        return res.json(genre);
        //return res.send("Estas en genres/");
    } catch (error) {
        return res.send(error);
    }
});

module.exports = router;