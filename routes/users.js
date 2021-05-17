const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
console.log("router");
router.post('/email',userController.getEmail);
router.get('/', userController.main);
module.exports = router;