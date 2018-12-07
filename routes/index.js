const express = require('express');
const exampleRouter = require('./example');
const authRouter = require('./auth');
const templateRouter = require('./templates');
const userRouter = require('./users');

const router = express.Router();
const templates = express.Router();

// TEMPLATE ROUTER IS FOR HANDELING THE HTML TEMPLATE ROUTES
templates.use(templateRouter);

// API ROUTES
router.use(authRouter);
router.use(exampleRouter);
router.use(userRouter);

// EXPORT FINISHED ROUTER
module.exports = { router, templates };
