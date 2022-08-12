const {Router} = require ("express");
const {getVideogames, addVideogame, getAllVideogamesFromAPI, getAllVideogamesFromDB, getPlatforms} = require ("../controllers/videogamesControllers");


const router = Router();

//Ruta para traer TODOS los videojuegos
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


//Ruta para traer solo videojuegos de la API (x el filtro del front)
router.get('/fromAPI', (req,res) => {    
    try {
        console.log(`estoy en fromAPI`)
        return getAllVideogamesFromAPI().then(videogames => 
            typeof videogames === "object" ? res.json(videogames) : res.status(404).json(videogames));
    } catch (error) {
        return res.send(error);
    }
});

//Ruta para traer solo videojuegos de la BD
router.get('/fromDB', (req,res) => {    
    try {
        console.log(`estoy en fromDB`)
        return getAllVideogamesFromDB().then(videogames => 
            typeof videogames === "object" &&  videogames.length>0 ? res.json(videogames) : res.status(404).send(`No se encontraron videojuegos cargados en la BD`));
    } catch (error) {
        return res.send(error);
    }
});

router.post('/', async (req,res) => {
   
    try {
        const addedVideogame = await addVideogame({...req.body});  
        console.log(addedVideogame);        
        return res.send("Videojuego agregado correctamente");
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
});


//Ruta para traer las plataformas
router.get('/platforms',(req,res) => {
    try {
        getPlatforms().then(platforms => 
            typeof platforms === "object" ? res.json(platforms) : res.status(404).json(platforms));
    } catch (error) {
        return res.send(error);
    }

});


module.exports = router;