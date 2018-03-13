var express = require('express');
var router = express.Router();
var Auth=require('../modals/auth')

/* GET home page. */







router.get('/', function(req, res, next) {
  Auth.findOne({},function(err,data){
    console.log(data);
  })
  res.render('index', { title: 'Express' });
});

module.exports = router;
