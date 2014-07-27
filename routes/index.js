var express = require('express');
var router = express.Router();
var path = require('path');
var serialport = require("serialport")

/* GET home page. */
//router.get('/', function(req, res) {
//  res.render('index', { title: 'Express', distance: req.app.get("ping").cm });
//});

router.get('/', function(req, res) {
    res.render('arduino', { webtitle: 'Arduino Dashboard', pagetitle: 'Dashboard' });
});

router.get('/admin/comports', function(req, res) {
    serialport.list(function(err,ports) {
        console.log(ports);
        res.json(ports); 
    });
});

module.exports = router;
