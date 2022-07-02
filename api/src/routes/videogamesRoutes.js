const {Router} = require ("express");
const {getVideogames, addVideogame, sortVideogamesByRating} = require ("../controllers/videogamesControllers");


const router = Router();

router.get('/', (req,res) => {
    const {name} = req.query;
    console.log(`search: ${name}`);
    try {
        return getVideogames(name).then(videogames => 
            typeof videogames === "object" ? res.json(videogames) : res.status(404).json(videogames));
    } catch (error) {
        return res.send(error);
    }
});

router.post('/', async (req,res) => {

    try {
        const addedVideogame = await addVideogame({...req.body});
        return res.json(addedVideogame);
    } catch (error) {
        return res.send(error);
    }
});

//Ruta de prueba para ordenar por rating
router.get('/sortbyrating', (req,res) => {    
    console.log(`en '/sortbyrating'`);
    try {
        return sortVideogamesByRating().then(videogames => 
            res.json(videogames));
    } catch (error) {
        return res.send(error);
    }
});


module.exports = router;