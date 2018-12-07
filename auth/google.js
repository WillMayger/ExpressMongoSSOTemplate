const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');
const CONFIG = require('../config');

// PASSPORTS GOOGLE SINGLE SIGN ON SET UP
passport.use(
    new GoogleStrategy(
        {
            ...CONFIG.GOOGLE_SSO,
        },
        (accessToken, refreshToken, profile, done) => {
            // HERE WE USE THE PLUGIN FUNCTION DEFINED IN THE USER SCHEMA TO FILL IN USER OBJECT
            User.findOrCreate(
                {
                    userid: profile.id,
                },
                {
                    name: profile.displayName,
                    userid: profile.id,
                    email: profile.email,
                },
                (err, user) => done(err, user),
            );
        },
    ),
);

module.exports = passport;
