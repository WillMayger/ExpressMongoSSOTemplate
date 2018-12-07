const express = require('express');
const ensure = require('./methods');
const ExampleModel = require('../models/ExampleModel');

const router = express.Router();

// USE STANDARD AUTHENTICATION FOR ALL EXAMPLES ROUTES
router.use(ensure.authenticated);

// GET ALL EXAMPLES
router.get('/example', (req, res) => {
    ExampleModel.find((err, data) => {
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

// POST EXAMPLE TO CREATE A NEW EXAMPLE
router.post('/example', (req, res) => {
    const {
        test,
    } = req.body;

    // ERR CHECKING FOR NEW EXAMPLE
    let errors = null;

    if (!test) {
        errors = {
            ...errors,
            test: {
                kind: 'required',
            },
        };
    }

    if (errors !== null) {
        return res.json({
            success: false,
            errors,
        });
    }

    // INSTANCE OF EXAMPLE
    const example = new ExampleModel({
        test,
    });

    // SAVE
    return example.save((err) => {
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

// PUT EXAMPLE BY ID TO UPDATE
router.put('/example', (req, res) => {
    const {
        id,
        ...update
    } = req.body;

    return ExampleModel.findByIdAndUpdate(id, update, { new: true }, (updateErr, data) => {
        if (updateErr) {
            return res.json({
                success: false,
                errors: updateErr,
            });
        }

        return res.json({
            success: true,
            data,
        });
    });
});

// DELETE EXAMPLE BY ID TO UPDATE
router.delete('/example', (req, res) => {
    const {
        id,
    } = req.body;

    ExampleModel.findByIdAndDelete(id, (err) => {
        if (err) return res.send(err);

        return res.json({
            success: true,
        });
    });
});

module.exports = router;
