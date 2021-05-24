const express = require('express');
const app = require('../app');
const router = express.Router();
const userController = require('../controllers/userController');
console.log("router");
router.post('/email',userController.getEmail);
router.get('/', userController.main);
// router.get('/', function(req, res, next) {
//   res.send("users");
// });
module.exports = router;