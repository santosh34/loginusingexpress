const passport =require('passport');
const LocalStorage = require('passport-local').Strategy
const User=require('../model/user')


passport.serializeUser((user,done) => {
    if(user) {
        done(null,user.id)
    }
});

passport.deserializeUser((id,done) => {
    User.findById(id,function(err,user){
        done(err,user)
    })
})



/* ==========================================================================
                  Signup passport
   ========================================================================== */
passport.use('admin.signup', new LocalStorage({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done) => {
    var messages=[]
    User.findOne({'email':email},(err,user) => {
       
        if(err) {
            return done(err)
        }
        if(user) {
            console.log('email already exist')
            return done(null,false,{message:'Already exists :' +email})
        }
        var newUser = new User();
        newUser.email=req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);
        newUser.username = req.body.username;

        newUser.save((err,user) => {
            if(err) 
            throw err;
            if(user){
                console.log(user)
                return done(null,newUser);
            }
        })
    })
}))



/* ==========================================================================
           login usign passport
   ========================================================================== */



   passport.use('admin.login',new LocalStorage({
    usernameField: 'email',
    passwordField: 'password', 
    passReqToCallback: true
},(req,email,password,done) => {

 //check if email exists or not
    User.findOne({'email':email},(err,user) => {
        if(err){
            return done(err);
        }
        var messages=[]

        //user not exists
        if(!user){
          console.log('email do not exists')
            req.flash('server-error',"email do not exists")
            return done(null,false,{message:'Email do not exists : '+email});
        }
        //invalid password
        if(!user.validPassword(password)){
            messages.push(' Invalid password')
            console.log('invalid password')
            req.flash('server-error',"password do not match")
            return done(null,false, {message:'Password do not match : '+email});
        }
        //if user exists
       if(user){
           req.session.isLoggedIn=true;
           req.session.save();
    
       }
      
       return done(null,user)
    
      
        });
}));
