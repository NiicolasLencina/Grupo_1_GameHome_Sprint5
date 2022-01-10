const express= require('express');
const router= express.Router();
const upload= require('../middleware/multerAvatar')


/*Con esta variable llamo a mi archivo localizado en la carpeta CONTROLLER*/ 
let usersController= require('../controllers/usersController');

router.get('/login', usersController.login);
router.get('/registro', usersController.register);
router.post('/registro',upload.single('avatar'),usersController.create);

module.exports= router;