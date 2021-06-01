const express = require('express');
const router = express.Router();
const moimController = require('../controllers/moimController');
const upload = require('../image/s3');

router.post('/createMoim', upload.single('meeting_img') ,moimController.createMoim);

router.get('/showDetailMoim/:meeting_id', moimController.showDetailMoim);

// router.get('/showMoimList', moimController.showMoimList);

// router.get('/testMoim', moimController.testMoim);

module.exports = router;