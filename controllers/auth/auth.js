
module.exports.getlogin=(req,res) => {
     res.render('auth/login',{title:'Get login page', serversuccess:req.flash('server-success'),
     servererror:req.flash('server-error')})
}

module.exports.postlogin=(req,res) => {
 res.redirect('/isadmin')
 
   
}

module.exports.getregister=(req,res) => {
     res.render('auth/register',{title:'Register page'})
}

module.exports.postregister= (req,res) => {
     res.render('auth/register',{title:'Register page'})
 }

module.exports.isadmin=(req,res) => {
     res.render('auth/isadmin',{title:'Admin HomePage'})
}




module.exports.getlogout= (req,res) => {
    req.logout();
    req.session.isLoggedIn=false;
     console.log('this is logout')
      res.redirect('/login')
}