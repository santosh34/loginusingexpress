const express = require('express')
const path =require('path')
var cookieParser= require('cookie-parser');
const bodyParser = require('body-parser');
var validator = require('express-validator');
const mongoose = require('mongoose')
const session=require('express-session');
const MongoDbStore =require('connect-mongo')(session)
var passport = require('passport');
var flash = require('connect-flash');
const PORT = process.env.PORT || 3000;

//router setup
const homeRoute=require('./routes/web');


const app =express()

//database connection setup
const mongodb=mongoose.connect('mongodb://localhost:27017/pizza', 
{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true,useFindAndModify:false});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('Database connection')
}).catch(err=>{
    console.log('Database connection failed')
})
require('./passport/passport')

//session store
let mongoStore=new MongoDbStore({
    mongooseConnection:connection,
    collection:'session'
})


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(validator())

//session configstore
app.use(session({
    secret:'kiranthapa',
    resave:false,
    store:mongoStore,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*24
    }

}))


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//assest
app.use( express.static('public'))
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')


//Global middleware for session user
app.use((req,res,next) =>{
   res.locals.user=req.user
   next()
})

//router middleware
app.use('/',homeRoute);



//creating server
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)

})