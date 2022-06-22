const {Router} = require ("express");
const {addVideogame, getVideogames, getVideogamesByName} = require ("../controllers/videogamesControllers");


const router = Router();

router.get('/', (req,res) => {
    const {name} = req.query;
    try {
        if(name){            
            const fc = getVideogamesByName(name);
            return res.send(`Estas en un GET de videogames/, mandaste por query el nombre ${name} y se acaba de llamar la funcion ${fc}`);
        }
        const fc = getVideogames();
        return res.send(`Estas en un GET de videogames/ y se acaba de llamar la funcion ${fc}`);
    } catch (error) {
        return res.send(error);
    }
});

router.post('/', async (req,res) => {

    try {
        const addedVideogame = await addVideogame({...req.body});
        //return res.send(`Estas en un POST de videogames/ y se acaba de llamar la funcion ${fc}`);
        return res.json(addedVideogame);
    } catch (error) {
        return res.send(error);
    }
})


module.exports = router;