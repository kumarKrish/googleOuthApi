const router = require('express').Router();

const authCheck = (req,res,next) => {
  if(!req.user){
    //if user not logged in
    res.redirect('/auth/login');
  } else {
    // if logged inspect
     next();

  }

}

router.get('/', authCheck, (req,res) => {
  //res.send('you are logged in , this is your profile page'+ req.user.username);
  res.render('profile',{user: req.user});
})

module.exports = router;
