const Auth=require('../modals/auth');
const User = require('../modals/user');



var validateMiddleware=function(req,res,next){

    Auth.findOne({token:req.headers.authorization},function(err,data){
        if(!data){
            var err={};
            err.status=401;
            err.message="invalid"
            next(err);
        }else{
            User.findOne({_id:data.userId},function(err,data){
                if(err) next(err);
                if(!data) next("No user found");

                req.user=data;
                next();
            })

        }

    })

}




module.exports = validateMiddleware;
