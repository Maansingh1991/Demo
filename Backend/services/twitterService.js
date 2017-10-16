//Twitter stream API npm
var Twit = require('twit');

//Import Feed
var Feed = require('../modals/feed')

//Credetials can move to seperate file
var T = new Twit({
    consumer_key: 'i5FpCDn2GpC111hMXYIzPHkqa',
    consumer_secret: 'aueEoW30Jo6dHUmovemNBXinFvRgH02XNyHWJLQ8cxBBnUEsFY',
    access_token: '745949918867623936-7lQDe75JyFDaUUhm37bjLPXldKLX1od',
    access_token_secret: 'iAKm9DrE5TiXnPgAaoQCw5uPBRO1YsJnyfsDzfbaA0ZK2'

});

var stream = T.stream('statuses/filter', {track: ['Mumbai potholes', 'Mumbai pot holes', 'bombay water logging','bombay waterlogging'
,'mumbai water logging','mumbai waterlogging','#mumbai water logging','mumbai']});
// statuses/filter
//
// var stream = T.stream('statuses/filter', {track: ['india']});



stream.on('tweet', function (tweet) {
    var feed = new Feed({
        tweet_created_at: tweet.created_at,
        text: tweet.text,
        source: tweet.source,
        user_name: tweet.user.name,
        user_screen_name: tweet.user.screen_name,
        user_location: tweet.user.location,
        place: tweet.place,
        coordinates: tweet.coordinates,
        created_at: new Date(),
        updated_at: new Date()
    });
    feed.save(function (err) {
        if (err) throw err;

        console.info('Tweet Saved...');
    });
})

stream.on('error', function (tweet) {
    console.error(tweet)
})
