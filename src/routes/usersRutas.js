const express= require('express');
const router= express.Router();
const { body } = require ( 'express-validator' );

const upload= require('../middleware/multerAvatar');
let validation = require('../middleware/errorsValidation');



/*Con esta variable llamo a mi archivo localizado en la carpeta CONTROLLER*/ 
let usersController= require('../controllers/usersController');


router.get('/login', usersController.login);
router.post('/login', validation, usersController.loginProcess);
router.get('/registro', usersController.register);
router.post('/registro',upload.single('avatar'),usersController.create);

module.exports= router;