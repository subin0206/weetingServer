const express = require('express');
const router = express.Router();

/* GET home page. */
router.use('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send("test");
  console.log("test33");
});

module.exports = router;