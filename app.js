const express = require('express');
const path= require('path');
const app = express();
const port = 3030;
const session = require('express-session');


// vistas y public static
app.use(express.static('public'));
app.set('view engine', 'ejs');
// view engine setup
app.set('views', path.resolve(__dirname, './src/views'));



//Require de las rutas
const usersRutas= require('./src/routes/usersRutas')
const productRutas= require('./src/routes/productRutas')

// Pasar poder usar los métodos PUT y DELETE
const methodOverride =  require('method-override');  

// Necesario para trabajar con formularios!!
app.use(express.urlencoded({ extended: false }));
app.use(express.json())


// Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(methodOverride('_method'));

app.listen(process.env.PORT ||port, () => console.log(`Servidor Funcionando! ${port}!`))

app.use(session({
    secret: "It is a secret",
    resave: false,
    saveUninitialized: false
}))

//Ruta product
app.use('/', productRutas)



//Ruta users
app.use('/usuario',usersRutas)

//Error 404
app.use((req,res,next)=>{
    res.status(404).render("users/notFound")
})
