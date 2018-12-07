const express = require('express');
const CONFIG = require('../config');
const ensure = require('./methods');
const ExampleModel = require('../models/ExampleModel');

const router = express.Router();

// LOGIN TEMPLATE
router.get('/login', (req, res) => {
    return res.render('../templates/login', {
        URI: CONFIG.NETWORK_SETTINGS.URI,
        CLIENT_PORT: CONFIG.NETWORK_SETTINGS.CLIENT_PORT,
    });
});

router.get('/error', (req, res) => {
    return res.render('../templates/error', {});
});

// Make sure the user is logged in to access below routes
router.use(ensure.authenticated);

router.get('/success', (req, res) => {
    ExampleModel.find((err, data) => {
        if (err) {
            return res.redirect('/error', {});
        }

        return res.render('../templates/success', {
            data,
        });
    });
});


router.get('/getExamples', (req, res) => {
    ExampleModel.find((err, data) => {
        if (err) {
            return res.redirect('/error', {});
        }

        return res.render('../templates/getExamples', {
            data,
        });
    });
});

module.exports = router;
