const {Router} = require ("express");
const {getVideogameById} = require ('../controllers/videogameControllers');

const router = Router();

router.get('/:idVideogame', (req,res) => {
    const {idVideogame} = req.params;
    try {
        const fc = getVideogameById(idVideogame);
        return res.send(`Estas en un GET de videogame/, mandaste por params el id ${idVideogame} y se acaba de llamar la funcion ${fc}`);
    } catch (error) {
        return res.send(error);
    }
})



module.exports = router;