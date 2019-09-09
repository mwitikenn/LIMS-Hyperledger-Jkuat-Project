const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User')
const PersonnelUser = require('../models/PersonnelUser')
module.exports = function (passport) {
    passport.use(
        new LocalStrategy({usernameField: 'userName'}, (userName, passWord, done) => {
                //Match User
                User.findOne({
                    username: userName
                }).then(user => {
                        if (!user) {
                            return done(null, false, {message: 'There is no username'
                            });
                        }
                        //match the password
                        bcrypt.compare(passWord, user.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                return done(null, user);
                            } else {
                                return done(null, false, {message: 'password incorrect'});
                            }
                            });
                        });
                })
    );
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
};



module.exports = function (passport) {
    passport.use(
        new LocalStrategy({usernameField: 'userName'}, (userName, passWord, done) => {
                //Match PersonnelUser
                PersonnelUser.findOne({
                    username: userName
                }).then(user => {
                        if (!user) {
                            return done(null, false, {message: 'There is no username'
                            });
                        }
                        //match the password
                        bcrypt.compare(passWord, user.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                return done(null, user);
                            } else {
                                return done(null, false, {message: 'password incorrect'});
                            }
                            });
                        });
                })
    );
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    PersonnelUser.findById(id, (err, user) => {
        done(err, user);
    });
});
};
/**
    passport.use('login',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback:true
    },
                                           
            var url = 'mongodb://localhost:27017/landsysClientApp';
            mongoClient.connect(url,{useNewUrlParser:true}, function (err, db) {
                var db = client.db('landsysClientApp');
                console.log('clear 1');
                db.collection('user').findOne({
                        username: usernameField
                    },
                    function (err, user ){
                     console.log(user.name);
                    if (err) { return done(err); }
                       if (!user) {
                return done(null, false, req.flash('loginMessage','Incorrect username.' ));
            }
                   if (!user.validPassword(password)) {
                return done(null, false,  req.flash('loginMessage','Incorrect password !' ));
            } return done(null, user);

                    });
            });
        function(req,email, password, done) {
            User.findOne({ email: email }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, req.flash('loginMessage','Incorrect username.' ));
            }
            if (!user.validPassword(password)) {
                return done(null, false,  req.flash('loginMessage','Incorrect password !' ));
            }
            return done(null, user);
            });
        }
    ));

   */

