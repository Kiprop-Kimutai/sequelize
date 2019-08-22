const User = require('../models').User;
const passport = require('passport');
module.exports.register = function(req,res) {
    var user = new User(req.body);
    user.setPassword(req.body.password);
    user.save().then(() =>{
        var token = user.generateJwt();
        res.status(201).json({"token": token});
    }).catch(err => {
        res.status(400).json(err);
    })
}

module.exports.registerForTest = function(modelUser) {
    console.log(modelUser);
    return new Promise((resolve, reject) => {
        var user = new User(modelUser);
        user.setPassword(modelUser.password);
        user.save().then(() => {
            var token = user.generateJwt();
            resolve({"token": token});
        }).catch(err => {
            reject(err);
        }) 
    });
}
module.exports.login = function(req, res) {
    passport.authenticate('local', (err, user, info) => {
        var token;
        //If passport throws/catches an error
        if(err) {
            return res.status(404).json(err);
        }
        //if a user  is found
        if(user) {
            token = user.generateJwt();
            return res.status(201).json({"token": token});
        } 
        else {
            //If user is not found
            return res.status(401).json(info);
        }
    })(req,res);
}
