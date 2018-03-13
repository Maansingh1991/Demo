var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt');
const passwordService=require('./../services/passwordService');
var SALT_WORK_FACTOR = 10;
var UserSchema = new Schema({
    firstName:{ type: String, required: true },
    lastName:{ type: String, required: true },
    email:{ type: String, required: true,unique:true },
    password:{type:String,require:true},
    state:{ type: String, required: true },
    city:{ type: String, required: true },
    follow:{type:Array,required:false},
    createdAt: Date,
    updateAt: Date

},{
    versionKey: false // You should be aware of the outcome after set to false
});


UserSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();


    user.password = passwordService.encrypt(user.password);
    user.createdAt=new Date();
    user.updateAt=new Date();
    next();

});
UserSchema.post('save', function(next){
    var user = this;
    delete user.password;


});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    var decryptPassword=passwordService.decrypt(this.password);
    if(decryptPassword===candidatePassword){
        cb(null, true);
    }else{
        cb("Password mismatch");
    }
};



var user = mongoose.model('User', UserSchema);

module.exports = user;
