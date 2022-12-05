const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
require('dotenv').config();
const Connection = require('../config/Connection');
const currentDate = new Date();
const days = currentDate.getDate();
const month = currentDate.getMonth() + 1;  
const year = currentDate.getFullYear();
const hour = currentDate.getHours();
const minute = currentDate.getMinutes();
const second = currentDate.getSeconds();
const DateNowString = year + '-' + month + '-' + days + ' ' + hour + ':' +minute + ':' + second;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRETS,
    callbackURL: "/users/google/callback",
},
    function (req, accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            Connection.query("SELECT count(*) as 'isExist' FROM Users where userGoogleId= ? ",profile.id, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (user[0].isExist === 1) {
                    Connection.query("SELECT * FROM Users where userGoogleId= ? ",profile.id, (err, user) => {
                        if (err) {
                            console.log(err);
                        } else {
                        return done(null, user);
                        }
                    })
                   
                } else {
                    let newUser = {
                        google_id: profile.id,
                        google_email: profile.emails[0].value,
                        google_name: profile.name.givenName + ' ' + profile.name.familyName,
                        google_image: profile.photos[0].value
                    };
                    Connection.query("INSERT INTO Users (userGoogleId, userFullname, userEmail , userImage, userStatus, userVerification, userDateCreated) VALUES (?, ?, ? , ?, 1 , 1 , ?)",
                        [newUser.google_id, newUser.google_name , newUser.google_email, newUser.google_image, DateNowString ], (err, rows) => {
                            if (err) {
                                console.log(err);
                            }
                            Connection.query("SELECT * FROM Users where userGoogleId= ? ",newUser.google_id, (err, user) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                    return done(null, user);
                                    }
                                })
                        })
                }
            });
        });
    }
));

//Login with facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRETS,
    callbackURL: "/users/facebook/callback",
},
    function (req, accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            Connection.query("SELECT count(*) as 'isExist' FROM Users where userGoogleId= ? ",profile.id, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (user[0].isExist === 1) {
                    Connection.query("SELECT * FROM Users where userGoogleId= ? ",profile.id, (err, user) => {
                        if (err) {
                            console.log(err);
                        } else {
                        return done(null, user);
                        }
                    })
                   
                } else {
                    let newUser = {
                        google_id: profile.id,
                        google_email: profile.emails[0].value,
                        google_name: profile.name.givenName + ' ' + profile.name.familyName,
                        google_image: profile.photos[0].value
                    };
                    Connection.query("INSERT INTO Users (userGoogleId, userFullname, userEmail , userImage, userStatus, userVerification, userDateCreated) VALUES (?, ?, ? , ?, 1 , 1 , ?)",
                        [newUser.google_id, newUser.google_name , newUser.google_email, newUser.google_image, DateNowString ], (err, rows) => {
                            if (err) {
                                console.log(err);
                            }
                            Connection.query("SELECT * FROM Users where userGoogleId= ? ",newUser.google_id, (err, user) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                    return done(null, user);
                                    }
                                })
                        })
                }
            });
        });
    }
));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((req, user, done) => {

    Connection.query("SELECT * FROM Users WHERE userGoogleId = ?", [user.google_id], (err, rows) => {
        if (err) {
            console.log(err);
            return done(null, err);
        }
            done(null, user);
    });
});