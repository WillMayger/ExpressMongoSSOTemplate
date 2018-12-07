const express = require('express');
const passportGoogle = require('../auth/google');
const ensure = require('./methods');

const CONFIG = require('../config');

const router = express.Router();

// CHECK IF A STANDARD USER IS AUTHENTICATED
router.get('/auth/status', ensure.authenticated, (req, res) => res.json({
    success: true,
}));

// CHECK IF AN ADMIN USER IS AUTHENTICATED
router.get('/auth/status/admin', ensure.admin, (req, res) => res.json({
    success: true,
}));

// ROUTE FOR INITIALIZING (GOOGLE SINGLE SIGN ON / OAUTH) AUTHENTICATION
// "hostedDomain": SET TO ONLY ALLOW TMG EMAILS TO BE ALLOWED ACCESS
router.get('/auth/google',
    passportGoogle.authenticate('google', {
        hostedDomain: ['telegraph.co.uk'],
        scope: ['https://www.googleapis.com/auth/plus.login'],
    }));

// (GOOGLE SINGLE SIGN ON / OAUTH) CALLBACK VERIFICATION ROUTE TO SET TOKENS
router.get(
    '/auth/google/callback',
    passportGoogle.authenticate('google', {
        failureRedirect: '/login',
    }),
    (req, res) => (res.redirect('/success')),
);

module.exports = router;
