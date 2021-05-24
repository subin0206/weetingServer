const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// console.log("router");

router.get('/', userController.main);

router.post('/email',userController.getEmail);

console.log("users");

module.exports = router;