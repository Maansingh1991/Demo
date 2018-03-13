var express = require('express');
var router = express.Router();
var dtweet = require('../modals/dtweet');
var authenticate = require('../middleware/validationMiddleware');
var tweetService = require('../services/tweetService');


/*
 * url:- /
 *
 * body:{title:<Any title>,content:<Description>}
 *
 * header:{token:<token>}
 *
 * */


router.post("/", authenticate, function (req, res, next) {


    tweetService.addTweet(req.body, req.user).then(function (data) {
        res.send(data);
    }).catch(function (error) {
        next(error);
    });

});


/*
 * url:- /:id?
 *
 *          id parameter optional
 * params:{id:<tweet id>}
 *
 * header:{token:<token>}
 *
 * */

router.get("/", authenticate, function (req, res, next) {

    tweetService.getTweets(req.query.id,req.user,req.query.search).then(function (data) {
        res.send(data);
    }).catch(function (error) {
        next(error);
    })

});


/*
 * url:/like/:status
 *
 * body:{id:<tweet id>}
 *
 * header:{token:<token>}
 *
 * */


router.put("/like/:status", authenticate, function (req, res, next) {

    tweetService.likeTweets(req.params.status, req.body, req.user).then(function (data) {
        res.send(data);
    }).catch(function (error) {
        next(error);

    });


});

/*
 * url: /comments
 *
 * body:{id:<tweet id>}
 *
 * header:{token:<token>}
 *
 * */

router.put("/comments", authenticate, function (req, res, next) {

    tweetService.addComment(req.body, req.user).then(function (data) {
        res.send(data);
    }).catch(function (error) {
        next(error);

    });


});






module.exports = router;