var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var feedSchema = new Schema({
    tweet_created_at: String,
    text: String,
    source: String,
    user_name: String,
    user_screen_name: String,
    user_location:String,
    place:Object,
    coordinates:Object,
    created_at: Date,
    updated_at: Date
});

feedSchema.index({ text: "text", source: "text",user_name:"text",user_screen_name:"text" });
var feed = mongoose.model('feed', feedSchema);

// make this available to our users in our Node applications
module.exports = feed;