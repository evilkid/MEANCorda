var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bycrypt = require("bcrypt-nodejs");

var request = require('request');

var Bank = mongoose.model('banks');
var jwt = require('jsonwebtoken');
var passport = require("passport");
var jwtOptions = {
    jwtFromRequest: require("passport-jwt").ExtractJwt.fromAuthHeader(),
    secretOrKey: 'mykey'
};


router.post('/login', function (req, res, next) {

    if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;
    }
    Bank.findOne({"username": username}, function (err, bank) {

        if (!bank || err) {
            res.status(401).json({message: "no such bank found"});
            return;
        }

        bycrypt.compare(password, bank.password, function (err, matches) {
            if (matches) {
                var payload = {
                    "username": bank.username,
                    "port": bank.port,
                    "name": bank.name,
                    "corda_id": bank.corda_id,
                    "_id": bank._id
                };
                var token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.json({message: "ok", token: token});

                return;
            }
            res.status(401).json({message: "passwords did not match"});
        });
    });
});

router.get("/identity", passport.authenticate('jwt', {session: false}), function (req, res) {
    if (req.user.port) {
        var url = global.HOST + ":" + req.user.port + global.API + "identity";

        console.log(url);
        request.get(url, function (err, response, body) {

            if (err) {
                res.json(err);
            } else {
                res.json(JSON.parse(body));
            }
        });
    } else {
        console.log("port not found");
    }
});


router.get("/balance", passport.authenticate('jwt', {session: false}), function (req, res) {
    if (req.user.port) {
        var url = global.HOST + ":" + req.user.port + global.API + "balance";

        console.log(url);
        request.get(url, function (err, response, body) {

            if (err) {
                res.json(err);
            } else {
                res.json(JSON.parse(body));
            }
        });
    } else {
        console.log("port not found");
    }
});


router.get("/peers", passport.authenticate('jwt', {session: false}), function (req, res) {
    if (req.user.port) {
        var url = global.HOST + ":" + req.user.port + global.API + "peers";

        console.log(url);
        request.get(url, function (err, response, body) {

            if (err) {
                res.json(err);
            } else {
                res.json(JSON.parse(body));
            }
        });
    } else {
        console.log("port not found");
    }
});

//get all transactions
router.get('/transactions', passport.authenticate('jwt', {session: false}), function (req, res) {

    console.log(req.user);
    Bank.findById(req.user._id, function (err, bank) {
        if (err)
            res.send(err);
        res.json(bank.transactions);
    });
});

router.get("/transactions-corda", passport.authenticate('jwt', {session: false}), function (req, res) {
    if (req.user.port) {
        var url = global.HOST + ":" + req.user.port + global.API + "vault";

        console.log(url);
        request.get(url, function (err, response, body) {

            if (err) {
                res.json(err);
            } else {
                res.json(JSON.parse(body));
            }
        });
    } else {
        console.log("port not found");
    }
});


module.exports = router;