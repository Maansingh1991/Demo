var express = require('express');
var router = express.Router();
var User = require('../modals/user');
var Auth=require('../modals/auth')
var passport = require("passport");
var validationMiddleware=require("../middleware/validationMiddleware")
var uuid = require('uuid');
const userService=require('../services/userService');
var authenticate = require('../middleware/validationMiddleware');

/*
*Get User by id
*Search User
* */
router.get('/:id?/:search?',function(req,res,next){


   if(req.params.id){
       userService.getUserById(req.params.id).then(function(result){
           res.json(result);
       }).catch(function(err){
           next(err);
       })
   }else{
       userService.getAllUser(req.params.search).then(function(result){
           res.json(result);
       }).catch(function(err){
           next(err);
       })

   }

})

/*
* Login
*
* url: /authenticate
*
* body:{email:<email>,password:<password>}
*
*
*
* */



router.post('/authenticate', passport.authenticate('local'), function (req, res, next) {

    const authToken=uuid.v1();
    var auth=new Auth({token:authToken,userId:req.user._id});
    auth.save(function(err,data){
        if(err) next(err);
        res.json({token:authToken})
        res.status(200)
    });

})

/*
 * Check if token is valid
 * url:- /token/valid
 *
 * header:{token:<token>}
 *
 *
 *
 * */



router.get('/token/valid',function(req,res,next){
    if(!req.header.token){
        next("invalid")
    }
    Auth.find({token:req.header.token},function(err,data){
        if(err) {
            next(err)

        }
        data.length?next("invalid"):res.send({valid:true})
    });

})



/*
* Add user
* url:- /
*
* body:{firstName:<firstName>,lastName:<lastName>,state:<state>,
* password:<password>,email:<email>,city:<city>}
*
*
*
* */


router.post('/', function (req, res, next) {


    userService.addUser(req.body).then(function(data){

        res.send(data);


    }).catch(function(error){

        next(error);
    });


});



/*
* Follow Users
*
*
*
* */

router.put('/follow',authenticate, function (req, res, next) {


  userService.followUsers(req.body,req.user).then(function(data){
      res.send(data);
  }).catch(function(err){
      next(err);
  })


});


module.exports = router;
