const { validationResult }=require('express-validator')
const jsonDb = require('../model/jsonDatabase');
const usersModel = jsonDb('users');
const bcryptjs = require('bcryptjs');

const usersController = {
    login:(req,res)=>{
        res.render('users/login')
    },
    register: (req,res)=>{
        res.render('users/register')
    },
    create: (req,res)=>{
        let row = req.body
        

        row.password = bcryptjs.hashSync(req.body.password,10)

        console.log(req.file);

        if(req.file){
            row.image = req.file.filename
        }else{
            row.image = 'default-image.png'
        }

        console.log(req.body);

        usersModel.create(row) 

        res.redirect('login')
    },
    loginProcess:(req,res)=>{
        const errors = validationResult(req)

        
        if(errors.isEmpty()){
            let userAll = usersModel.readFile()

            let userEncontrado;

            for (let i = 0; i < userAll.length; i++) {
               if(userAll[i].email == req.body.email){
               userEncontrado =  userAll[i]
               }
                
            }

            console.log(userEncontrado);

            if(userEncontrado && bcryptjs.compareSync(req.body.password,userEncontrado.password)==true){

                   

                req.session.user=userEncontrado

                console.log(req.session.email)

                   /* if(req.body.recordar){
                        res.cookie('userEmail',req.body.email,{maxAge:(1000*60)*2})
                    }*/
                    
                    return res.redirect('/')
                
            }
            else{
                res.render('users/login');
            }

        }
        else{
            res.render('users/login',{errors:errors.mapped(),old:req.body});
        }
      
    },
    profile:function (req,res) {
        res.render('users/userProfile',{user:req.session.user})
    },
    edit:function (req,res) {
        /*
        let row = req.body
        
        if(req.body.password != null){
            row.password = bcryptjs.hashSync(req.body.password,10)
        }
        else{
            let usuarioEnBD = usersModel.find(req.params.id)
            
            row.password=usuarioEnBD.password
        }

        console.log(req.file);
        if(req.file!=undefined){
            row.image = req.file.filename
        }
        else if(req.file==undefined){
            let objeto = usersModel.find(req.params.id)
            row.image = objeto.image
        }

        console.log(req.body);

        usersModel.update(row) 

        req.session.userUpdate=row

        res.redirect('/usuario/perfil',{user:req.session.userUpdate})*/
    }

}

module.exports=usersController;