var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TweetSchema = new Schema({
    title:{ type: String, required: true },
    content:{ type: String, required: true },
    userName:{ type: String, required: true },
    likes:{ type: Array, required: false},
    comments:{type:Array,require:false},
    userId:{ type: String, required: true },
    createdAt: Date,
    updatedAt: Date

},{
    versionKey: false // You should be aware of the outcome after set to false
});


TweetSchema.pre('save', function(next){
    var tweets = this;
    tweets.createdAt=new Date();
    tweets.updatedAt=new Date();
    next();

});

TweetSchema.pre('update', function(next){
    var tweets = this;
    tweets.updatedAt=new Date();
    next()

});


var tweet = mongoose.model('Tweet', TweetSchema);

module.exports = tweet;
