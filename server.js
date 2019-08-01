const express = require('express');

const PORT     = process.env.PORT || 3000;

const app      = express();
const mongoose = require('mongoose');
const passport = require('passport');
const flash     = require('connect-flash');

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/passportauth");

// require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
// require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(PORT, () =>{
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
