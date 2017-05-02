var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bycrypt = require("bcrypt-nodejs");

var request = require('request');

var async = require('async');


var Bank = mongoose.model('banks');
var Transaction = mongoose.model('transactions');

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

        getWebservice(req.user.port, "identity", res);
        /*var url = global.HOST + ":" + req.user.port + global.API + "identity";

         console.log(url);
         request.get(url, function (err, response, body) {

         if (err) {
         res.json(err);
         } else {
         res.json(JSON.parse(body));
         }
         });*/
    } else {
        console.log("port not found");
    }
});

router.get("/balance", passport.authenticate('jwt', {session: false}), function (req, res) {
    if (req.user.port) {

        getWebservice(req.user.port, "balance", res);

        /*var url = global.HOST + ":" + req.user.port + global.API + "balance";

         console.log(url);
         request.get(url, function (err, response, body) {

         if (err) {
         res.json(err);
         } else {
         res.json(JSON.parse(body));
         }
         });*/
    } else {
        console.log("port not found");
    }
});

router.get("/peers", passport.authenticate('jwt', {session: false}), function (req, res) {
    if (req.user.port) {

        getWebservice(req.user.port, "peers", res);
        /*var url = global.HOST + ":" + req.user.port + global.API + "peers";

         console.log(url);
         request.get(url, function (err, response, body) {

         if (err) {
         res.json(err);
         } else {
         res.json(JSON.parse(body));
         }
         });*/
    } else {
        console.log("port not found");
    }
});

router.get('/transactions', passport.authenticate('jwt', {session: false}), function (req, res) {

    console.log(req.user);
    Bank.findById(req.user._id, function (err, bank) {
        if (err)
            res.send(err);
        res.json(bank.transactions);
    });
});

router.get('/rates', passport.authenticate('jwt', {session: false}), function (req, res) {

    var port = req.user.port;
    //var port = "10005";
    var url = global.HOST + ":" + port + global.API + "traders";
    request.get(url, function (err, response, body) {
        if (err) {
            res.json(err);
        } else {
            var traders = JSON.parse(body);
            if (traders) {
                async.map(traders,
                    function (trader, callback) {
                        var traderUrl = global.HOST + ":" + (trader.address.hostAndPort.port + 1) + global.API + "rates";
                        request.get(traderUrl, function (err, response, body) {
                            if (err) {
                                callback(err, null);
                            }
                            callback(null, JSON.parse(body));
                        });
                    },
                    function (err, results) {
                        if (err) {
                            res.json(err);
                        }
                        res.json(results);
                    }
                )
            }
        }
    });
});

router.get('/pay/:peerName/:amount/:currency', passport.authenticate('jwt', {session: false}), function (req, res) {
    var peerName = req.params.peerName;
    var amount = req.params.amount;
    var currency = req.params.currency;

    if (req.user.port) {
        var url = global.HOST + ":" + req.user.port + global.API + "pay/" + peerName + "/" + amount + "/" + currency;

        console.log(url);
        request.get(url, function (err, response, body) {

            if (err || response.statusCode !== 200 || body.length !== 64) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(body)
                }
            } else {
                console.log(body);
                Bank.findById(req.user._id, function (err, bank) {
                    var tx = {
                        idTran: body,
                        type: "pay",
                        amount: amount,
                        quantity: amount,
                        product: currency,
                        receiver: peerName,
                        sender: bank.name,
                        date: new Date().toISOString()
                    };

                    console.log(tx);
                    bank.transactions.push(new Transaction(tx));

                    bank.save(function (err) {
                        if (err) {
                            res.json(err);
                        } else {
                            Bank.findOne({'corda_id': peerName}, function (err, peerBank) {
                                if (err) {
                                    res.json(err);
                                } else {
                                    var peerTx = {
                                        idTran: body,
                                        type: "pay",
                                        amount: amount,
                                        quantity: amount,
                                        product: currency,
                                        receiver: peerName,
                                        sender: bank.name,
                                        date: new Date().toISOString(),
                                        notify: true
                                    };
                                    peerBank.transactions.push(new Transaction(peerTx));
                                    peerBank.save(function (err) {
                                        if (err) {
                                            res.json(err)
                                        } else {
                                            res.json("added");
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
            }
        });
    }
});

router.get('/issue/:peerName/:amount/:currency', passport.authenticate('jwt', {session: false}), function (req, res) {
    var peerName = req.params.peerName;
    var amount = req.params.amount;
    var currency = req.params.currency;

    if (req.user.port) {
        var url = global.HOST + ":" + req.user.port + global.API + "issue/" + peerName + "/" + amount + "/" + currency;

        console.log(url);
        request.get(url, function (err, response, body) {

            if (err || response.statusCode !== 200 || body.length !== 64) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(body)
                }
            } else {
                console.log(body);
                Bank.findById(req.user._id, function (err, bank) {
                    var tx = {
                        idTran: body,
                        type: "issue",
                        amount: amount,
                        quantity: amount,
                        product: currency,
                        receiver: peerName,
                        sender: bank.name,
                        date: new Date().toISOString()
                    };

                    console.log(tx);
                    bank.transactions.push(new Transaction(tx));

                    bank.save(function (err) {
                        if (err) {
                            res.json(err);
                        } else {
                            Bank.findOne({'corda_id': peerName}, function (err, peerBank) {
                                if (err) {
                                    res.json(err);
                                } else {
                                    var peerTx = {
                                        idTran: body,
                                        type: "issue",
                                        amount: amount,
                                        quantity: amount,
                                        product: currency,
                                        receiver: peerName,
                                        sender: bank.name,
                                        date: new Date().toISOString(),
                                        notify: true
                                    };
                                    peerBank.transactions.push(new Transaction(peerTx));
                                    peerBank.save(function (err) {
                                        if (err) {
                                            res.json(err)
                                        } else {
                                            res.json("added");
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
            }
        });
    }
});

router.get('/exit/:amount/:currency', passport.authenticate('jwt', {session: false}), function (req, res) {
    var amount = req.params.amount;
    var currency = req.params.currency;

    if (req.user.port) {
        var url = global.HOST + ":" + req.user.port + global.API + "exit/" + amount + "/" + currency;

        console.log(url);
        request.get(url, function (err, response, body) {

            if (err || response.statusCode !== 200 || body.length !== 64) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(body)
                }
            } else {
                console.log(body);
                Bank.findById(req.user._id, function (err, bank) {
                    var tx = {
                        idTran: body,
                        type: "exit",
                        amount: amount,
                        quantity: amount,
                        product: currency,
                        receiver: "--",
                        sender: bank.name,
                        date: new Date().toISOString()
                    };

                    console.log(tx);
                    bank.transactions.push(new Transaction(tx));

                    bank.save(function (err) {
                        if (err) {
                            res.json(err);
                        } else {
                            res.json("added");
                        }
                    });
                });
            }
        });
    }
});

router.get('/exchange/:peerName/:amount/:currency', passport.authenticate('jwt', {session: false}), function (req, res) {
    var peerName = req.params.peerName;
    var amount = req.params.amount;
    var currency = req.params.currency;

    if (req.user.port) {
        var url = global.HOST + ":" + req.user.port + global.API + "exchange/" + peerName + "/" + amount + "/" + currency;

        console.log(url);
        request.get(url, function (err, response, body) {

            if (err || response.statusCode !== 200 || body.length !== 64) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(body)
                }
            } else {
                console.log(body);
                Bank.findById(req.user._id, function (err, bank) {
                    var tx = {
                        idTran: body,
                        type: "exchange",
                        amount: amount,
                        quantity: amount,
                        product: currency,
                        receiver: peerName,
                        sender: bank.name,
                        date: new Date().toISOString()
                    };

                    console.log(tx);
                    bank.transactions.push(new Transaction(tx));

                    bank.save(function (err) {
                        if (err) {
                            res.json(err);
                        } else {
                            Bank.findOne({'corda_id': peerName}, function (err, peerBank) {
                                if (err) {
                                    res.json(err);
                                } else {
                                    var peerTx = {
                                        idTran: body,
                                        type: "exchange",
                                        amount: amount,
                                        quantity: amount,
                                        product: currency,
                                        receiver: peerName,
                                        sender: bank.name,
                                        date: new Date().toISOString(),
                                        notify: true
                                    };
                                    peerBank.transactions.push(new Transaction(peerTx));
                                    peerBank.save(function (err) {
                                        if (err) {
                                            res.json(err)
                                        } else {
                                            res.json("added");
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
            }
        });
    }
});

router.get('/rates/:from/:to/:rate', passport.authenticate('jwt', {session: false}), function (req, res) {
    var from = req.params.from;
    var to = req.params.to;
    var rate = Number(req.params.rate) / 100.0;
    if (req.user.port) {
        var url = global.HOST + ":" + req.user.port + global.API + "rates/" + from + "/" + to + "/" + rate;

        console.log(url);
        request.get(url, function (err, response, body) {

            if (err || response.statusCode !== 200) {
                res.json(err);
            } else {
                res.json("added");
            }
        });
    }
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

router.get("/notifications",  function (req, res) {

    Bank.aggregate([{
            "$match": {
                "_id": mongoose.Types.ObjectId("58efbb1a88efbf2028d2f5a7")
            }
        }, {
            "$project": {
                "transactions": {
                    "$filter": {
                        input: "$bank.transactions",
                        as: 'data',
                        cond: { "$eq": ["$$data.notify", true] }
                    }
                }
            }
        }],
        function(err, txs) {
            if (err) {
                res.json(err);
            } else {
                res.json(txs);
            }
        });


    /*Bank.findById(req.user._id, function (err, bank) {
        var txs = bank.transactions.filter(function (tx) {
            return tx.notify === true;
        });

        res.json(txs);
    });*/
});

router.put("/notifications", passport.authenticate('jwt', {session: false}), function (req, res) {

    Bank.findById(req.user._id, function (err, bank) {
        bank.transactions.forEach(function (transaction) {
            transaction.notify = false;
        });

        bank.markModified("transactions");
        bank.save(function (err, bank) {
            console.log(err);
            console.log(bank);
            res.end();
        });
    });
});


function getWebservice(port, path, res) {
    var url = global.HOST + ":" + port + global.API + path;

    console.log(url);
    request.get(url, function (err, response, body) {

        if (err || response.statusCode !== 200) {
            res.json(err);
        } else {
            res.json(JSON.parse(body));
        }
    });
}

module.exports = router;