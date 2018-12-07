const express = require('express');
const ensure = require('./methods');
const User = require('../models/User');

const router = express.Router();

// USE ADMIN AUTHENTICATION FOR ALL USER ROUTES
router.use(ensure.admin);

// GET ALL USERS
router.get('/users', (req, res) => {
    User.find((err, data) => {
        if (err) {
            return res.json({
                success: false,
                error: err,
            });
        }

        return res.json({
            success: true,
            data,
        });
    });
});

// PUT USER TO UPDATE BY ID
router.put('/users', (req, res) => {
    const {
        userid,
        ...update
    } = req.body;

    User.findOneAndUpdate({
        userid,
    }, update, (err) => {
        if (err) {
            return res.json({
                success: false,
                error: err,
            });
        }

        return res.json({
            success: true,
        });
    });
});

// DELETE USER BY ID
router.delete('/users', (req, res) => {
    const {
        id,
    } = req.body;

    User.findOneAndDelete(id, (err) => {
        if (err) return res.send(err);
        return res.json({
            success: true,
        });
    });
});

module.exports = router;
