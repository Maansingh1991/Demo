var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var User = require('./modals/user');
//Mongoose setup
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/byju');


const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

var index = require('./routes/index');
var users = require('./routes/users');
var tweets=require('./routes/tweets');

var app = express();
app.use(passport.initialize());




passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
}, function (email, password, done) {

    User.findOne({email: email}, function (err, data) {

        if(err) done(err);
        if(!data) done("invalid");
        else{
            data.comparePassword(password, function(err, isMatch) {
                if (err) done(err);
                isMatch ? done(null,data):done(false);
            });
        }



    });


}));


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {

        res.status(200).send();

    } else {

        // Pass to next layer of middleware
        next();

    }
});
app.use('/', index);
app.use('/users', users);
app.use('/tweets',tweets);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(err.message);
});

module.exports = app;
