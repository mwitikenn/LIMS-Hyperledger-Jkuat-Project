module.exports={
    ensureAuthenticated:function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        console.log('error please log in');
        res.redirect('/')
    }
}