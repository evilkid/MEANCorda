var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bank = new Schema({
    corda_id: {
        type: String,
        require: true
    },
    name: String,
    address: String,
    port: String,
    tel: String,
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    transactions: Array
});

module.exports = mongoose.model('banks', Bank);