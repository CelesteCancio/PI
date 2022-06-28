const {Router} = require ("express");
const {getVideogameById} = require ('../controllers/videogameControllers');

const router = Router();


router.get('/:id', (req,res) => {

    const id = req.params.id;  
    console.log(`estas en ruta get videogame/id, el id ingresado es ${id}`);  
    try {
        getVideogameById(id).then(videogame => res.json(videogame));
    } catch (error) {
        return res.send(error);
    }
});


module.exports = router;