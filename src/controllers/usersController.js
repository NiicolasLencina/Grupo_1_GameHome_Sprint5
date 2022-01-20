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

                    req.session.email=userEncontrado.email;
                    req.session.firstName=userEncontrado.firstName;
                    req.session.id=userEncontrado.id;
                    req.session.image=userEncontrado.image;

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
       /* let userToLogin;
        let usersAll = usersModel.all()
        for(let i=0; i<usersAll.length; i++){
            if(usersAll[i].email == req.body.email){
                userToLogin=usersAll[i];
        
            }
        }
        if(userToLogin){
            
            if(bcryptjs.compareSync(req.body.password,userToLogin.password)==true){
                delete userToLogin.password;
                req.session.user= userToLogin;
                //if(req.body.recordar){
              //  res.cookie('userEmail',req.body.mail,{maxAge:(1000*60)*2})
            //}
                    console.log(req.session.email);
                     res.send('1'); 
               }
                res.send('2so')

    }
       */
    }

}

module.exports=usersController;