const {Router} = require ("express");

const router = Router();


router.post('/', (req,res) => {

    try {
        return res.send("Estas en videogames/");
    } catch (error) {
        return res.send(error);
    }
})


module.exports = router;