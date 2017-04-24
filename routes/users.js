var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Bank = mongoose.model('banks');

var banks = require('./banks');

/* GET users listing. */
router.get('/', function (req, res, next) {
    Bank.findOne({"username": "NodeA"}, function (err, banks) {
        console.log(banks);
    });
    res.send('respond with a resource');
});


router.get("/get", function (req, res, next) {

    console.log(banks.port);
});

module.exports = router;
