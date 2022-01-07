const express= require('express');
const router= express.Router();


/*Con esta variable llamo a mi archivo localizado en la carpeta CONTROLLER*/ 
let usersController= require('../controllers/usersController');

router.get('/login', usersController.login);
router.get('/registro', usersController.register);
router.post('/registro', usersController.create);

module.exports= router;