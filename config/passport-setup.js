const passport = require('passport');
const GoogleStratergy= require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user,done) => {
   done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
     done(null, user);
  });
});
passport.use(
    new GoogleStratergy({
   // options for GoogleStratergy
  callbackURL:'/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
}, (accessToken,refreshToken,profile,done) => {
 // options for call back function
   console.log('passport call back fired');
   console.log(profile);

   // chk if user is already exited in mongodb
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if(currentUser) {
        // already have the user
        console.log('user is' + currentUser);
        done(null, currentUser);
      } else {
        // if not create user in our db
        new User({
          username: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.thumbnail
        }).save().then((newUser) => {
          console.log('new user created:' + newUser);
          done(null, newUser);
        }).catch((err) => {
          console.log(err);
        })
      }
    })

  })
)
