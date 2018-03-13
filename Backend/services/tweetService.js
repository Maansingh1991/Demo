var dtweet = require('../modals/dtweet');



/*
 *
 * Like and unlike tweets
 *
 *
 * */

module.exports.likeTweets = function (status, data, user) {


   return new Promise(function (resolve, reject) {

        if (status == "true") {
            dtweet.update({_id: data.id}, {$push: {like: user._id}}, function (err, data) {
                if (err)
                    reject(err);
                else
                resolve(data);
            });
        }
        else {
            dtweet.update({_id: data.id}, {$pull: {like: {$in: [user._id]}}}, function (err, data) {
                if (err)
                    reject(err);
                else
                resolve(data);
            });


        }


    });


}





module.exports.addComment=function(data,user){

    return new Promise(function(resolve,reject){

        dtweet.update({_id: data.id}, {$push: {comments: {id:user._id,date:new Date(),comment:data.comment,userName:user.firstName+" "+user.lastName}}}, function (err, data) {
            if (err)
                reject(err);
            resolve(data);
        });

    })


}









/*
* GET tweets by id or all tweets
*
* */



module.exports.getTweets = function (id,user,search) {


    return new Promise(function (resolve, reject) {

            if (id) {

                dtweet.findOne({_id: id}, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        data._doc.isLiked = data.likes.indexOf(user._id) >= 0 ? true : false;
                        resolve(data);
                    }

                });

            }
            else {
                var searchData=search?{$or:[{title:{$regex:'.*'+search+'.*'}},{content:{$regex:'.*'+search+'.*'}}]}:null;

                dtweet.find(searchData, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        var response = data.map(function (val) {

                            val._doc.isLiked = val.likes.indexOf(user._id) >= 0 ? true : false;
                            return val;
                        });
                        resolve(response);
                    }

                });


            }


        }
    )
}


/*
* Add tweets
* */

module.exports.addTweet=function(data,user){


    return new Promise(function(resolve,reject){

        var tweet = new dtweet({
            title: data.title,
            content: data.content,
            userId: user._id, userName: user.firstName + " " + user.lastName
        });

        tweet.save(function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });



    });

}