var express = require('express');
var router = express.Router();
var Feed=require('../modals/feed');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/feeds/:search?',function(req,res,next){
    var search={};
    if(req.params){
        search=req.params.search? { $text: { $search:  req.params.search}}:{};
    }
    Feed.find(search,function(err, feed) {
        if (err) throw err;

        res.send(feed)
    });

})



router.get('/coordinates',function(req,res,next){
    Feed.find({coordinates:{'$ne':null}},function(err, coord) {
        if (err) throw err;

        res.send(coord)
    });
});

module.exports = router;
