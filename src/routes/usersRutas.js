const express= require('express');
const router= express.Router();


const upload= require('../middleware/multerAvatar');
let validation = require('../middleware/errorsValidation');



/*Con esta variable llamo a mi archivo localizado en la carpeta CONTROLLER*/ 
let usersController= require('../controllers/usersController');


//Require middlewares de autentificacion
let ifUserLogged = require('../middleware/ifuserLogged')
let auth = require('../middleware/auth')

router.get('/login',ifUserLogged, usersController.login);
router.post('/login', validation, usersController.loginProcess);
router.get('/registro',ifUserLogged, usersController.register);
router.post('/registro',upload.single('avatar'),usersController.create);
router.get('/perfil',auth,usersController.profile)
router.put('/editar/:id',upload.single('image'),usersController.edit)


module.exports= router;