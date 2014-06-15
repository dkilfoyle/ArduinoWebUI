var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', distance: req.app.get("ping").cm });
});

router.get('/dash', function(req, res) {
    //res.sendfile(path.resolve("public/arduino.html"));
    res.render('arduino', { webtitle: 'Arduino Dashboard', pagetitle: 'Dashboard' });
});

module.exports = router;
