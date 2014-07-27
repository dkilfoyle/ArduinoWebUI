var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var templatizer = require('templatizer');
templatizer("./views", "./public/js/mytemplates.js");

var five = require('johnny-five'),
    io = require('socket.io').listen(8080),
    board, 
    ping;

io.set('log level', 1); // reduce logging

//board = new five.Board({
//    port: "COM3"
//});

//board.on("ready", function () {
//    // Create a new `ping` hardware instance.
//    ping = new five.Ping({
//        pin: 7,
//        freq: 500
//    });
//
////    app.set('ping', ping);
//
//    // "data" get the current reading from the ping
//    ping.on("data", function (err, value) {
//        board.emit('distance', this.cm);
//    });
//    
//    io.sockets.on('connection', function (socket) {
//        board.on('distance', function (val) {
//            socket.emit('distance', { val: val });
//        });
//    });
//
//});

io.sockets.on('connection', function (socket) {
    
    socket.on('arduinoConnect', function (val) {
        board = new five.Board({ port: val.port });
        
        board.on("ready", function () {
            socket.emit("arduinoConnected");
        });
    });
    
    socket.on("pingAdd", function (val) {
        if (board != undefined) {
            ping = new five.Ping({ pin: val.pin, freq: val.freq });
            ping.myname = val.name;
            ping.on("data", function (err, value) {
                board.emit('distance', { distance: this.cm, name: this.myname });
            });
            
            board.on('distance', function (val) {
                socket.emit('distance', val);
            });
        }
    });
    
    socket.on("sensorAdd", function (val) {
        if (board != undefined) {
            sensor = new five.Sensor({ pin: val.pin, freq: val.freq });
            sensor.myname = val.name;
            
            sensor.on("data", function (err, value) {
                board.emit('sensorReading', { value: this.value, name: this.myname });
            });
            
            board.on('sensorReading', function (val) {
                socket.emit('sensorReading', val);
            });
        }
    });
});

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.locals.pretty = true;
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;