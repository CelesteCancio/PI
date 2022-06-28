const {Router} = require ("express");
const {getVideogameById, getVideogames, addVideogame} = require ("../controllers/videogamesControllers");


const router = Router();

router.get('/:id', (req,res) => {

    const id = req.params.id;  
    console.log(`estas en ruta get videogames/id, el id ingresado es ${id}`);  

    try {
        getVideogameById(id).then(videogame => res.json(videogame));
    } catch (error) {
        return res.send(error);
    }
});

router.get('/', (req,res) => {
    const {search} = req.query;
    console.log(`search: ${search}`);
    try {
        return getVideogames(search).then(videogames => res.json(videogames));
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
})


module.exports = router;