const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');


//set up view engine
app.set('view engine','ejs');

//
app.use(cookieSession({
  maxAge: 24 *60 * 60 * 1000,
  keys:[keys.session.cookieKey]
}));

// initailze the passport
app.use(passport.initialize());
app.use(passport.session());

// connect mongodb 
mongoose.connect(keys.mongodb.dbURI,  { useNewUrlParser: true },() => {
  console.log('connected to mongodb');
})

//setup routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
//create home route
app.get('/',(req,res) => {
  res.render('home', {user: req.user});
})

app.listen(3000, () => {
  console.log('server started at 3000');
})
