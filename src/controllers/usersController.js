const jsonDb = require('../model/jsonDatabase')
const usersModel = jsonDb('users')
const bcryptjs = require('bcryptjs')

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


        if(req.file){
            row.image = req.file.filename
        }else{
            row.image = 'default-image.png'
        }

        console.log(req.body);

        usersModel.create(row) 

        res.redirect('login')
    }

}

module.exports=usersController;