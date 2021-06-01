const express = require('express');
const router = express.Router();
const moimController = require('../controllers/moimController');

router.post('/createMoim', moimController.createMoim);

router.get('/showDetailMoim', moimController.showDetailMoim);

// router.get('/showMoimList', moimController.showMoimList);

// router.get('/testMoim', moimController.testMoim);

module.exports = router;