const express = require ("express");

const {Genre} = require ("../db");

const router = express.Router();


router.get('/', (req,res) => {

    try {
        await 
        Genre.findAll().then (foundGenres => 
            foundGenres.length > 0 
            ? res.json(foundGenres) 
            : res.status(404).send("No se encontraron generos cargados"));        
    } catch (error) {
        return res.send(error);
    }
});

//creo genres solo para ver si funciona el add

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