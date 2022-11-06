var express = require('express');
var router = express.Router();

router.get('/init', function(req, res, next) {
  res.send('stuff');
});

module.exports = router;