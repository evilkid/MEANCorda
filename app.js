var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');


var mongoose = require('mongoose');

var transaction = require('./models/transaction.model');
var bank = require('./models/bank.model');
var config = require('./config/config');

mongoose.connect(config.mongo.uri, [transaction, bank]);

var users = require('./routes/users');
var banks = require('./routes/banks');

var app = express();
app.use(cors());

var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var Bank = mongoose.model('banks');

app.use(passport.initialize());

var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: 'mykey'
};

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:

    Bank.findOne({_id: jwt_payload._id}, function (err, bank) {
        if (bank && !err) {
            next(null, bank);
        } else {
            next(null, false);
        }
    });
});

passport.use(strategy);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/me", passport.authenticate('jwt', {session: false}), function (req, res) {
    res.json("Success! You can not see this without a token");
});


app.get("/login", function (req, res) {
    console.log(req.user);
    if (req.user) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/public/auth.html');
    }
});


app.use('/users', users);
app.use('/banks', banks);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//global variables
global.HOST = "http://localhost";
global.API = "/api/example/";


module.exports = app;
