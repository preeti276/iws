var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function(req, res) {
  res.render('./views/form1.html');
});

module.exports = router;
