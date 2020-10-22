module.exports.homepage=(req,res) => {
    let user =req.session.isLoggedIn
    //if login user
    if(user){
       return res.redirect('/isadmin')
   }else{
   //if not login user
    res.render('home',{title:'Homepage',user:user})
   }
  
}


