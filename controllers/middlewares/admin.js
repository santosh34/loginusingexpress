
module.exports = (req,res,next) => {
    //not for login user
    if(!req.isAuthenticated()){
        
        return next()
    } else {
        //if user login then redirect to home page
        res.redirect('/')
    }
}