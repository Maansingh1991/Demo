var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AuthSchema = new Schema({

    token:{ type: String },
    userId:{type:String}


},{
    versionKey: false // You should be aware of the outcome after set to false
});

var auth = mongoose.model('AuthTokens', AuthSchema);

module.exports = auth;
