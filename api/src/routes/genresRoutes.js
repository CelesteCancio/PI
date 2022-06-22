const express = require ("express");

const router = express.Router();


router.post('/', (req,res) => {

    try {
        return res.send("Estas en genres/");
    } catch (error) {
        return res.send(error);
    }
})

module.exports = router;