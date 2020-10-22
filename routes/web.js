const express = require('express')
const passport = require('passport');
const isadmin =require('../controllers/middlewares/admin')
const auth =require('../controllers/middlewares/isauth')
const router = express.Router();
const HomePageControllers=require('../controllers/homepage/homepage')
const AuthPageControllers=require('../controllers/auth/auth')
const CartPageControllers=require('../controllers/cart/cart')



router.get('/',HomePageControllers.homepage)

router.get('/login',isadmin,AuthPageControllers.getlogin)

router.post('/login',authvalidate,passport.authenticate('admin.login',{
    failureRedirect:'/login',
    failureFlash:true,
 
    
    
}),AuthPageControllers.postlogin)

router.get('/register',isadmin,AuthPageControllers.getregister)


router.post('/register',passport.authenticate('admin.signup',{
    failureRedirect:'/register',
    failureFlash:true

}),AuthPageControllers.postregister)

router.get('/logout',AuthPageControllers.getlogout)


router.get('/cart',CartPageControllers.cart)

router.get('/isadmin',auth,AuthPageControllers.isadmin)


module.exports=router


function authvalidate(req, res, next){
    req.checkBody('email', 'Email is Required').notEmpty();
    req.checkBody('password', 'Password is Required').notEmpty();
   
  
  
   
    var authErrors = req.validationErrors();
  
    if(authErrors){
        var messages = [];
        authErrors.forEach((error) => {
            messages.push(error.msg);
        });
  
        req.flash('server-error', messages);
       return res.redirect('/login')
    }else{
        return next();
    }
  }

