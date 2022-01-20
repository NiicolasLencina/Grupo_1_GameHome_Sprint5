function userLogged(req,res,next) {
    if(req.session.user){
        res.redirect('/')
    }
    next()
}

module.exports=userLogged