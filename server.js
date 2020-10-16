const express = require('express')
const app =express()
const ejs = require('ejs')
const path =require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000;



app.get('/',function(req,res){
    res.send('hello from server js ')
})

//set Template engines
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')





//creating server
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)

})