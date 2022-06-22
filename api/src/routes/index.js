const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRoutes = require ("./videogamesRoutes");
const videogameRoutes = require ("./videogameRoutes");
const genresRoutes = require ("./genresRoutes");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use ('/videogames',videogamesRoutes);
router.use ('/videogame', videogameRoutes);
router.use ('/genres', genresRoutes);


module.exports = router;
