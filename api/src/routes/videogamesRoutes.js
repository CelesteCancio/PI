const {Router} = require ("express");
const {getVideogames, addVideogame} = require ("../controllers/videogamesControllers");


const router = Router();

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