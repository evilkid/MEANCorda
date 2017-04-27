var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = new Schema({
    idTran: String,
    type: String,
    amount: String,
    receiver: String,
    sender: String,
    date: String,
    quantity: String,
    product: String,
    notify: {type: Boolean, defaults: false}
});

module.exports = mongoose.model('transactions', Transaction);