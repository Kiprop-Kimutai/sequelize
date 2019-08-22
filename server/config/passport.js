const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, function(email, password, done) {
    db.User.findOne({where: {email: email}}).then(user => {
        //if there is no user
        if(!user) {
            return done(null, false, {message: 'Incorrect email'})
        }
        else if(!user.validPassword(password)) {
            return done(null, false, 'Incorrect password!');
        }
        //if none of the above scenarios, return user
        return done(null, user);
    });
}
));