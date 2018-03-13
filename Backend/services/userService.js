var User = require('../modals/user');
var Auth=require('../modals/auth');





module.exports.getUserById=function(id){
    return new Promise(function(resolve,reject){
        User.findOne({_id:id},function(err,data){
            if(err) reject(err);
            resolve(data);
        }).select({ "first_name": 1,"last_name":1,"address_1":1,"address_2":1, "_id": 0})
    })
}


module.exports.getAllUser=function(search){
    var searchParams=search?{$or:[{firstName:search},{lastName:search}]}:null;
    return new Promise(function(resolve,reject){
        user.find(searchParams,function(err,data){
            if(err){reject(err);}
            resolve(data);
        })

    })
}


module.exports.addUser=function(data){

    return new Promise(function(resolve,reject){

        var user = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            state: data.state,
            password: data.password,
            email: data.email,
            city: data.city,

        });
        user.save(function (err,data) {
            if (err) {
                reject(err);
            }else{

               resolve(data);
            }



        });


    });







}





module.exports.followUsers=function(data,user){
    return new Promise(function(resolve,reject){
        User.update({_id:user.id},{$push: {follow: data.id}},function(err,data){

            if(err){
                reject(err);
            }
            resolve(data);



        })
    })

}
