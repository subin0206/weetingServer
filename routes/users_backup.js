// import db_config from '/model/conn.js'
var express = require('express');
const app = require('../app');
var router = express.Router();
var db_config = require('../model/conn');
var connection = db_config.init();
console.log("test1");
connection.query('SELECT * FROM user', function(err, results, fields) {
  if (err) {
    console.log(err);
    console.log("test2");
  }
  // for(var i = 0; i < results.length; i++){
  //   console.log(results[i].email);
  // }
  console.log(results);
});

connection.end();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
