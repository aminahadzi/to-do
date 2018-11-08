var authorization = function(req, res, next){
    if(req.path !== "/register"){
        if(!req.session.username){
            res.redirect('/register');
            return;
        }
    }
    next();
};

module.exports = authorization;
