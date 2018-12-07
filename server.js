const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const CONFIG = require('./config');

const API_PORT = 3001;
const app = express();

app.use(cors({ credentials: true, origin: true }));

// GET INDEX.JS FROM ./ROUTES
const routers = require('./routes');

// DATABASE SETUP
// GET DB CONNECTION STRING
let dbRoute;
if (process.env.NODE_ENV === 'test') {
    dbRoute = CONFIG.DATABASE.CONNECTION_STRINGS.test;
} else {
    dbRoute = CONFIG.DATABASE.CONNECTION_STRINGS.prod;
}

// CONNECT TO DB WITH CONNECTION STRING
mongoose.connect(
    dbRoute, {
        useNewUrlParser: true,
    },
);

// ASSIGN DB TO VARIABLE TO USE EVENT LISTENERS
const db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// REQUEST / RESPONSE HELPERS
app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use(bodyParser.json());
app.use(logger('dev'));

// SET UP SERVER WITH PASSPORT AND SESSIONS
app.use(session({
    secret: 'galhiufadshoagu543756yiu2gu5y3h4iu',
    resave: true,
    saveUninitialized: true,
}));
// INITIALIZE PASSPORT WITH SESSIONS
app.use(passport.initialize());
app.use(passport.session());

// ADD OATUH METHODS FOR PASSPORT TO USE
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// STATIC FILES
app.use(express.static('static'));

// USE EJS AS TEMPLATE LANG
app.set('view engine', 'ejs');

// APPLY ROUTES TO SERVER
app.use('/api', routers.router);
app.use('/', routers.templates);


app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

module.exports = app;
